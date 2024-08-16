import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../../../components/header/Header';
import {Colors} from '../../../../constants/Colors';
import MeasurementItems from '../components/MeasurementItems';
import {DeviceSettings} from '../../../../assets/measurement-items/measurementList';

const DeviceSettingsScreen = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.GhostWhite,
        position: 'relative',
      }}>
      <Header title={'Device settings'} />
      <ScrollView>
        <View style={{paddingVertical: 12, width: '94%', margin: 'auto'}}>
          <View style={styles.container}>
            <MeasurementItems data={DeviceSettings} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DeviceSettingsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    borderRadius: 10,
    height: 'auto',
    overflow: 'hidden',
    marginBottom: 20,
  },
});
