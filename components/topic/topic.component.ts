import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dstore-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {
  appList = new Array(4);

  constructor() {}

  ngOnInit() {}
}
