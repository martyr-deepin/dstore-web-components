import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/observable/timer';

import { BaseService } from './base.service';
import { Locale } from '../utils/locale';

@Injectable()
export class CategoryService {
  metadataServer: string;

  categoryObservable: Observable<{ [key: string]: Category }>;

  constructor(private http: HttpClient, private baseServer: BaseService) {
    this.metadataServer = baseServer.serverHosts.metadataServer;

    this.categoryObservable = this.http
      .get(`${this.metadataServer}/api/category`)
      .map((categories: Category[]) => {
        const localCategory = _.groupBy(categories, c => c.Locale);
        return _.keyBy(
          localCategory[Locale.getUnixLocale()] ||
            _.first(_.toArray(localCategory)),
          c => c.Name
        );
      })
      .shareReplay(1);
  }

  getList() {
    return this.categoryObservable;
  }

  getArray() {
    return this.categoryObservable.map(categories => Object.values(categories));
  }
}

export class Category {
  Locale: string;
  LocalName: string;
  Name: string;
  Active: boolean;
}
