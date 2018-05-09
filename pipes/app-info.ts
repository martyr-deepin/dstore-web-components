import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import * as _ from 'lodash';

import { environment } from '../../../environments/environment';
import { App } from '../services/app';
import { AppService } from '../services/app.service';

@Pipe({
  name: 'appInfo',
})
export class AppInfoPipe implements PipeTransform {
  constructor(private appService: AppService) {}

  transform = _.memoize(name => this.appService.getAppByName(name).pipe(shareReplay()));
}
