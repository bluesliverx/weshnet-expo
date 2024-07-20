import { EventEmitter } from 'expo-modules-core';

const emitter = new EventEmitter({} as any);

export default {
  async setValueAsync(value: string): Promise<void> {
    emitter.emit('onChange', { value });
  },
  async invokeMethod(method: string, ...args) : Promise<void> {
    throw new Error('Method not implemented in web code, check native module configuration');
  },
  test() {
    return 'non-native weshnet-expo';
  },
  hello(name: string) {
    throw new Error('Method not implemented in web code, check native module configuration');
  },
}
