import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useState} from 'react';
import Header from '../../../../components/header/Header';
import {DummyImage} from '../../../../assets/dummy/images';
import {Colors} from '../../../../constants/Colors';
import CommonItem from '../components/CommonItem';
import FilledButton from '../../../../components/buttons/FilledButton';
import EmptyScreen from '../../../../components/EmptyScreen';
import {navigate, replace} from '../../../../navigation/RootNavigation';
import UserContext from '../../../../contexts/UserContext';
import BluetoothStateManager from 'react-native-bluetooth-state-manager';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';

const MyDevices = () => {
  // Access the user data from the context
  const {userData} = useContext(UserContext);
  const [visible, isVisible] = useState(true);
  const [isBluetoothModalVisible, setIsBluetoothModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

  // Function to check and enable Bluetooth
  const checkBluetoothState = async devicename => {
    try {
      // Request all required permissions
      const hasPermissions = await requestAllPermissions();
      if (!hasPermissions) {
        console.warn('Permissions were not granted');
        setErrorMessage('Permissions were not granted.');
        return;
      }

      // Check Bluetooth state
      const state = await BluetoothStateManager.getState();

      if (state !== 'PoweredOn') {
        // If Bluetooth is not enabled, show the custom modal
        handleEnableBluetooth();
      } else {
        // Check if the user already has a glucometer device
        const glucometerDevice = userData?.devices?.find(
          device => device.deviceType === 'glucometer',
        );

        if (glucometerDevice) {
          // If a glucometer device exists, redirect with its serial number
          replace('SyncGlucometer', {Sn: glucometerDevice.deviceSerialNumber});
        } else {
          // If no glucometer is found, redirect to RegisterGlucometer
          replace('RegisterGlucometer', {devicename: devicename});
        }
      }
    } catch (error) {
      console.error('Error checking Bluetooth state:', error);
      setErrorMessage('Failed to check Bluetooth state.');
    }
  };

  // Function to handle enabling Bluetooth
  const handleEnableBluetooth = () => {
    BluetoothStateManager.requestToEnable()
      .then(() => {
        console.log('Bluetooth enabled');
        setIsBluetoothModalVisible(false); // Close the modal after enabling
      })
      .catch(error => {
        console.error('Failed to enable Bluetooth:', error);
      });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.GhostWhite,
        position: 'relative',
      }}>
      <Header title="My devices" />
      {visible ? (
        <ScrollView>
          <View style={{paddingVertical: 12, width: '94%', margin: 'auto'}}>
            <CommonItem
              name="Yano Multi-parameter Monitor"
              onPress={() => replace('MeasurementMonitoring')}
              leftIcon={
                <Image
                  source={DummyImage.largeDevice}
                  style={{width: 65, height: 65}}
                />
              }
              customTextWidth={'65%'}
              isConnected={false}
            />
            {/* Only show the glucometer if the user has a glucometer device */}
            {userData?.devices?.some(
              device => device.deviceType === 'glucometer',
            ) && (
              <CommonItem
                name="YANO® Glucometer"
                // onPress to check and enable Bluetooth, then navigate
                onPress={() => checkBluetoothState('Glucómetro Yano')}
                leftIcon={
                  <Image
                    source={DummyImage.glucometer}
                    style={{width: 65, height: 65}}
                  />
                }
              />
            )}
          </View>
        </ScrollView>
      ) : (
        <EmptyScreen
          title="No measurement tools"
          message="Add a device to start measuring your patient’s health."
        />
      )}
      <View style={styles.addBtn}>
        <FilledButton
          label="Add a device"
          type="blue"
          onPress={() => navigate('ChooseDevice')}
        />
      </View>

      {/* Custom Bluetooth Enable Modal */}
      <Modal
        visible={isBluetoothModalVisible}
        transparent={true}
        animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalCard}>
            <Text style={styles.modalHeader}>
              Yano wants to turn on Bluetooth
            </Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.denyButton]}
                onPress={() => setIsBluetoothModalVisible(false)}>
                <Text style={styles.buttonText}>Deny</Text>
              </TouchableOpacity>
              <View style={styles.verticalSeparator} />
              <TouchableOpacity
                style={[styles.modalButton, styles.allowButton]}
                onPress={handleEnableBluetooth}>
                <Text style={styles.buttonText}>Allow</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MyDevices;

const styles = StyleSheet.create({
  connectBtn: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  textStyle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.Blue,
  },
  addBtn: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 10 : 0,
    left: 0,
    width: '100%',
    backgroundColor: Colors.White,
    padding: 10,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    width: '80%',
    backgroundColor: '#333333',
    borderRadius: 10,
    paddingBottom: 15,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  denyButton: {
    borderBottomLeftRadius: 10,
  },
  allowButton: {
    borderBottomRightRadius: 10,
  },
  verticalSeparator: {
    width: 1,
    backgroundColor: '#555555',
    height: 40,
  },
  buttonText: {
    fontSize: 16,
    color: '#4285F4',
    fontWeight: '600',
  },
});
