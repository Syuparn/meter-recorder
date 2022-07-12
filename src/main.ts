import { container } from './di/container';

export function handler() {
  const controller = container();
  const req = { timestamp: new Date() };
  controller.getEnvironment(req);
}

// HACK: enable to execute handler from GAS
//
// Since functions in bundled file are wrapped by IIFE, handler() cannot be called even though it is exported.
// By using esbuild-gas-plugin, it can be referred as global's property.
// ref: https://tech.smarthr.jp/entry/2022/07/01/132343 (in Japanese)
//
declare let global: any;
global.handler = handler;
