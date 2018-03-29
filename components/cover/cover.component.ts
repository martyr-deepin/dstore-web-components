import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';

import { environment } from '../../environments/environment';

import { AppService } from '../../services/app.service';

import { App } from '../../services/app';
import { Section, SectionApp } from '../../services/section';

@Component({
  selector: 'dstore-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.scss']
})
export class CoverComponent implements OnInit {
  @Input() section: Section;

  metadataServer = environment.metadataServer;

  apps: App[];

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.appService
      .getAppListByNames(this.section.items.map((app: SectionApp) => app.name))
      .subscribe(appList => {
        this.apps = appList;
      });
  }
}
