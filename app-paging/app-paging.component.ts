import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-paging',
  templateUrl: './app-paging.component.html',
  styleUrls: ['./app-paging.component.scss']
})
export class AppPagingComponent implements OnInit {
  pageLimit = 7;
  count: number;
  pages: number[];
  current: number;

  @Input('pageCount')
  set pageCount(count: number) {
    this.count = count;
    this.getPages();
  }

  @Input('currentPage')
  set currentPage(current: number) {
    this.current = current;
    this.getPages();
  }

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {}

  getPages() {
    let pages = new Array(this.count).fill(0).map((v, i) => i + 1);
    if (pages.length <= this.pageLimit) {
      this.pages = pages;
      return;
    }
    if (this.current < this.pageLimit / 2) {
      pages = pages.slice(0, this.pageLimit);
    } else if (this.current < this.count - this.pageLimit / 2) {
      pages = pages.slice(
        this.current - this.pageLimit / 2,
        this.current + this.pageLimit / 2
      );
    } else {
      pages = pages.slice(this.count - this.pageLimit);
    }
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
