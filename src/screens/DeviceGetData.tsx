import React, {useEffect, useState} from 'react';
import {NativeModules, StyleSheet, Text, View, Platform} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {fetchHistory} from '../core/BGMManager/BGMManager'; // Assuming you have this custom function available
const {BgmManager} = NativeModules;

const DeviceGetData = () => {
  const [historyData, setHistoryData] = useState(null); // State to hold history data
  const [isLoading, setIsLoading] = useState(true); // State to manage loading state
  const [errorMessage, setErrorMessage] = useState(''); // State to hold error message

  // Function to request permissions sequentially
  const requestAllPermissions = async () => {
    try {
      if (Platform.OS === 'android' && Platform.Version >= 31) {
        // Requesting each permission one by one
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

  // Function to fetch history data
  const getHistoryData = async () => {
    try {
      // Request all required permissions
      const hasPermissions = await requestAllPermissions();
      if (!hasPermissions) {
        console.warn('Permissions were not granted');
        setErrorMessage('Permissions were not granted.');
        setIsLoading(false); // Stop loading if permissions are not granted
        return;
      }

      // Fetch history data from the device
      const res = await fetchHistory('Z00NQN', 0);
      // setHistoryData(res); // Set history data to state
      console.log('History Data:', res);
    } catch (error) {
      // console.error('Error fetching history data:', error);
      setErrorMessage(error.message || 'Error fetching history data.');
    } finally {
      setIsLoading(false); // Stop loading after data is fetched or if an error occurs
    }
  };

  // useEffect to handle component mounting logic
  useEffect(() => {
    getHistoryData();
  }, []);

  // Render content based on state
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Device Get Data</Text>
      {isLoading ? (
        <Text style={styles.loading}>Loading data...</Text>
      ) : historyData ? (
        <Text style={styles.data}>{JSON.stringify(historyData, null, 2)}</Text>
      ) : (
        <Text style={styles.noData}>No data available</Text>
      )}
      {/* Error message view */}
      {errorMessage ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default DeviceGetData;

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  data: {
    fontSize: 16,
    marginTop: 10,
  },
  loading: {
    fontSize: 16,
    color: 'gray',
  },
  noData: {
    fontSize: 16,
    color: 'red',
  },
  errorContainer: {
    marginTop: 20, // Add space between the error message and other content
    padding: 10,
    backgroundColor: '#f8d7da',
    borderRadius: 5,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  errorText: {
    fontSize: 14,
    color: '#721c24', // Dark red color for error text
  },
});
