import {NativeModules, NativeEventEmitter} from 'react-native';

const {HealthMonitor} = NativeModules;

// Define the TypeScript interface to match the native module methods
interface HealthMonitorType {
  init: () => void;
  bindService: () => Promise<string>;
  unbindService: () => Promise<string>;
  startHeartRateMeasurement: () => Promise<string>;
  stopHeartRateMeasurement: () => Promise<string>;
  isMeasuring: () => Promise<boolean>;
  checkBluetoothState: () => Promise<number>;
}

// Export the module with the interface type
export const healthMonitor: HealthMonitorType = HealthMonitor;

// Create an event emitter for monitoring events
export const healthMonitorEventEmitter = new NativeEventEmitter(HealthMonitor);
