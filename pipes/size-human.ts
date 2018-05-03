import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';
// Math.ceil管道版本
@Pipe({
  name: 'sizeHuman',
})
export class SizeHuman implements PipeTransform {
  transform(value: number): string {
    if (!value || value < 0) {
      value = 0;
    }
    if (value < 1024) {
      return value + 'b';
    }
    let u = -1;
    while (value >= 1024) {
      value /= 1024;
      u++;
    }
    return value.toFixed(2) + 'KMGT'[u] + 'B';
  }
}
