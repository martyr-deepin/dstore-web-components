import { Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { memoize } from 'lodash';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { BaseService } from '../services/base.service';
import { DeepinInfo } from '../services/deepin-info.model';

@Pipe({
  name: 'deepinInfo',
})
export class DeepinInfoPipe implements PipeTransform {
  constructor(private http: HttpClient) {}
  transform = memoize(
    (value: string): Observable<DeepinInfo> => {
      return this.http
        .get<{ user: DeepinInfo }>(
          BaseService.serverHosts.metadataServer + '/api/deepin_user/' + value,
        )
        .pipe(
          map(resp => resp.user),
          shareReplay(),
        );
    },
  );
}
