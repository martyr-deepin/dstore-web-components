import { Component, OnInit, Input } from '@angular/core';

import { environment } from 'environments/environment';

import { App } from '../../services/app';
import { DownloadingService } from '../../services/downloading.service';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'dstore-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {
  metadataServer = environment.metadataServer;

  @Input() title: string;
  @Input()
  set category(category: string) {
    this.ranking = this.downloadingService
      .getList()
      .map(apps => apps.filter(app => !category || app.category === category));
  }
  @Input() count: number;

  ranking: Observable<App[]>;

  constructor(private downloadingService: DownloadingService) {}

  ngOnInit() {}
}
