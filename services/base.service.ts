import { Injectable } from '@angular/core';

import { environment } from 'environments/environment';

@Injectable()
export class BaseService {
  constructor() {}

  get serverHosts() {
    if (this.isNative) {
      return {
        operationServer: environment.operationServer,
        metadataServer: environment.metadataServer
      };
    } else {
      return {
        operationServer: environment.operationServer,
        metadataServer: environment.metadataServer
      };
    }
  }
  get isNative() {
    return window.hasOwnProperty('channel');
  }
}

interface ServerHosts {
  server: string;
  metadataServer: string;
}
