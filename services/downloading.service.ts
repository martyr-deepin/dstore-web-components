/*  下载量服务提供  */

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { flatMap, map } from 'rxjs/operators';
import * as _ from 'lodash';

import { App, appSearch } from './app';
import { AppService } from './app.service';
import { CategoryService } from '../../dstore/services/category.service';
import { BaseService } from './base.service';

export class AppDownloading {
  appName: string;
  count: number;
}

@Injectable()
export class DownloadingService {
  operationServer: string;

  constructor(private http: HttpClient, private appService: AppService) {}

  getList(search?: string) {
    this.operationServer = BaseService.serverHosts.operationServer;

    return this.appService.getAppList().pipe(
      flatMap(apps =>
        this.http.get(`${this.operationServer}/api/downloading`).pipe(
          map((result: { apps: AppDownloading[] }) => {
            const appDownList = _.keyBy(result.apps, app => app.appName);
            return _.chain(apps)
              .forEach(app => {
                app.downloadCount = appDownList[app.name] ? appDownList[app.name].count : 0;
              })
              .orderBy([(app: App) => app.downloadCount, (app: App) => app.name], ['desc', 'desc'])
              .each((app, key) => (app.downloadRanking = key + 1))
              .filter(app => !search || appSearch(app, search))
              .value();
          }),
        ),
      ),
    );
  }
}
