import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';
// 在数组里选择合适的值，用于选择普通图片和高清图片
@Pipe({
  name: 'fitImage',
})
export class FitImage implements PipeTransform {
  transform(value: string[]): string {
    const ratio = Math.ceil(devicePixelRatio);
    if (ratio === 1) {
      return value[0] || value[1] || '';
    } else {
      return value[1] || value[0] || '';
    }
  }
}
