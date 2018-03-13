import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './app-search.component.html',
  styleUrls: ['./app-search.component.scss']
})
export class AppSearchComponent implements OnInit {
  @Input() search: string;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {}

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
