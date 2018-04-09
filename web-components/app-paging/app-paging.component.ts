import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/concat';

@Component({
  selector: 'app-paging',
  templateUrl: './app-paging.component.html',
  styleUrls: ['./app-paging.component.scss']
})
export class AppPagingComponent implements OnInit {
  @Input()
  set count(count: number) {
    this._count = count;
    this.pageListObs = this.getPageList();
  }
  get count(): number {
    return this._count;
  }
  _count: number;

  page = 1;
  pageSize = pagingSize;
  pageListObs: Observable<number[]>;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {}

  getPageList(): Observable<number[]> {
    return this.route.paramMap
      .map(params => +params.get('page'))
      .map(page => {
        console.log('test');
        this.page = page;
        return _.chain(1)
          .range(this.count + 1)
          .chunk(this.pageSize)
          .find((ps: number[]) => ps.includes(page))
          .value();
      })
      .shareReplay();
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
