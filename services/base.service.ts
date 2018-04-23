import { environment } from 'environments/environment';

export class BaseService {
  constructor() {}

  get serverHosts() {
    if (this.isNative) {
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
  get isNative() {
    return window.hasOwnProperty('dstore') && window['dstore']['channel'];
  }
  get whiteList() {
    const list = [this.serverHosts.operationServer].map((url: string) => {
      return url.slice(url.indexOf('://') + 3);
    });
    console.log(list);
    return list;
  }
}

interface ServerHosts {
  server: string;
  metadataServer: string;
}
