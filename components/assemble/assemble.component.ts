import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';

import { environment } from '../../environments/environment';

import { AppService } from '../../services/app.service';

import { App } from '../../services/app';
import { Section, SectionApp } from '../../services/section';

@Component({
  selector: 'dstore-assemble',
  templateUrl: './assemble.component.html',
  styleUrls: ['./assemble.component.scss']
})
export class AssembleComponent implements OnInit {
  @Input() section: Section;

  metadataServer = environment.metadataServer;

  appList: { [key: string]: App };

  constructor(private appService: AppService) {}

  ngOnInit() {
    // console.log(
    //   _.chain(this.section.items)
    //     .flatMap(assemble => assemble.apps.map(app => app.name))
    //     .value()
    // );
    this.appService
      .getAppListByNames(
        _.flatMap(this.section.items, assemble =>
          assemble.apps.map(app => app.name)
        )
      )
      .subscribe(appList => {
        this.appList = _.keyBy(appList, app => app.name);
      });
  }
}
