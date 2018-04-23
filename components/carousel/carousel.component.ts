// 轮播图
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { animationFrame } from 'rxjs/scheduler/animationFrame';
import 'rxjs/add/operator/take';

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
    return this.carouselList.filter(carouse => carouse.images.length);
  }

  operationServer: string;
  selectIndex = 0;

  constructor(private appService: AppService) {
    this.operationServer = BaseService.serverHosts.operationServer;
  }

  next$: Observable<void>;
  goto: (index: number) => void;

  ngOnInit() {
    this.goto = _.throttle(index => {
      if (index >= this._carouselList.length) {
        index = 0;
      }
      this.selectIndex = index;
    }, 5000);

    this.next$ = Observable.timer(3000, 3000)
      .map(i => {
        console.log('next');
      })
      .do(() => {
        this.goto(this.selectIndex + 1);
      });
  }
}
