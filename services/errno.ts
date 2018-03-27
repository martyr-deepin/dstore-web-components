export enum ErrorCode {
  CodeInternalServerError = 1,
  CodeIsExisted,
  CodeNotFound,
  CodeApiRateLimit,
  CodeBadParams,
  CodeAuthorizedFailed,
  CodeAuthorizedOutDate,
  CodeRuleFault,
  CodeForceSync
}
export const ErrorCodeString = [
  '内部错误',
  '已存在',
  '未找到',
  '过于频繁',
  '参数错误',
  '认证失败',
  '认证超时',
  '权限不足',
  '强制刷新'
];

export interface Error {
  code: number;
  content: string;
  key: string;
}
