// import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to WeshnetExpo.web.ts
// and on native platforms to WeshnetExpo.ts
import api from './api'
import { rpcBridgeImpl } from './rpc'
import { createServiceClient } from './service'
import { ProtocolServiceClient } from './weshnet.types.gen'
import WeshnetExpoModule from './WeshnetExpoModule'

export async function init(): Promise<ProtocolServiceClient> {
  return WeshnetExpoModule.init()
    .then(() =>
      createServiceClient(api.protocol.ProtocolService, rpcBridgeImpl),
    )
    .catch((err: any) => console.error('init error', err))
}
