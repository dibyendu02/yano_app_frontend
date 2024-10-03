import React, {useContext, useEffect, useState} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {Colors} from '../../../constants/Colors';
import Header from '../../../components/header/Header';
import {DummyImage} from '../../../assets/dummy/images';
import FilledButton from '../../../components/buttons/FilledButton';
import BluetoothStateManager from 'react-native-bluetooth-state-manager';
import {replace} from '../../../navigation/RootNavigation';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import UserContext from '../../../contexts/UserContext';

const GlucometerInfo = ({navigation}: any) => {
  // Access the user data from the context
  const {userData} = useContext(UserContext);
  const route = useRoute();
  const devicename = route?.params?.devicename;
  const [isBluetoothModalVisible, setIsBluetoothModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // State to hold error message

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
  const checkBluetoothState = async () => {
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
        // replace('RegisterGlucometer', {devicename: devicename});
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
      <Header title="" />
      <ScrollView style={{paddingVertical: 12, width: '94%', margin: 'auto'}}>
        <View>
          <View
            style={{
              backgroundColor: Colors.White,
              padding: 20,
              borderRadius: 10,
              marginBottom: 20,
            }}>
            <Image
              source={DummyImage.glucometer}
              width={250}
              height={250}
              style={{
                alignSelf: 'center',
                marginBottom: 20,
                width: 150,
                height: 150,
              }}
            />
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: Colors.Blue,
                textAlign: 'center',
                marginBottom: 10,
                marginHorizontal: 40,
              }}>
              YANO® Glucometer
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: Colors.SteelBlue,
                textAlign: 'center',
                marginHorizontal: 10,
              }}>
              Connect your YANO® Glucometer to synchronize blood glucose
              readings from the device to your medical history.
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.addBtn}>
        <FilledButton
          label="Connect to device"
          type="blue"
          onPress={() => checkBluetoothState()}
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

export default GlucometerInfo;

const styles = StyleSheet.create({
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
