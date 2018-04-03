import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';

import { environment } from '../../environments/environment';

import { AppService } from '../../services/app.service';

import { App } from '../../services/app';
import { SectionAssemble } from '../../services/section';

@Component({
  selector: 'dstore-assemble',
  templateUrl: './assemble.component.html',
  styleUrls: ['./assemble.component.scss']
})
export class AssembleComponent implements OnInit {
  metadataServer = environment.metadataServer;
  @Input() title: string = '';
  @Input() assembleList: SectionAssemble[] = [];

  constructor(private appService: AppService) {}

  ngOnInit() {}
}
