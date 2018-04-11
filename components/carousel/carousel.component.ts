// 轮播图
import { Component, OnInit, Input } from '@angular/core';

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

  operationServer: string;
  selectIndex = 0;

  constructor(private appService: AppService, private baseServer: BaseService) {
    this.operationServer = baseServer.serverHosts.operationServer;
  }

  ngOnInit() {}

  get _carouselList() {
    return this.carouselList.filter(carouse => carouse.images.length);
  }
}
