declare module 'react-native' {
  interface NativeModulesStatic {
    BgmManager: BGMManagerType;
  }
}

export interface BGMManagerType {
  /**
   * Initializes the BGMManager module.
   */
  init(): void;

  /**
   * Retrieves the history of blood glucose measurements.
   *
   * @param deviceSn - The serial number of the device.
   * @param eventIndex - The index of the event to retrieve.
   *  - `0` to gain the newest data (one newest BG value).
   *  - `-1` to gain full data (all BG values).
   *  - `1–500` to gain data from the specified event index to the newest event index.
   * @returns A promise that resolves to a string representation of the history data.
   */
  getHistory(deviceSn: string, eventIndex: number): Promise<any>;
}

export enum BGMErrorCode {
  /** Not found equipment */
  ERROR_DEVICE_MISS = 1,

  /** Equipment connection failed */
  ERROR_CONNECT_ERROR = 2,

  /** Communication timeout */
  ERROR_MESSAGE_TIMEOUT = 3,

  /** Bluetooth turned off */
  ERROR_BLUETOOTH_CLOSE = 4,

  /** Bluetooth permission not opened */
  ERROR_BLE_NO_PERMISSION = 5,

  /** Location services are turned off */
  ERROR_CALIBRATION_TIME = 6,

  /** Data is empty */
  ERROR_HISTORY_EMPTY = 7,
}
