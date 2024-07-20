// import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to WeshnetExpo.web.ts
// and on native platforms to WeshnetExpo.ts
import api from './api'
import { rpcBridgeImpl } from './rpc'
import { createServiceClient } from './service'
import { ProtocolServiceClient } from './weshnet.types.gen'
import WeshnetExpoModule from './WeshnetExpoModule'
import base64 from "base64-js";

export async function init(): Promise<ProtocolServiceClient> {
  return WeshnetExpoModule.init()
    .then(() =>
      createServiceClient(api.protocol.ProtocolService, rpcBridgeImpl),
    )
    .catch((err: any) => console.error('init error', err))
}

export async function invokeMethod(method: string, ...args: any): Promise<any> {
  return WeshnetExpoModule.invokeMethod(method, base64.fromByteArray(new TextEncoder().encode(JSON.stringify(args))))
    .then((result: any) =>
      JSON.parse(new TextDecoder().decode(base64.toByteArray(result)))
    )
    .catch((err: any) => console.error('invokeMethod error', err))
}

export function test(): string {
  return WeshnetExpoModule.test();
}

export function hello(name: string): string {
  return WeshnetExpoModule.hello(name);
}
