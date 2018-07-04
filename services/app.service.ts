import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, Subject, forkJoin, from, of } from 'rxjs';
import { retry, shareReplay, map, tap, flatMap, scan, switchMap, last } from 'rxjs/operators';

import { throttle, filter, compact, chain, get, cloneDeep, defaultsDeep } from 'lodash';

import * as localForage from 'localforage';

import { BaseService } from './base.service';
import { CategoryService } from './category.service';

import { App, appReviver } from './app';
import { Error, ErrorCode } from './errno';
import { Locale } from '../utils/locale';

@Injectable()
export class AppService {
  private metadataService = BaseService.serverHosts.metadataServer;
  private apiURL = `${this.metadataService}/api/app`;
  private store = localForage.createInstance({ name: 'apps' });

  constructor(private http: HttpClient, private categoryServer: CategoryService) {}

  get token() {
    return localStorage.getItem('auth-token') || sessionStorage.getItem('auth-token');
  }
  get appsStoreKey() {
    return (BaseService.isNative ? BaseService.domainName : this.token) + '-apps';
  }
  get timeStoreKey() {
    return (BaseService.isNative ? BaseService.domainName : this.token) + '-time';
  }

  // 一秒的缓冲节流的_getAppMap
  private _getAppMapCache = throttle(this._getAppMap, 1000);

  // 获取应用列表，应用名为键
  private _getAppMap() {
    return forkJoin<AppMap, string>(
      this.store.getItem(this.appsStoreKey),
      this.store.getItem(this.timeStoreKey),
    ).pipe(
      switchMap(([appMap, lastTime]) => {
        if (!appMap) {
          appMap = {};
        }
        let params = new HttpParams();
        if (lastTime) {
          params = params.append('since', lastTime);
        }
        return forkJoin(
          of(appMap),
          of(lastTime),
          this.http
            .get(this.apiURL, { params, responseType: 'text' })
            .pipe(map(body => JSON.parse(body, appReviver) as Result)),
        );
      }),
      map(([appMap, lastTime, appMapChange]) => {
        if (appMapChange.error) {
          throw appMapChange.error;
        }
        if (lastTime === appMapChange.lastModified || !appMapChange.lastModified) {
          return appMap;
        }
        lastTime = appMapChange.lastModified;
        if (appMapChange.apps) {
          appMapChange.apps.forEach(app => {
            appMap[app.name] = app;
          });
        }
        if (appMapChange.deleted) {
          Object.values(appMap).map(app => {
            if (appMapChange.deleted.includes(app.id)) {
              delete appMap[app.name];
            }
          });
        }
        this.store.clear().then(() => {
          this.store.setItem(this.timeStoreKey, lastTime);
          this.store.setItem(this.appsStoreKey, appMap);
        });
        return appMap;
      }),
      flatMap(
        appMap => {
          return this.categoryServer.getList();
        },
        (appMap, categories) => {
          Object.values(appMap).forEach(app => {
            // set localInfo
            app.localInfo = app.locale[Locale.getUnixLocale()];
            if (!get(app.locale, [Locale.getUnixLocale(), 'description', 'name'])) {
              app.localInfo = Object.values(app.locale).find(
                local => local.description.name !== '',
              );
            }
            app.localInfo = defaultsDeep(
              cloneDeep(app.localInfo),
              ...Object.values(app.locale),
              new App().localInfo,
            );
            app.localCategory = categories[app.category].LocalName || app.category;
          });
          return appMap;
        },
      ),
      shareReplay(),
    );
  }

  // 获取全部应用列表
  getAppList(): Observable<App[]> {
    return this._getAppMapCache().pipe(map(m => compact(Object.values(m))));
  }

  // 根据应用名获取应用
  getAppByName(name: string): Observable<App> {
    return this._getAppMapCache().pipe(
      map(m => m[name]),
      tap(app => console.log(`getAppByName:(${name}):`, app)),
    );
  }

  // 根据应用名列表获取应用列表
  getAppListByNames(appNames: string[]): Observable<App[]> {
    return this._getAppMapCache().pipe(map(m => appNames.map(appName => m[appName])));
  }

  // 设置Api网址
  setApiURL(apiURL: string) {
    this.apiURL = apiURL;
  }
}

interface AppMap {
  [key: string]: App;
}

interface Result {
  lastModified: string;
  apps: App[];
  deleted: number[];
  error: Error;
}
