import { Component, OnInit, Input } from '@angular/core';

import { environment } from '../../environments/environment';
import { App } from '../../services/app';
import { AppService } from '../../services/app.service';
import { Section } from '../../services/section';

@Component({
  selector: 'dstore-phrase',
  templateUrl: './phrase.component.html',
  styleUrls: ['./phrase.component.scss']
})
export class PhraseComponent implements OnInit {
  metadataServer = environment.metadataServer;

  @Input() section: Section;
  appList: { [key: string]: App };

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.appService
      .getAppListByNames(this.section.apps.map(app => app.name))
      .subscribe(apps => console.log((this.appList = apps)));
  }
}
