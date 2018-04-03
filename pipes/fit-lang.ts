import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';
// 在数组里选择合适的值，用于选择多语言和高清图片
@Pipe({
  name: 'fitLanguage'
})
export class FitLanguage implements PipeTransform {
  transform(value: string[]): string {
    return value[0] || '';
  }
}
