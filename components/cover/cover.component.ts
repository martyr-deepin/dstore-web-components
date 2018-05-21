import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

import { BaseService } from '../../services/base.service';
import { AppService } from '../../services/app.service';

import { App } from '../../services/app';
import { SectionApp, Section } from '../../services/section';
import { AppFilterFunc, Allowed } from '../appFilter';

@Component({
  selector: 'dstore-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.scss'],
})
export class CoverComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}
  server = BaseService.serverHosts.metadataServer;
  @Input() section: Section;
  @Input() apps: SectionApp[] = [];
  @Input() appFilter: AppFilterFunc = Allowed;

  get getMoreUrl() {
    if (this.section.more) {
      return ['./apps', { apps: this.apps.map(app => app.name) }];
    }
  }
  ngOnInit() {}
}
