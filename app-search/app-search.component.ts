import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './app-search.component.html',
  styleUrls: ['./app-search.component.scss']
})
export class AppSearchComponent implements OnInit {
  search: string;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe(
      query => (this.search = query.get('search'))
    );
  }

  onSearch(search) {
    const extras: NavigationExtras = {
      relativeTo: this.route
    };
    if (search) {
      extras.queryParams = { search };
    }
    this.router.navigate(['../1'], extras);
  }
}
