declare module 'react-native' {
  interface HealthMonitor {
    init(): void;
    bindService(): Promise<string>;
    unbindService(): Promise<string>;
    startHeartRateMeasurement(): Promise<string>;
    stopHeartRateMeasurement(): Promise<string>;
    isMeasuring(): Promise<boolean>;
    checkBluetoothState(): Promise<number>;
  }

  export const HealthMonitor: HealthMonitor;
}
