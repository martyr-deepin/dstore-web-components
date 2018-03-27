import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-paging',
  templateUrl: './app-paging.component.html',
  styleUrls: ['./app-paging.component.scss']
})
export class AppPagingComponent implements OnInit {
  @Input()
  set count(count: number) {
    this._count = count;
    this.getPages();
  }
  get count(): number {
    return this._count;
  }
  _count: number;
  page: number;
  pages: number[];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    Observable.combineLatest(
      this.route.paramMap,
      this.route.queryParamMap
    ).subscribe(this.getPages.bind(this));
  }

  getPages() {
    const page = +this.route.snapshot.params['page'];
    let pages = _.chain(1)
      .range(this.count + 1)
      .chunk(pagingSize)
      .filter((chunk: number[]) => chunk.includes(page))
      .last()
      .value();
    if (pages.length < pagingSize && pages.includes(this.count)) {
      pages = _.chain(this.count - pagingSize + 1)
        .range(this.count + 1)
        .filter(n => n > 0)
        .value();
    }
    this.page = page;
    this.pages = pages;
  }

  goto(page: number) {
    this.router.navigate(['..', page], {
      relativeTo: this.route,
      queryParamsHandling: 'merge'
    });
  }
}

export const defaultPageSize = 10;
export const pagingSize = 7;
