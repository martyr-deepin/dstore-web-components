import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/onErrorResumeNext';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/do';

import * as _ from 'lodash';

import { BaseService } from './base.service';
import { CategoryService } from './category.service';

import { App, appReviver } from './app';
import { Error, ErrorCode } from './errno';
import { Locale } from '../utils/locale';

@Injectable()
export class AppService {
  private metadataService = BaseService.serverHosts.metadataServer;
  private apiURL = `${this.metadataService}/api/app`;

  constructor(private http: HttpClient, private categoryServer: CategoryService) {}

  private appsMap = new Map<string, App>();
  private lastModified: string;
  // 一秒的缓冲节流的_getAppMap
  _getAppMapCache = _.throttle(this._getAppMap, 1000);
  // 获取应用列表，应用名为键
  _getAppMap(): Observable<Map<string, App>> {
    return Observable.forkJoin(this.getAppListResult(), this.categoryServer.getList())
      .map(([result, categories]) => {
        if (!result.apps) {
          result.apps = [];
        }
        result.apps.forEach(app => {
          // set localInfo
          if (_.get(app.locale, `${Locale.getUnixLocale()}.description.name`)) {
            app.localInfo = app.locale[Locale.getUnixLocale()];
          } else {
            app.localInfo = _.chain(app.locale)
              .toArray()
              .find(local => local.description.name !== '')
              .value();
          }
          // set localCategory
          app.localCategory = categories[app.category].LocalName || app.category;
          // 增量覆盖
          this.appsMap.set(app.name, app);
        });
        this.lastModified = result.lastModified;
        return this.appsMap;
      })
      .shareReplay();
  }

  // 获取全部应用列表
  getAppList(): Observable<App[]> {
    return this._getAppMapCache().map(m => Array.from(m.values()));
  }

  // 根据应用名列表获取应用列表
  getAppListByNames(appNames: string[]): Observable<App[]> {
    return this._getAppMapCache().map(m => appNames.map(m.get));
  }

  // 根据应用名获取应用
  getAppByName(name: string): Observable<App> {
    return this._getAppMapCache()
      .map(m => _.cloneDeep(m.get(name)))
      .do(app => console.log(`getAppByName:(${name}):`, app));
  }

  // 设置Api网址
  setApiURL(apiURL: string) {
    this.apiURL = apiURL;
  }

  private getAppListResult(): Observable<Result> {
    return this.http
      .get(this.apiURL, {
        responseType: 'text',
        params: this.lastModified ? { since: this.lastModified } : null,
      })
      .map(body => <Result>JSON.parse(body, appReviver))
      .mergeMap(result => {
        // 强制刷新列表
        if (result.error && result.error.code === ErrorCode.CodeForceSync) {
          // 清空增量缓存
          this.appsMap.clear();
          return this.http
            .get(this.apiURL, { responseType: 'text' })
            .map(body => <Result>JSON.parse(body, appReviver));
        }
        return Observable.of(result);
      })
      .retry(3);
  }
}

interface Result {
  lastModified: string;
  apps: App[];
  error: Error;
}
