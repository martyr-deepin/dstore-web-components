import { Directive, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material';

@Directive({
  selector: 'mat-paginator',
})
export class MyPaginatorDirective {
  constructor(paginator: MatPaginator) {
    paginator.initialized.subscribe(() => {
      paginator.showFirstLastButtons = true;
      paginator.pageSizeOptions = [8, 10, 16];
      paginator.pageSize = Number(localStorage.getItem('pageSize')) || 8;

      paginator.page.subscribe(e => {
        localStorage.setItem('pageSize', e.pageSize);
      });
    });
  }
}
