import { environment } from 'environments/environment';
import { has, get } from 'lodash';
export class BaseService {
  constructor() {}

  static get serverHosts(): ServerHosts {
    return {
      operationServer: get(window, ['dstore', 'operationServer'], environment.operationServer),
      metadataServer: get(window, ['dstore', 'metadataServer'], environment.metadataServer),
    };
  }

  static get isNative(): boolean {
    return has(window, ['dstore', 'channel']);
  }

  static get whiteList(): string[] {
    const list = [this.serverHosts.operationServer].map((url: string) => {
      return url.slice(url.indexOf('://') + 3);
    });
    return list;
  }
}

interface ServerHosts {
  operationServer: string;
  metadataServer: string;
}
