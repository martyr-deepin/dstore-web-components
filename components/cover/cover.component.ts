import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';
import { Observable } from 'rxjs';

import { BaseService } from '../../services/base.service';
import { AppService } from '../../services/app.service';

import { App } from '../../services/app';
import { SectionApp, Section } from '../../services/section';

@Component({
  selector: 'dstore-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.scss'],
})
export class CoverComponent implements OnInit {
  constructor() {}
  @Input() apps: SectionApp[] = [];
  @Input() section: Section;
  server = BaseService.serverHosts.metadataServer;
  ngOnInit() {}
}
