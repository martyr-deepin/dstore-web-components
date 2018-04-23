import { Component, OnInit, Input } from '@angular/core';

import { BaseService } from '../../services/base.service';
import { Section } from '../../services/section';

@Component({
  selector: 'dstore-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss'],
})
export class TopicComponent implements OnInit {
  @Input() section: Section;
  @Input() title: string;

  operationServer: string;

  constructor() {
    this.operationServer = BaseService.serverHosts.operationServer;
  }

  ngOnInit() {}
}
