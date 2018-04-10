import { Component, OnInit, Input } from '@angular/core';
import { Section } from '../../services/section';
import { environment } from '../../environments/environment';

@Component({
  selector: 'dstore-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {
  @Input() section: Section;
  @Input() title: string;

  server = environment.server;

  constructor() {}

  ngOnInit() {}
}
