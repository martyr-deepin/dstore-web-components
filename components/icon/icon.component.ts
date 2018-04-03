import { Component, OnInit, Input } from '@angular/core';

import { environment } from '../../environments/environment';
import { App } from '../../services/app';
import { AppService } from '../../services/app.service';
import { SectionApp } from '../../services/section';

@Component({
  selector: 'dstore-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class iconComponent implements OnInit {
  metadataServer = environment.metadataServer;
  @Input() title: string = '';
  @Input() apps: SectionApp[] = [];

  constructor(private appService: AppService) {}

  ngOnInit() {}
}
