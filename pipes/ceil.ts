import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';
// Math.ceil管道版本
@Pipe({
  name: 'ceil'
})
export class Ceil implements PipeTransform {
  transform(value: number): number {
    return Math.ceil(value);
  }
}
