import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';

import { environment } from 'environments/environment';

import { AppService } from '../../services/app.service';

import { App } from '../../services/app';
import { SectionApp } from '../../services/section';

@Component({
  selector: 'dstore-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.scss']
})
export class CoverComponent implements OnInit {
  @Input() title = '';
  @Input() apps: SectionApp[] = [];

  metadataServer = environment.metadataServer;

  constructor() {}

  ngOnInit() {}
}
