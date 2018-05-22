import { result, get } from 'lodash';

const DstoreObjectPath = 'dstore.channel.objects'.split('.');
export class DstoreObject {
  static openURL(url: string): void {
    console.log('openURL', url);
    console.log([...DstoreObjectPath, 'settings', 'openUrl']);
    get(window, [...DstoreObjectPath, 'settings', 'openUrl'])(url);
  }
  static getServers(): Promise<Servers> {
    return new Promise<Servers>((resolve, reject) => {
      get(window, [...DstoreObjectPath, 'settings', 'getServers'])((s: Servers) => resolve(s));
    });
  }
}
interface Servers {
  metadataServer: string;
  operationServer: string;
}
