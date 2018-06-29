import { result, get, noop } from 'lodash';
import { Observable } from 'rxjs';

const DstoreObjectPath = 'dstore.channel.objects'.split('.');

export class DstoreObject {
  static openURL(url: string): void {
    console.log('openURL', url);
    get(window, [...DstoreObjectPath, 'settings', 'openUrl'], noop)(url);
  }

  static raiseWindow() {
    console.log('raiseWindow');
    result(window, [...DstoreObjectPath, 'settings', 'raiseWindow']);
  }

  static getServers(): Promise<Servers> {
    return new Promise<Servers>((resolve, reject) => {
      get(window, [...DstoreObjectPath, 'settings', 'getServers'], noop)((s: Servers) =>
        resolve(s),
      );
    });
  }

  static clearArchives(): Observable<void> {
    return new Observable<void>(obs => {
      const clearArchives: Signal = get(window, [
        ...DstoreObjectPath,
        'storeDaemon',
        'clearArchives',
      ]);
      if (!clearArchives) {
        obs.error(new Error('do not get'));
      }
      const callBack = () => {
        obs.next();
      };
      clearArchives.connect(callBack);
      return () => {
        clearArchives.disconnect(callBack);
      };
    });
  }
}
interface Servers {
  metadataServer: string;
  operationServer: string;
}
interface Signal {
  connect: (CallBack) => {};
  disconnect: (CallBack) => {};
}
type CallBack = (result?: any[]) => {};
