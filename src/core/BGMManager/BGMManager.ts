import {NativeModules} from 'react-native';
import {BGMErrorCode, BGMManagerType} from './Type';

const {BgmManager} = NativeModules;

export async function fetchHistory(
  deviceSn: string,
  eventIndex: number,
): Promise<string | null> {
  try {
    // Initialize the BgmManager
    BgmManager.init();
    console.log(`Fetching history for device: ${deviceSn}`);

    // Get history data from the device
    const result = await BgmManager.getHistory(deviceSn, eventIndex);

    // Attempt to parse the result as JSON. If it fails, handle as a plain string.
    try {
      const parsedResult = JSON.parse(result);
      console.log('History data:', parsedResult);
      return result;
    } catch (parseError) {
      // If JSON parsing fails, it's likely an error message in plain text.
      // console.warn('Received non-JSON response:', result);
      return result; // Return the raw response (which might be an error message)
    }
  } catch (err: any) {
    // console.error('Error occurred while fetching history data:', err);

    // Map the error code to a descriptive message
    throw new Error(err);
  }
}
