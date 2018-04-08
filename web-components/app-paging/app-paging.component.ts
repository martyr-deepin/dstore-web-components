import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';

@Component({
  selector: 'app-paging',
  templateUrl: './app-paging.component.html',
  styleUrls: ['./app-paging.component.scss']
})
export class AppPagingComponent implements OnInit {
  @Input()
  set count(count: number) {
    this._count = count;
  }
  get count(): number {
    return this._count;
  }
  _count: number;
  page: number;
  pages: number[];

  pageSize = pagingSize;
  pageListObs: Observable<number[]>;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.pageListObs = this.route.params
      .map(params => +params['page'])
      .map(page => {
        this.page = page;
        return _.chain(1)
          .range(this.count + 1)
          .chunk(this.pageSize)
          .find((ps: number[]) => ps.includes(page))
          .value();
      })
      .shareReplay();
    // Observable.combineLatest(
    //   this.route.paramMap,
    //   this.route.queryParamMap
    // ).subscribe(() => this._count > 1 && this.getPages.bind(this));
  }

  // getPages() {
  //   console.log(this._count);
  //   const page = +this.route.snapshot.params['page'];
  //   let pages = _.chain(1)
  //     .range(this.count + 1)
  //     .chunk(pagingSize)
  //     .filter((chunk: number[]) => chunk.includes(page))
  //     .last()
  //     .value();
  //   if (pages.length < pagingSize && pages.includes(this.count)) {
  //     pages = _.chain(this.count - pagingSize + 1)
  //       .range(this.count + 1)
  //       .filter(n => n > 0)
  //       .value();
  //   }
  //   this.page = page;
  //   this.pages = pages;
  // }

  goto(page: number) {
    this.router.navigate(['..', page], {
      relativeTo: this.route,
      queryParamsHandling: 'merge'
    });
  }
}

export const defaultPageSize = 10;
export const pagingSize = 7;
