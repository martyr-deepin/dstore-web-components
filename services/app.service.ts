import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/let';
import 'rxjs/add/observable/range';
import 'rxjs/add/operator/last';
import 'rxjs/add/operator/share';

import * as _ from 'lodash';

import { environment } from '../environments/environment';

import { CategoryService } from './category.service';

import { App, appReviver } from './app';
import { Error, ErrorCode } from './errno';

interface Result {
  lastModified: string;
  apps: App[];
  error: Error;
}

@Injectable()
export class AppService {
  metadataService = environment.metadataServer;

  apps: App[];
  lastModified: string;
  cacheObservable: Observable<App[]>;

  constructor(
    private http: HttpClient,
    private categoryServer: CategoryService
  ) {
    this.cacheObservable = this._getAppList();
  }
  getAppList() {
    return this.cacheObservable;
  }
  _getAppList(): Observable<App[]> {
    const api = `${this.metadataService}api/app`;
    return this.http
      .get(api, {
        responseType: 'text',
        params: this.lastModified ? { since: this.lastModified } : null
      })
      .map(body => <Result>JSON.parse(body, appReviver))
      .mergeMap(result => {
        console.log('checkError', this.lastModified);
        if (result.error && result.error.code === ErrorCode.CodeForceSync) {
          return this.http
            .get(api, { responseType: 'text' })
            .map(body => <Result>JSON.parse(body));
        }
        return Observable.of(result);
      })
      .mergeMap(result => {
        return this.categoryServer.getList().map(categories => {
          if (this.lastModified === result.lastModified) {
            return this.apps;
          }
          this.lastModified = result.lastModified;
          this.cacheObservable = this._getAppList();
          this.apps = _.chain(result.apps)
            .concat(this.apps)
            .compact()
            .orderBy(
              [(app: App) => app.updateTime, (app: App) => app.name],
              ['desc', 'desc']
            )
            .each(app => {
              app.localInfo =
                app.locale['zh_CN'] && app.locale['zh_CN'].description.name
                  ? app.locale['zh_CN']
                  : app.locale['en_US'];
              app.localCategory =
                categories[app.category].LocalName || app.category;
            })
            .value();
          return this.apps;
        });
      })
      .retry(3)
      .share();
  }

  getAppListByNames(appNames: string[]) {
    return this.getAppList()
      .map(apps => apps.filter(app => appNames.includes(app.name)))
      .map(apps => <{ [key: string]: App }>_.keyBy(apps, app => app.name));
  }
}
