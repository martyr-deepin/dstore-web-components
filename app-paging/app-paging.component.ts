import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-paging',
  templateUrl: './app-paging.component.html',
  styleUrls: ['./app-paging.component.scss']
})
export class AppPagingComponent implements OnInit {
  @Input() count: number;
  page: number;
  size = defaultPageSize;

  pages: number[];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      this.page = parseInt(param.get('page'));
      this.pages = this.getPages();
    });
  }

  getPages(): number[] {
    let pages = new Array(this.count).fill(0).map((v, i) => i + 1);
    if (pages.length <= pagingSize) {
      this.pages = pages;
      return;
    }
    if (this.page < pagingSize / 2) {
      pages = pages.slice(0, pagingSize);
    } else if (this.page < this.count - pagingSize / 2) {
      pages = pages.slice(
        this.page - pagingSize / 2,
        this.page + pagingSize / 2
      );
    } else {
      pages = pages.slice(this.count - pagingSize);
    }
    return pages;
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
