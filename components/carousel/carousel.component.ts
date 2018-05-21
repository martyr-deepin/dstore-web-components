import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { animationFrame } from 'rxjs/scheduler/animationFrame';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/timer';

import * as _ from 'lodash';

import { BaseService } from '../../services/base.service';
import { AppService } from '../../services/app.service';

import { App } from '../../services/app';
import { SectionCarousel } from '../../services/section';
import { Scheduler } from 'rxjs/Scheduler';

@Component({
  selector: 'dstore-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  @Input() carouselList: SectionCarousel[];
  get _carouselList() {
    return this.carouselList.filter(carouse => carouse.images.length > 0 && carouse.show);
  }
  operationServer = BaseService.serverHosts.operationServer;
  selectIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appService: AppService,
  ) {}

  next$: Observable<void>;
  goto = _.throttle(this._goto, 5000);

  ngOnInit() {
    this.next$ = Observable.timer(3000, 3000).map(() => {
      console.log('next');
      this.goto(this.selectIndex + 1, '');
    });
  }

  _goto(index: number, name: string) {
    if (index >= this._carouselList.length) {
      index = 0;
    }
    this.selectIndex = index;
  }

  click(index: number, name: string) {
    if (this.selectIndex === index && name !== '') {
      this.router.navigate([name], { relativeTo: this.route });
      return;
    }
    this.goto(index, name);
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
