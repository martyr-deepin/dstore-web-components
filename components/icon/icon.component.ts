import { Component, OnInit, Input } from '@angular/core';

import { BaseService } from '../../services/base.service';
import { App } from '../../services/app';
import { AppService } from '../../services/app.service';
import { SectionApp } from '../../services/section';

@Component({
  selector: 'dstore-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent implements OnInit {
  metadataServer: string;
  @Input() title = '';
  @Input() apps: SectionApp[] = [];

  constructor(private appService: AppService) {
    this.metadataServer = BaseService.serverHosts.metadataServer;
  }

  ngOnInit() {}
}
