import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, Subject, forkJoin, empty } from 'rxjs';
import { retry, shareReplay, map, tap, flatMap, scan } from 'rxjs/operators';

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
    return forkJoin(this.getAppListResult(), this.categoryServer.getList()).pipe(
      map(([result, categories]) => {
        console.log('forkJoin');
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
      }),
      shareReplay(),
    );
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
    return this._getAppMapCache().pipe(
      map(m => _.cloneDeep(m.get(name))),
      tap(app => console.log(`getAppByName:(${name}):`, app)),
    );
  }

  // 设置Api网址
  setApiURL(apiURL: string) {
    this.apiURL = apiURL;
  }

  private getAppListResult(): Observable<Result> {
    return new Observable<Result>(obs =>
      this.http
        .get(this.apiURL, {
          responseType: 'text',
          params: this.lastModified ? { since: this.lastModified } : null,
        })
        .subscribe(
          body => obs.next(JSON.parse(body, appReviver) as Result),
          obs.error.bind(obs),
          obs.complete.bind(obs),
        ),
    ).pipe(
      tap(result => {
        if (result.error && result.error.code === ErrorCode.CodeForceSync) {
          this.lastModified = null;
          this.appsMap.clear();
          throw result.error.code;
        }
      }),
      retry(3),
    );
  }
}

interface Result {
  lastModified: string;
  apps: App[];
  error: Error;
}
