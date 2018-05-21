import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';

import { BaseService } from '../../services/base.service';

import { AppService } from '../../services/app.service';

import { App } from '../../services/app';
import { SectionAssemble, Section } from '../../services/section';
import { AppFilterFunc, Allowed } from '../appFilter';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'dstore-assemble',
  templateUrl: './assemble.component.html',
  styleUrls: ['./assemble.component.scss'],
})
export class AssembleComponent implements OnInit {
  server = BaseService.serverHosts.metadataServer;
  @Input() section: Section;
  @Input() assembleList: SectionAssemble[] = [];
  @Input() appFilter: AppFilterFunc = Allowed;

  constructor(private appService: AppService, private sanitizer: DomSanitizer) {}

  getCoverStyle(cover: string) {
    return this.sanitizer.bypassSecurityTrustStyle(`--cover: url("${cover}")`);
  }

  ngOnInit() {}
}
