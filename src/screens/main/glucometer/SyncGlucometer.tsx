import React, {useState, useEffect, useContext} from 'react';
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {staticIcons} from '../../../assets/image';
import FilledButton from '../../../components/buttons/FilledButton';
import CommonHeader from '../../healthCondition/components/CommonHeader';
import Card from './components/Card';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions'; // Import permissions
import {fetchHistory} from '../../../core/BGMManager/BGMManager'; // Import fetchHistory function
import {replace} from '../../../navigation/RootNavigation';

import {retrieveData} from '../../../utils/Storage';
import {Colors} from '../../../constants/Colors';
import {getBloodGlucoseDatabyUserId} from '../../../api/GET/bloodGlucose'; // Import the function to fetch glucose data
import Modal from 'react-native-modal'; // Import modal from react-native-modal
import {CloseIcon} from '../../../assets/icon/IconNames'; // Import close icon if necessary
import {deleteGlucometerData} from '../../../api/DELETE/bloodGlucose';
import UserContext from '../../../contexts/UserContext';

const SyncGlucometer = ({navigation}: any) => {
  const route = useRoute();
  // Access the user data from the context
  const {userData, login} = useContext(UserContext);
  const [isSearching, setIsSearching] = useState(false);
  const [deviceFound, setDeviceFound] = useState<any>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [value, setValue] = useState(null); // State to hold glucose measurement value
  const [historyData, setHistoryData] = useState(null); // State to hold history data
  const [isLoading, setIsLoading] = useState(false); // State to manage loading state
  const [errorMessage, setErrorMessage] = useState(''); // State to hold error message
  const [latestGlucoseFromAPI, setLatestGlucoseFromAPI] = useState(null); // Store the latest glucose data from API
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');

  // State for modal
  const [showModal, setShowModal] = useState(false); // Control modal visibility
  const [modalMessage, setModalMessage] = useState(''); // Modal message

  // Fetch user ID and token from storage
  const getUserData = async () => {
    const retrievedUserId = await retrieveData('userId');
    const retrievedToken = await retrieveData('token');
    setUserId(retrievedUserId);
    setToken(retrievedToken);
  };

  useEffect(() => {
    getUserData();
  }, []);

  // Fetch user's blood glucose data from the API
  const getUserBloodGlucose = async () => {
    try {
      const resData = await getBloodGlucoseDatabyUserId({userId, token});
      const lastGlucoseEntry = resData[resData.length - 1]; // Get the latest entry
      setLatestGlucoseFromAPI(lastGlucoseEntry.data); // Set the latest glucose value
    } catch (error) {
      console.log('Error fetching blood glucose data:', error);
    }
  };

  useEffect(() => {
    if (userId && token) {
      getUserBloodGlucose(); // Fetch user's blood glucose data when userId and token are available
    }
  }, [userId, token]);

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

  // Function to reset states after modal is closed
  const resetToInitialState = () => {
    setIsClicked(false);
    setIsSearching(false);
    setDeviceFound(null); // Reset the deviceFound state
  };

  // Function to fetch history data from the device
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
        setHistoryData(parsedData); // Set parsed data to state
        setValue(parsedData.eventValue); // Set the glucose measurement value
        setDeviceFound({Sn: route?.params?.Sn}); // Set device as found only if data is available

        // Compare with the latest data from the API
        if (
          latestGlucoseFromAPI &&
          parsedData.eventValue === latestGlucoseFromAPI
        ) {
          setModalMessage(
            `Your YANO® Glucometer doesn't have any new readings to sync.`,
          );
          setShowModal(true); // Show the modal
          setTimeout(() => {
            setShowModal(false);
            resetToInitialState();
          }, 3000);
        }
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

  const handleDeleteGlucometer = async () => {
    try {
      const response = await deleteGlucometerData({userId, token});
      // console.log(response);
      login(response.userData);
    } catch (error: any) {
      Alert.alert(error.message);
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
      replace('GlucoseData', {data: glucoseData});
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setIsSearching(false);
      setDeviceFound(null);
      getUserBloodGlucose(); // Fetch user's latest glucose data on screen focus
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
            action={async () => {
              await handleDeleteGlucometer();
              replace('RegisterGlucometer');
            }} // Restart the device search
          />
        </View>
      )}

      {/* Custom Modal */}
      <Modal
        isVisible={showModal}
        onBackdropPress={() => setShowModal(false)}
        onSwipeComplete={() => setShowModal(false)}
        swipeDirection="down"
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={0}
        animationInTiming={1000}
        animationOutTiming={3000}
        style={styles.modal}>
        <View style={styles.modalContent}>
          <View style={{flexDirection: 'row', gap: 10}}>
            <Image
              source={staticIcons.errorIcon}
              style={{
                height: 20,
                width: 20,
                objectFit: 'contain',
                tintColor: 'white',
              }}
            />
            <Text style={styles.modalText}>{modalMessage}</Text>
          </View>
          <CloseIcon color="white" />
        </View>
      </Modal>
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
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: Colors.Green,
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
    marginBottom: 20,
    // marginLeft: 60,
  },
  modalText: {
    color: Colors.White,
    fontSize: 14,
    fontWeight: 'bold',
    width: '80%',
  },
});
