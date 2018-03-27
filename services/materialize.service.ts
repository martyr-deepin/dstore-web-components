import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';

declare var Materialize: any;

@Injectable()
export class MaterializeService {
  toastSubject: Subject<{ body: string; delay: number }> = new Subject();

  constructor() {
    this.toastSubject.debounceTime(500).subscribe(toastInfo => {
      if (Materialize && Materialize.toast) {
        Materialize.toast(toastInfo.body, toastInfo.delay);
      }
    });
  }

  toastSuccess(err: string) {
    this.toastSubject.next({
      body: `<span class='green-text'>${err}</span>`,
      delay: 2000
    });
  }

  toastError(err: string) {
    this.toastSubject.next({
      body: `<span class='red-text'>${err}</span>`,
      delay: 3000
    });
  }
  updateTextFields() {
    if (Materialize && Materialize.updateTextFields) {
      Materialize.updateTextFields();
    }
  }
}
