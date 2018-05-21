import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { BaseService } from '../../services/base.service';
import { App } from '../../services/app';
import { AppService } from '../../services/app.service';
import { SectionPhrase, Section } from '../../services/section';
import { AppFilterFunc, Allowed } from '../appFilter';

interface AppPhrase {
  app: App;
  phrase: SectionPhrase;
}

@Component({
  selector: 'dstore-phrase',
  templateUrl: './phrase.component.html',
  styleUrls: ['./phrase.component.scss'],
})
export class PhraseComponent implements OnInit {
  constructor() {}

  metadataServer = BaseService.serverHosts.metadataServer;
  @Input() section: Section;
  private _phraseList: SectionPhrase[] = [];
  @Input()
  set phraseList(apps: SectionPhrase[]) {
    this._phraseList = apps;
  }
  get phraseList() {
    return this._phraseList.filter(app => app.show && this.appFilter(app.name));
  }
  @Input() appFilter: AppFilterFunc = Allowed;

  get getMore() {
    if (this.section.more) {
      return ['./apps', { apps: this.phraseList.map(phrase => phrase.name) }];
    }
  }
  ngOnInit() {}
}
