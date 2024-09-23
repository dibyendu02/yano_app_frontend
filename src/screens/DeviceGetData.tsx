import {NativeModules, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
const {BgmManager} = NativeModules;

const DeviceGetData = () => {
  useEffect(() => {
    try {
      BgmManager.getHistory('HC02-F27D9E', 0);
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <View>
      <Text>DeviceGetData</Text>
    </View>
  );
};

export default DeviceGetData;

const styles = StyleSheet.create({});
