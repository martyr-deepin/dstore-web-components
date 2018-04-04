import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/retry';
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
  apiURL = `${this.metadataService}api/app`;

  constructor(
    private http: HttpClient,
    private categoryServer: CategoryService
  ) {}

  apps: App[];
  lastModified: string;
  cacheObservable: Observable<App[]>;

  setApiURL(apiURL: string) {
    this.apiURL = apiURL;
  }

  // 获取应用列表
  getAppList(): Observable<App[]> {
    if (!this.cacheObservable) {
      this.cacheObservable = this._getAppList();
    }
    return this.cacheObservable;
  }

  getAppListDict(): Observable<{ [key: string]: App }> {
    return this.getAppList()
      .map(apps => _.keyBy(apps, 'name'))
      .share();
  }

  // 获取应用列表-共享缓存
  _getAppList(): Observable<App[]> {
    return this.http
      .get(this.apiURL, {
        responseType: 'text',
        params: this.lastModified ? { since: this.lastModified } : null
      })
      .retry(3)
      .map(body => <Result>JSON.parse(body, appReviver))
      .mergeMap(result => {
        console.log('checkError', this.lastModified);
        if (result.error && result.error.code === ErrorCode.CodeForceSync) {
          return this.http
            .get(this.apiURL, { responseType: 'text' })
            .map(body => <Result>JSON.parse(body))
            .retry(3);
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
      .share();
  }

  // 根据应用名列表获取应用
  getAppListByNames(appNames: string[]): Observable<{ [key: string]: App }> {
    return this.getAppList()
      .map(apps => apps.filter(app => appNames.includes(app.name)))
      .map(apps => <{ [key: string]: App }>_.keyBy(apps, app => app.name));
    // .map(appDict => appNames.map(name => appDict[name]).filter(app => app));
  }

  // 根据应用名获取应用
  getAppByName(appName: string): Observable<App> {
    return this.getAppList().map(apps =>
      _.chain(apps)
        .find(app => app.name === appName)
        .cloneDeep()
        .value()
    );
  }
}