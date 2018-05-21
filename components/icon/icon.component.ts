import { Component, OnInit, Input } from '@angular/core';

import { BaseService } from '../../services/base.service';
import { App } from '../../services/app';
import { AppService } from '../../services/app.service';
import { SectionApp, Section } from '../../services/section';
import { AppFilterFunc, Allowed } from '../appFilter';

@Component({
  selector: 'dstore-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent implements OnInit {
  constructor(private appService: AppService) {}
  metadataServer = BaseService.serverHosts.metadataServer;
  @Input() section: Section;
  private _apps: SectionApp[] = [];
  @Input()
  set apps(apps: SectionApp[]) {
    this._apps = apps;
  }
  get apps() {
    return this._apps.filter(app => app.show && this.appFilter(app.name));
  }
  @Input() appFilter: AppFilterFunc = Allowed;

  get more() {
    if (this.section.more) {
      return ['./apps', { apps: this.apps.map(app => app.name) }];
    }
  }
  ngOnInit() {}
}
