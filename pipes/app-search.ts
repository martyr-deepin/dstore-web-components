import { Pipe, PipeTransform } from '@angular/core';

import { environment } from '../../../environments/environment';
import { App } from '../services/app';

@Pipe({
  name: 'appSearch'
})
export class AppSearchPipe implements PipeTransform {
  transform(value: App[], keyword: string): App[] {
    if (value == null) {
      return [];
    }
    return value.filter(app =>
      [app.name, ...Object.values(app.localInfo.description)]
        .map((s: string) => s.includes(keyword))
        .includes(true)
    );
  }
}
