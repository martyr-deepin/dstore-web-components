import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, timer, from, fromEvent, merge, Subject } from 'rxjs';
import { map, take, startWith, timeInterval, delayWhen } from 'rxjs/operators';

import { range } from 'lodash';

import { BaseService } from '../../services/base.service';
import { AppService } from '../../services/app.service';

import { App } from '../../services/app';
import { SectionCarousel, CarouselType } from '../../services/section';
import { AppFilterFunc, Allowed } from '../appFilter';

const speed = '0.3s';
const defaultStyle = style({ transform: 'translateX(0)' });
const toLeft = [style({ transform: 'translateX(100%)' }), animate(speed)];
const toRight = [style({ transform: 'translateX(-100%)' }), animate(speed)];

@Component({
  selector: 'dstore-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  animations: [
    trigger('carousel', [
      state('0', defaultStyle),
      state('1', defaultStyle),
      state('2', defaultStyle),

      transition('1 => 0', toLeft),
      transition('2 => 1', toLeft),
      transition('void => 2', toLeft),
      transition('void => 0', toRight),
      transition('0 => 1', toRight),
      transition('1 => 2', toRight),

      transition('0 => void', [
        style({ position: 'absolute' }),
        animate(speed, style({ transform: 'translateX(-100%)' })),
      ]),
      transition('2 => void', [
        style({ position: 'absolute', right: 0 }),
        animate(speed, style({ transform: 'translateX(100%)' })),
      ]),
    ]),
  ],
})
export class CarouselComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appService: AppService,
  ) {}
  operationServer = BaseService.serverHosts.operationServer;
  @Input() carouselList: SectionCarousel[];
  @Input() appFilter: AppFilterFunc = Allowed;
  get _carouselList() {
    return this.carouselList
      .filter(carousel => carousel.images.length > 0 && carousel.show)
      .filter(carousel => carousel.type !== CarouselType.App || this.appFilter(carousel.link));
  }
  selectSub = new Subject<number>();
  selectIndex = 0;
  list: SectionCarousel[];
  left = 0;

  ngOnInit() {
    this.centerAlign();
    this.selectSub.pipe(startWith(0)).subscribe(i => {
      console.log('sub', i);
      this.getList(i);
    });
  }

  centerAlign() {
    const context = document.querySelector('.context');
    const carousel = document.querySelector('.carouselList');
    merge(fromEvent(window, 'resize'), timer(0)).subscribe(() => {
      this.left = -(carousel.clientWidth - context.clientWidth) / 2;
      console.log('resize', context.clientWidth, carousel.clientWidth);
    });
  }

  getList(index: number) {
    const cs = this._carouselList;
    if (index < 0) {
      index = this._carouselList.length - 1;
    }
    if (index >= this._carouselList.length) {
      index = 0;
    }
    this.selectIndex = index;

    let list: SectionCarousel[];
    switch (index) {
      case 0:
        list = [cs[cs.length - 1], ...cs.slice(0, 2)];
        break;
      case cs.length - 1:
        list = [cs[cs.length - 2], cs[cs.length - 1], cs[0]];
        break;
      default:
        list = cs.slice(index - 1, index + 2);
        break;
    }
    this.list = list;
  }

  click(index: number) {
    if (index === this.selectIndex) {
      const select = this._carouselList[this.selectIndex];
      if (select.type === CarouselType.App) {
        this.router.navigate([select.link], { relativeTo: this.route });
      } else {
        this.router.navigate([select.link]);
      }
      return;
    }
    this.selectSub.next(index);
  }

  select(index: number) {
    const arr = range(this.selectIndex, index + (this.selectIndex > index ? -1 : 1));
    this.go(arr);
  }
  go(arr: number[]) {
    this.selectSub.next(arr.shift());
    if (arr.length > 0) {
      requestAnimationFrame(() => this.go(arr));
    }
  }
}
