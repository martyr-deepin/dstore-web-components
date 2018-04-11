import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { BaseService } from '../../services/base.service';
import { App } from '../../services/app';
import { AppService } from '../../services/app.service';
import { SectionPhrase } from '../../services/section';
import { BaseRequestOptions } from '@angular/http';

interface AppPhrase {
  app: App;
  phrase: SectionPhrase;
}

@Component({
  selector: 'dstore-phrase',
  templateUrl: './phrase.component.html',
  styleUrls: ['./phrase.component.scss']
})
export class PhraseComponent implements OnInit {
  metadataServer: string;

  @Input() title = '';
  @Input() phraseList: SectionPhrase[];

  constructor(private baseService: BaseService) {
    this.metadataServer = baseService.serverHosts.metadataServer;
  }

  ngOnInit() {}
}
