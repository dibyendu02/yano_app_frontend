import React, {useState, useEffect} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {Colors} from '../../../constants/Colors';
import {staticIcons} from '../../../assets/image';
import FilledButton from '../../../components/buttons/FilledButton';
import CommonHeader from '../../healthCondition/components/CommonHeader';
import Card from './components/Card';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions'; // Import permissions
import {fetchHistory} from '../../../core/BGMManager/BGMManager'; // Import fetchHistory function

const SyncGlucometer = ({navigation}: any) => {
  const route = useRoute();
  const [isSearching, setIsSearching] = useState(false);
  const [deviceFound, setDeviceFound] = useState<any>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [value, setValue] = useState(null); // State to hold glucose measurement value
  const [historyData, setHistoryData] = useState(null); // State to hold history data
  const [isLoading, setIsLoading] = useState(false); // State to manage loading state
  const [errorMessage, setErrorMessage] = useState(''); // State to hold error message

  // Function to get current date and time in a specific format
  const getCurrentDateTime = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedTime = `${hours}:${minutes} ${ampm}`;

    return `${day}/${month}/${year} - ${formattedTime}`;
  };

  // Function to request permissions sequentially
  const requestAllPermissions = async () => {
    try {
      if (Platform.OS === 'android' && Platform.Version >= 31) {
        const permissions = [
          PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
          PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
        ];

        for (const permission of permissions) {
          const status = await request(permission);
          if (status !== RESULTS.GRANTED) {
            console.warn(`${permission} permission not granted`);
            setErrorMessage(`${permission} permission not granted`);
            return false; // Exit if any permission is not granted
          }
        }
      }
      return true; // All permissions granted
    } catch (err) {
      console.error('Failed to request permissions:', err);
      setErrorMessage('Failed to request permissions.');
      return false;
    }
  };

  // Function to parse the response string into a JavaScript object
  function parseHistoryData(responseString) {
    const entries = responseString
      .replace(/[{}]/g, '') // Remove curly braces
      .split(',') // Split by commas
      .map(entry => entry.split('=')); // Split key and value by '='

    const parsedObject = {};
    entries.forEach(([key, value]) => {
      const trimmedKey = key.trim();
      const trimmedValue = value.trim();
      parsedObject[trimmedKey] = isNaN(trimmedValue)
        ? trimmedValue === 'true'
          ? true
          : trimmedValue === 'false'
          ? false
          : trimmedValue
        : parseFloat(trimmedValue);
    });

    return parsedObject;
  }

  // Function to convert mg/dL to mmol/L with 2 decimal points
  function convertToMmolL(valueInMgDl) {
    return (valueInMgDl / 18).toFixed(2); // Converts to mmol/L and formats to 2 decimal places
  }

  // Function to fetch history data
  const getHistoryData = async () => {
    try {
      setIsLoading(true); // Set loading state
      // Request all required permissions
      const hasPermissions = await requestAllPermissions();
      if (!hasPermissions) {
        console.warn('Permissions were not granted');
        setErrorMessage('Permissions were not granted.');
        setIsLoading(false); // Stop loading if permissions are not granted
        return;
      }

      // Fetch history data from the device
      const res = await fetchHistory(route?.params?.Sn || 'Unknown', 0);
      console.log('History Data:', res);

      // Parse the response into a JavaScript object
      const parsedData = parseHistoryData(res);
      console.log('Parsed History Data:', parsedData);
      console.log('event value', parsedData.eventValue);

      // Check if data is available in the response
      if (parsedData.eventValue) {
        // Set the values in the state
        setHistoryData(parsedData); // Set parsed data to state
        setValue(parsedData.eventValue); // Set the glucose measurement value
        setDeviceFound({Sn: route?.params?.Sn}); // Set device as found only if data is available
      } else {
        setDeviceFound(false); // Device found but no valid data
      }
    } catch (error: any) {
      setErrorMessage(error.message || 'Error fetching history data.');
      setDeviceFound(false); // Set device not found in case of error
    } finally {
      setIsLoading(false); // Stop loading after data is fetched or if an error occurs
    }
  };

  // Handle "Connect to device" button click
  const handleConnect = async () => {
    setIsSearching(true);
    setIsSyncing(false);
    setDeviceFound(null); // Reset device found state

    try {
      await getHistoryData(); // Fetch data during connection
      setIsSearching(false);
    } catch (error) {
      console.error('Error connecting to device:', error);
      setDeviceFound(false); // Set device found to false in case of error
      setIsSearching(false);
    }
  };

  // Handle stopping the sync process
  const handleStop = () => {
    setIsSyncing(false);
    setIsSearching(false);
    setDeviceFound(false); // Set deviceFound to false to show "Device not found" message
  };

  const handleRestart = () => {
    setIsClicked(true);
  };

  // Handle the "Sync readings" button click
  const handleSyncReadings = () => {
    if (deviceFound) {
      const glucoseData = {
        measurementTime: getCurrentDateTime(), // Set to current date and time
        glucoseMeasurementValue: `${value}`, // Set to fetched glucose measurement value
        glucoseMeasurementUnit: `mg/dL`,
        foodConsumed: 'Random',
        deviceName: route?.params?.Sn || 'Unknown Device', // Use passed serial number or fallback
      };
      navigation.navigate('GlucoseData', {data: glucoseData});
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setIsSearching(false);
      setDeviceFound(null);
    }, []),
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.GhostWhite,
        position: 'relative',
      }}>
      <CommonHeader
        title=" "
        rightComp1={
          isSearching && (
            <TouchableOpacity onPress={handleStop}>
              <Image
                source={staticIcons.stopIcon}
                style={{height: 22, width: 22}}
              />
            </TouchableOpacity>
          )
        }
        rightComp2={
          <TouchableOpacity onPress={handleRestart}>
            <Image
              source={staticIcons.refreshIcon}
              style={{height: 22, width: 22}}
            />
          </TouchableOpacity>
        }
        customStyle={{
          paddingVertical: 12,
          paddingTop: 55,
        }}
      />
      <ScrollView style={{paddingVertical: 12, width: '94%', margin: 'auto'}}>
        <View>
          <View
            style={{
              backgroundColor: Colors.White,
              paddingVertical: 24,
              paddingHorizontal: 30,
              borderRadius: 10,
              marginBottom: 20,
            }}>
            <View
              style={{
                alignSelf: 'center',
                marginBottom: 0,
                width: 100,
                height: 100,
              }}>
              {isSearching ? (
                <Image
                  source={staticIcons.bluetoohIcon}
                  style={{height: 88, width: 88}}
                />
              ) : deviceFound === null ? (
                <Image
                  source={staticIcons.bloodGlucoseIcon}
                  style={{height: 88, width: 88}}
                />
              ) : deviceFound ? (
                <Image
                  source={staticIcons.foundIcon}
                  style={{height: 88, width: 88}}
                />
              ) : (
                <Image
                  source={staticIcons.notfoundIcon}
                  style={{height: 88, width: 88}}
                />
              )}
            </View>
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: Colors.Blue,
                textAlign: 'center',
                marginBottom: 10,
              }}>
              {isSearching
                ? 'Searching for YANO® Glucometer'
                : deviceFound === null
                ? 'Sync your blood glucose readings'
                : deviceFound
                ? 'YANO® Glucometer has been found'
                : 'Device not found'}
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: Colors.SteelBlue,
                textAlign: 'center',
              }}>
              {isSearching
                ? 'Make sure your device is turned on and visible for pairing.'
                : deviceFound === null
                ? "Make sure your device is turned on and visible for pairing. Then, click the 'Connect to device' button below."
                : deviceFound
                ? "To synchronize your blood glucose readings, click the 'Sync readings' button."
                : 'Make sure your device is turned on and visible for pairing and then try connecting again.'}
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.addBtn}>
        <FilledButton
          label={
            deviceFound === null || deviceFound === false
              ? 'Connect to device'
              : 'Sync readings'
          }
          type="blue"
          onPress={
            deviceFound === null || deviceFound === false
              ? handleConnect
              : handleSyncReadings
          }
          disabled={isSearching} // Disable button while searching
        />
      </View>
      {isClicked && (
        <View style={styles.deletbuttonclick}>
          <Card
            title={'Restart device'}
            children={'Do you want to restart your Yano® Glucometer?'}
            active={setIsClicked}
            action={() => navigation.goBack()} // Restart the device search
          />
        </View>
      )}
    </View>
  );
};

export default SyncGlucometer;

const styles = StyleSheet.create({
  addBtn: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 10 : 0,
    left: 0,
    width: '100%',
    backgroundColor: Colors.White,
    padding: 10,
  },
  deletbuttonclick: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: 1,
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 12,
  },
});
