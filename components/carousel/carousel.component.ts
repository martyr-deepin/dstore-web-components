import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, timer, from } from 'rxjs';
import { map, take } from 'rxjs/operators';

import * as _ from 'lodash';

import { BaseService } from '../../services/base.service';
import { AppService } from '../../services/app.service';

import { App } from '../../services/app';
import { SectionCarousel } from '../../services/section';
import { AppFilterFunc, Allowed } from '../appFilter';

@Component({
  selector: 'dstore-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appService: AppService,
  ) {}

  operationServer = BaseService.serverHosts.operationServer;
  selectIndex = 0;
  @Input() carouselList: SectionCarousel[];
  @Input() appFilter: AppFilterFunc = Allowed;
  get _carouselList() {
    return this.carouselList.filter(
      carouse => carouse.images.length > 0 && carouse.show && this.appFilter(carouse.name),
    );
  }
  next$: Observable<void>;
  goto = _.throttle(this._goto, 5000);
  click = _.throttle((index, name) => {
    setTimeout(() => this._click(index, name), 0);
  }, 500);

  ngOnInit() {
    this.next$ = timer(3000, 3000).pipe(
      map(() => {
        console.log('next');
        this.goto(this.selectIndex + 1);
      }),
    );
  }

  _goto(index: number) {
    if (index >= this._carouselList.length) {
      index = 0;
    }
    let left: number[], right: number[];
    if (index > this.selectIndex) {
      left = _.range(this.selectIndex + 1, index + 1);
      right = _
        .range(this.selectIndex - 1, -1)
        .concat(_.range(this._carouselList.length - 1, index - 1));
    } else {
      left = _.range(this.selectIndex - 1, index - 1);
      right = _.range(this.selectIndex + 1, this._carouselList.length).concat(_.range(index + 1));
    }
    const select = left.length > right.length ? right : left;
    timer(0, 150)
      .pipe(take(select.length))
      .subscribe(i => {
        i = select[i];
        console.log(i, new Date());
        this.selectIndex = i;
      });
  }

  _click(index: number, name: string) {
    console.log('_click', new Date());
    if (this.selectIndex === index && name !== '') {
      this.router.navigate([name], { relativeTo: this.route });
      return;
    }
    this.goto(index);
    this.goto.flush();
  }

  getClass(index: number): string {
    switch (index) {
      case this.selectIndex:
        return 'current';
      case this.selectIndex + 1:
        return 'next';
      case this.selectIndex - 1:
        return 'last';
      case 0:
        if (this.selectIndex === this._carouselList.length - 1) {
          return 'next';
        }
        break;
      case this._carouselList.length - 1:
        if (this.selectIndex === 0) {
          return 'last';
        }
        break;
    }
  }
}
