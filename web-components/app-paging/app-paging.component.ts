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
        this.page = page;
        const pageList = _.chain(1)
          .range(this.count + 1)
          .chunk(this.pageSize)
          .map((ps: number[]) => {
            console.log(ps);
            if (ps.length < this.pageSize && ps.includes(this.count)) {
              return _.range(
                this.count > this.pageSize ? this.count - this.pageSize : 1,
                this.count + 1
              );
            }
            return ps;
          })
          .find((ps: number[]) => ps.includes(page))
          .value();
        return pageList;
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
