// 轮播图
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/take';

import * as _ from 'lodash';

import { BaseService } from '../../services/base.service';
import { AppService } from '../../services/app.service';

import { App } from '../../services/app';
import { SectionCarousel } from '../../services/section';

@Component({
  selector: 'dstore-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  @Input() carouselList: SectionCarousel[];

  interval: Subscription;
  operationServer: string;
  selectIndex = 0;

  constructor(private appService: AppService, private baseServer: BaseService) {
    this.operationServer = baseServer.serverHosts.operationServer;
  }

  ngOnInit() {
    this.reStart();
  }

  reStart() {
    if (this.interval) {
      this.interval.unsubscribe();
    }
    this.interval = Observable.timer(2500, 2500).subscribe(() => {
      this.selectIndex++;
      if (this.selectIndex >= this._carouselList.length) {
        this.selectIndex = 0;
      }
    });
  }

  get _carouselList() {
    return this.carouselList.filter(carouse => carouse.images.length);
  }
  goto(index: number) {
    const r = _.range(this.selectIndex, index);
    r.push(index);
    this.interval.unsubscribe();
    Observable.timer(0, 250)
      .take(r.length)
      .subscribe(i => (this.selectIndex = r[i]), null, () => this.reStart());
  }
}
