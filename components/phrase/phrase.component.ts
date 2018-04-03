import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';
import { App } from '../../services/app';
import { AppService } from '../../services/app.service';
import { SectionPhrase } from '../../services/section';

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
  metadataServer = environment.metadataServer;

  @Input() title: string;
  @Input() phraseList: SectionPhrase[];
  constructor() {}

  ngOnInit() {}
}
