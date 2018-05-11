import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, Subject, forkJoin, empty } from 'rxjs';
import { retry, shareReplay, map, tap, flatMap, scan } from 'rxjs/operators';

import { throttle, filter, compact, chain, get, cloneDeep } from 'lodash';

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
  private _getAppMapCache = throttle(this._getAppMap, 1000);
  // 获取应用列表，应用名为键
  private _getAppMap(): Observable<Map<string, App>> {
    return forkJoin(this.getAppListResult(), this.categoryServer.getList()).pipe(
      map(([result, categories]) => {
        if (!result.apps) {
          result.apps = [];
        }
        result.apps.forEach(app => {
          // set localInfo
          if (get(app.locale, [Locale.getUnixLocale(), 'description', 'name'])) {
            app.localInfo = app.locale[Locale.getUnixLocale()];
          } else {
            app.localInfo = chain(app.locale)
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

  // 获取全部应用列表
  getAppList(): Observable<App[]> {
    return this._getAppMapCache().pipe(map(m => compact(Array.from(m.values()))));
  }

  // 获取全部应用，以应用名为Key
  getAppMap(): Observable<Map<string, App>> {
    return this._getAppMapCache();
  }

  // 根据应用名获取应用
  getAppByName(name: string): Observable<App> {
    return this._getAppMapCache().pipe(
      map(m => m.get(name)),
      tap(app => console.log(`getAppByName:(${name}):`, app)),
    );
  }
  // 根据应用名列表获取应用列表
  getAppListByNames(appNames: string[]): Observable<App[]> {
    return this._getAppMapCache().pipe(map(m => appNames.map(m.get.bind(m))));
  }
  getAppMapByNames(appNames: string[]): Observable<Map<string, App>> {
    return this._getAppMapCache().pipe(
      map(m => {
        const appMap = new Map<string, App>();
        appNames
          .filter(appName => m.has(appName))
          .map(appName => appMap.set(appName, m.get(appName)));
        return appMap;
      }),
    );
  }

  // 设置Api网址
  setApiURL(apiURL: string) {
    this.apiURL = apiURL;
  }
}

interface Result {
  lastModified: string;
  apps: App[];
  error: Error;
}
