// 轮播图
import { Component, OnInit, Input } from '@angular/core';

import { environment } from '../../environments/environment';

import { AppService } from '../../services/app.service';

import { App } from '../../services/app';
import { Section, SectionCarousel } from '../../services/section';

@Component({
  selector: 'dstore-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  @Input() section: Section;

  server = environment.server;
  selectIndex = 0;

  constructor(private appService: AppService) {}

  ngOnInit() {}
}
