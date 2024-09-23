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
  Alert,
} from 'react-native';
import BleManager from 'react-native-ble-manager';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {fetchHistory} from '../core/BGMManager/BGMManager';
const {BgmManager} = NativeModules;

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
  const [selectedPeripheral, setSelectedPeripheral] = useState(null);
  const [services, setServices] = useState([]);
  const [characteristics, setCharacteristics] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedCharacteristic, setSelectedCharacteristic] = useState(null);
  const peripherals = new Map();

  //   useEffect(() => {
  // console.log(characteristics)
  //   }, [characteristics])

  // console.log(characteristics);

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

      BgmManager.init();

      peripheral.connected = true;
      peripherals.set(peripheral.id, peripheral);
      setConnectedDevices(Array.from(peripherals.values()));
      setSelectedPeripheral(peripheral);

      // Retrieve services and characteristics
      const peripheralInfo = await BleManager.retrieveServices(peripheral.id);
      console.log('Peripheral info:', JSON.stringify(peripheralInfo));

      setServices(peripheralInfo.services);

      if (
        peripheralInfo.characteristics &&
        peripheralInfo.characteristics.length > 0
      ) {
        setCharacteristics(peripheralInfo.characteristics);
        // console.log('Characteristics:', peripheralInfo.characteristics);
      } else {
        console.log('No characteristics found for services');
      }
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
      setSelectedPeripheral(null);
      setServices([]);
      setCharacteristics([]);
      setSelectedService(null);
      setSelectedCharacteristic(null);
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

  const handleReadCharacteristic = async () => {
    if (selectedService && selectedCharacteristic) {
      try {
        const readData = await BleManager.read(
          selectedPeripheral.id,
          selectedService.uuid,
          selectedCharacteristic.uuid,
        );
        const decodedData = String.fromCharCode(...readData);
        Alert.alert('Read Data', decodedData);
        console.log('Read Data:', decodedData);
      } catch (error) {
        console.error('Error reading characteristic:', error);
      }
    } else {
      Alert.alert('Error', 'Please select a service and characteristic.');
    }
  };

  const RenderServiceItem = ({service}) => (
    <TouchableOpacity
      style={styles.serviceItem}
      onPress={() => setSelectedService(service)}>
      <Text style={styles.serviceText}>{service.uuid}</Text>
    </TouchableOpacity>
  );

  const RenderCharacteristicItem = ({characteristic}) => (
    <TouchableOpacity
      style={styles.characteristicItem}
      onPress={() => setSelectedCharacteristic(characteristic)}>
      <Text style={styles.characteristicText}>{characteristic.uuid}</Text>
    </TouchableOpacity>
  );

  const RenderDeviceItem = ({peripheral}) => {
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

  const handleTest = async () => {
    try {
      const res = fetchHistory('0', -1);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

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
          renderItem={({item}) => <RenderDeviceItem peripheral={item} />}
          keyExtractor={item => item.id}
        />
      ) : (
        <Text style={styles.noDevicesText}>No devices found</Text>
      )}

      <TouchableOpacity
        style={{height: 50, width: '100%', backgroundColor: 'green'}}
        onPress={handleTest}>
        <Text>Test</Text>
      </TouchableOpacity>

      {/* {selectedPeripheral && (
        <>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Services</Text>
            <FlatList
              data={services}
              renderItem={({item}) => <RenderServiceItem service={item} />}
              keyExtractor={item => item.uuid}
            />
          </View>

          {selectedService && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Characteristics</Text>
              <FlatList
                data={characteristics.filter(
                  char => char.service === selectedService.uuid,
                )}
                renderItem={({item}) => (
                  <RenderCharacteristicItem characteristic={item} />
                )}
                keyExtractor={item => item.uuid}
              />
            </View>
          )}

          {selectedCharacteristic && (
            <TouchableOpacity
              style={styles.readButton}
              onPress={handleReadCharacteristic}>
              <Text style={styles.buttonTextStyle}>Read Characteristic</Text>
            </TouchableOpacity>
          )}
        </>
      )} */}
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
  section: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  serviceItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 5,
  },
  serviceText: {
    fontSize: 16,
  },
  characteristicItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 5,
  },
  characteristicText: {
    fontSize: 16,
  },
  readButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    marginHorizontal: 20,
    alignItems: 'center',
    marginTop: 20,
  },
});

export default App;
