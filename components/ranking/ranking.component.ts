import { Component, OnInit, Input } from '@angular/core';

import { environment } from '../../environments/environment';
import { App } from '../../services/app';
import { Section } from '../../services/section';
import { DownloadingService } from '../../services/downloading.service';

@Component({
  selector: 'dstore-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {
  metadataServer = environment.metadataServer;

  @Input() section: Section;
  ranking: App[];

  constructor(private downloadingService: DownloadingService) {}

  ngOnInit() {
    this.downloadingService
      .getList()
      .map(apps =>
        apps
          .filter(
            app =>
              !this.section.ranking.category ||
              app.category === this.section.ranking.category
          )
          .slice(0, this.section.ranking.count)
      )
      .subscribe(apps => (this.ranking = apps));
  }
}
