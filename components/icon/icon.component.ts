import { Component, OnInit, Input } from '@angular/core';

import { environment } from '../../environments/environment';
import { App } from '../../services/app';
import { AppService } from '../../services/app.service';
import { Section } from '../../services/section';

@Component({
  selector: 'dstore-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class iconComponent implements OnInit {
  metadataServer = environment.metadataServer;

  @Input() section: Section;
  apps: App[] = [];

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.appService
      .getAppListByNames(this.section.apps.map(app => app.name))
      .subscribe(
        appList => (this.apps = this.section.apps.map(app => appList[app.name]))
      );
  }
}
