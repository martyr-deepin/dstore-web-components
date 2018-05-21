import { Component, OnInit, Input } from '@angular/core';

import { BaseService } from '../../services/base.service';
import { App } from '../../services/app';
import { DownloadingService } from '../../services/downloading.service';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { Section } from '../../services/section';

@Component({
  selector: 'dstore-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
})
export class RankingComponent implements OnInit {
  constructor(private downloadingService: DownloadingService) {}

  metadataServer = BaseService.serverHosts.metadataServer;
  @Input() section: Section;
  apps$: Observable<App[]>;
  ngOnInit() {
    const category = this.section.ranking.category;
    this.apps$ = this.downloadingService
      .getList()
      .pipe(
        map(apps => apps.filter(app => (!category ? app : app.category === category))),
        map(apps => apps.slice(0, this.section.ranking.count)),
      );
  }
}
