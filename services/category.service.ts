import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/shareReplay';
import { BaseService } from './base.service';
import { Locale } from '../utils/locale';

@Injectable()
export class CategoryService {
  metadataServer = BaseService.serverHosts.metadataServer;

  constructor(private http: HttpClient) {}

  getList = _.throttle(this._getList, 60 * 1000);
  private _getList(): Observable<{ [key: string]: Category }> {
    return this.http
      .get(`${this.metadataServer}/api/category`)
      .retry(3)
      .map((categories: Category[]) => {
        const localCategory = _.groupBy(categories, c => c.Locale);
        return _.keyBy(
          localCategory[Locale.getUnixLocale()] ||
            _.first(_.toArray(localCategory)),
          c => c.Name,
        );
      })
      .shareReplay();
  }
}

export class Category {
  Locale: string;
  LocalName: string;
  Name: string;
  Active: boolean;
}
