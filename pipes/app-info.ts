import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import * as _ from 'lodash';

import { environment } from '../../../environments/environment';
import { App } from '../services/app';
import { AppService } from '../services/app.service';

@Pipe({
  name: 'appInfo',
  pure: true,
})
export class AppInfoPipe implements PipeTransform {
  cacheGetApp: (appName: string) => Observable<App>;
  constructor(private appService: AppService) {
    this.cacheGetApp = _.memoize(
      this.appService.getAppByName.bind(this.appService),
    );
  }
  transform(appName: string): Observable<App> {
    return this.cacheGetApp(appName);
  }
}
