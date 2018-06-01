export interface StoreJobInfo {
  id: string;
  job: string;
  name: string;
  status: StoreJobStatus;
  type: StoreJobType;
  speed: number;
  progress: number;
  description: string;
  downloadSize: number;
  createTime: number;
  packages: string;
  cancelable: boolean;
}
export enum StoreJobType {
  download = 'download',
  install = 'install',
  uninstall = 'remove',
}
export enum StoreJobStatus {
  paused = 'paused',
  running = 'running',
  ready = 'ready',
  failed = 'failed',
}
export enum AppJobStatus {
  undefined,
  ready,
  running,
  finish,
}
export interface AppJobInfo {
  status: AppJobStatus;
  jobInfo: StoreJobInfo;
}
