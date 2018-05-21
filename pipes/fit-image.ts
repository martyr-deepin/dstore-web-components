import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';
// select image based on ratio
@Pipe({
  name: 'fitImage',
})
export class FitImage implements PipeTransform {
  transform(value: string[]): string {
    const ratio = Math.ceil(devicePixelRatio);
    if (ratio === 1) {
      return value[0] || value[1] || '/assets/images/default_cover.png';
    } else {
      return value[1] || value[0] || '/assets/images/default_cover.png';
    }
  }
}
