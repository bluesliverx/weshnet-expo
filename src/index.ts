// import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

import api from './api';
import { rpcBridgeImpl } from './rpc'
import { createServiceClient } from './service'
import { ProtocolServiceClient } from './weshnet.types.gen'
import base64 from "base64-js";
// Import the native module. On web, it will be resolved to WeshnetExpo.web.ts
// and on native platforms to WeshnetExpo.ts
import WeshnetExpoModule from './WeshnetExpoModule'

// Export these types to be used in consuming apps
export * as ProtocolTypes from './api/protocoltypes.pb';
export * as Weshnet from './weshnet.types.gen';

export async function init(): Promise<ProtocolServiceClient> {
  return WeshnetExpoModule.init()
    .then(() =>
      createServiceClient(api.protocol.ProtocolService, rpcBridgeImpl),
    )
    .catch((err: any) => console.error('init error', err))
}

export async function invokeMethod(method: string, ...args: any): Promise<any> {
  const encodedArgs = base64.fromByteArray(new TextEncoder().encode(JSON.stringify(args)));
  return WeshnetExpoModule.invokeMethod(method, encodedArgs)
    .then((result: any) => {
      const decodedResult = JSON.parse(new TextDecoder().decode(base64.toByteArray(result)))
      return decodedResult;
    })
    .catch((err: any) => console.error('invokeMethod error', err))
}

export function test(): string {
  return WeshnetExpoModule.test();
}

export function hello(name: string): string {
  return WeshnetExpoModule.hello(name);
}
