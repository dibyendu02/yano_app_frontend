import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Platform,
  StatusBar,
  ScrollView,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  NativeModules,
  useColorScheme,
  TouchableOpacity,
  NativeEventEmitter,
  PermissionsAndroid,
  FlatList,
} from 'react-native';
import BleManager from 'react-native-ble-manager';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {fetchHistory} from '../core/BGMManager/BGMManager';

const BleManagerModule = NativeModules.BleManager;
const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [isScanning, setIsScanning] = useState(false);
  const [connectedDevices, setConnectedDevices] = useState([]);
  const [discoveredDevices, setDiscoveredDevices] = useState([]);
  const peripherals = new Map();

  const requestBluetoothPermissions = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 31) {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ]);

        if (
          granted['android.permission.BLUETOOTH_SCAN'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.BLUETOOTH_CONNECT'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.ACCESS_FINE_LOCATION'] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('All required permissions granted');
        } else {
          console.log('Permissions denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const startScan = () => {
    if (!isScanning) {
      setDiscoveredDevices([]); // Clear previous devices
      setIsScanning(true); // Set scanning to true
      BleManager.scan([], 5, true)
        .then(() => {
          console.log('Scanning...');
        })
        .catch(error => {
          console.error('Scan error:', error);
        });
    }
  };

  const handleStopScan = () => {
    setIsScanning(false);
    if (discoveredDevices.length === 0) {
      console.log('No devices found');
    }
  };

  const handleGetConnectedDevices = () => {
    BleManager.getConnectedPeripherals([]).then(results => {
      if (results.length === 0) {
        console.log('No connected Bluetooth devices');
      } else {
        for (let i = 0; i < results.length; i++) {
          let peripheral = results[i];
          peripheral.connected = true;
          peripherals.set(peripheral.id, peripheral);
        }
        setConnectedDevices(Array.from(peripherals.values()));
      }
    });
  };

  const connectToPeripheral = async peripheral => {
    try {
      await BleManager.connect(peripheral.id);
      console.log('Connected to', peripheral.name);

      peripheral.connected = true;
      peripherals.set(peripheral.id, peripheral);
      setConnectedDevices(Array.from(peripherals.values()));

      BleManager.retrieveServices(peripheral.id).then(peripheralInfo => {
        console.log('Peripheral info:', peripheralInfo);
      });
    } catch (error) {
      console.error('Connection error:', error);
    }
  };

  const disconnectFromPeripheral = async peripheral => {
    try {
      await BleManager.disconnect(peripheral.id);
      console.log('Disconnected from', peripheral.name);

      peripheral.connected = false;
      peripherals.set(peripheral.id, peripheral);
      setConnectedDevices(Array.from(peripherals.values()));
    } catch (error) {
      console.error('Disconnection error:', error);
    }
  };

  const handleDiscoverPeripheral = peripheral => {
    if (!peripheral.name) {
      peripheral.name = 'NO NAME';
    }
    peripherals.set(peripheral.id, peripheral);
    setDiscoveredDevices(Array.from(peripherals.values()));
  };

  const handleDisconnectPeripheral = data => {
    let peripheral = peripherals.get(data.peripheral);
    if (peripheral) {
      peripheral.connected = false;
      peripherals.set(peripheral.id, peripheral);
      setConnectedDevices(Array.from(peripherals.values()));
      console.log('Disconnected from', peripheral.name);
    }
  };

  const RenderItem = ({peripheral}) => {
    const {name, rssi, connected} = peripheral;
    return (
      <>
        {name && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            <View style={styles.deviceItem}>
              <Text style={styles.deviceName}>{name}</Text>
              <Text style={styles.deviceInfo}>RSSI: {rssi}</Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                connected
                  ? disconnectFromPeripheral(peripheral)
                  : connectToPeripheral(peripheral)
              }
              style={styles.deviceButton}>
              <Text
                style={[
                  styles.scanButtonText,
                  {fontWeight: 'bold', fontSize: 16},
                ]}>
                {connected ? 'Disconnect' : 'Connect'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </>
    );
  };

  useEffect(() => {
    BleManager.enableBluetooth().then(() => {
      console.log('Bluetooth is turned on!');
    });

    requestBluetoothPermissions(); // Request Bluetooth permissions

    BleManager.start({showAlert: false}).then(() => {
      console.log('BleManager initialized');
      handleGetConnectedDevices();
    });

    const discoverPeripheralListener = BleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      handleDiscoverPeripheral,
    );
    const stopScanListener = BleManagerEmitter.addListener(
      'BleManagerStopScan',
      handleStopScan,
    );
    const disconnectPeripheralListener = BleManagerEmitter.addListener(
      'BleManagerDisconnectPeripheral',
      handleDisconnectPeripheral,
    );

    return () => {
      discoverPeripheralListener.remove();
      stopScanListener.remove();
      disconnectPeripheralListener.remove();
    };
  }, []);

  // getting data
  const fetchData = async () => {
    const data = await fetchHistory('HC02-F27D9E', 0);
    console.log(data);
  };
  useEffect(() => {
    console.log(connectedDevices);
    fetchData();
  }, []);

  return (
    <SafeAreaView style={[backgroundStyle, styles.mainBody]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        style={backgroundStyle}
        contentContainerStyle={styles.mainBody}
        contentInsetAdjustmentBehavior="automatic">
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
            marginBottom: 40,
          }}>
          <View>
            <Text
              style={{
                fontSize: 30,
                textAlign: 'center',
                color: isDarkMode ? Colors.white : Colors.black,
              }}>
              React Native BLE Manager
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.buttonStyle}
            onPress={startScan}>
            <Text style={styles.buttonTextStyle}>
              {isScanning ? 'Scanning...' : 'Scan Bluetooth Devices'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {isScanning ? (
        <Text style={styles.scanningText}>Scanning for devices...</Text>
      ) : discoveredDevices.length > 0 ? (
        <FlatList
          data={discoveredDevices}
          renderItem={({item}) => <RenderItem peripheral={item} />}
          keyExtractor={item => item.id}
        />
      ) : (
        <Text style={styles.noDevicesText}>No devices found</Text>
      )}
    </SafeAreaView>
  );
};

const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    height: windowHeight,
  },
  buttonStyle: {
    backgroundColor: '#307ecc',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#307ecc',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 15,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  deviceItem: {
    flexDirection: 'column',
  },
  deviceName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  deviceInfo: {
    fontSize: 14,
    color: '#666',
  },
  deviceButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  scanButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
  scanningText: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
    color: '#666',
  },
  noDevicesText: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
  },
});

export default App;
