import { Injectable } from '@angular/core';

import { environment } from 'environments/environment';

@Injectable()
export class BaseService {
  constructor() {}

  get serverHosts() {
    if (this.isNative) {
      return {
        operationServer: window['dstore']['operationServer'],
        metadataServer: window['dstore']['metadataServer']
      };
    } else {
      return {
        operationServer: environment.operationServer,
        metadataServer: environment.metadataServer
      };
    }
  }
  get isNative() {
    return window.hasOwnProperty('dstore') && window['dstore']['channel'];
  }
}

interface ServerHosts {
  server: string;
  metadataServer: string;
}
