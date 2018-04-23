import { environment } from 'environments/environment';

export class BaseService {
  constructor() {}

  static get serverHosts() {
    if (BaseService.isNative) {
      return {
        operationServer: window['dstore']['operationServer'],
        metadataServer: window['dstore']['metadataServer'],
      };
    } else {
      return {
        operationServer: environment.operationServer,
        metadataServer: environment.metadataServer,
      };
    }
  }
  static get isNative() {
    return window.hasOwnProperty('dstore') && window['dstore']['channel'];
  }
  static get whiteList() {
    const list = [this.serverHosts.operationServer].map((url: string) => {
      return url.slice(url.indexOf('://') + 3);
    });
    return list;
  }
}

interface ServerHosts {
  server: string;
  metadataServer: string;
}
