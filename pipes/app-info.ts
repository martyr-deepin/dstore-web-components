import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';
import { App } from '../services/app';
import { AppService } from '../services/app.service';

@Pipe({
  name: 'appInfo',
  pure: false
})
export class AppInfoPipe implements PipeTransform {
  name: string;
  cacheObservable: Observable<App>;

  constructor(private appService: AppService) {}

  transform(appName: string): Observable<App> {
    if (appName === this.name) {
      return this.cacheObservable;
    }
    this.name = appName;
    this.cacheObservable = this.appService.getAppByName(this.name);
    return this.cacheObservable;
  }
}
