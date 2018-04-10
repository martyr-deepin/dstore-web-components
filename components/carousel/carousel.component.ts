// 轮播图
import { Component, OnInit, Input } from '@angular/core';

import { environment } from '../../environments/environment';

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

  server = environment.server;
  selectIndex = 0;

  constructor(private appService: AppService) {}

  ngOnInit() {}

  get _carouselList() {
    return this.carouselList.filter(carouse => carouse.images.length);
  }
}
