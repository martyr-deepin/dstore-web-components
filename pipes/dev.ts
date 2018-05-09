import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';
// 只在开发模式输出
@Pipe({
  name: 'dev',
})
export class DevPipe implements PipeTransform {
  transform(value: any): '' {
    if (environment.production) {
      return null;
    }
    return value;
  }
}
