import {Image, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import Header from '../../../../components/header/Header';
import {DummyImage} from '../../../../assets/dummy/images';
import {Colors} from '../../../../constants/Colors';
import CommonItem from '../components/CommonItem';
import FilledButton from '../../../../components/buttons/FilledButton';
import EmptyScreen from '../../../../components/EmptyScreen';
import {navigate} from '../../../../navigation/RootNavigation';

const MeasurementToolsHomeScreen = () => {
  const [visible, isVisible] = useState(true);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.GhostWhite,
        position: 'relative',
      }}>
      <Header title="Measurement Tools" />
      {visible ? (
        <ScrollView>
          <View style={{paddingVertical: 12, width: '94%', margin: 'auto'}}>
            <CommonItem
              name="Monitor Multiparámetros Yano"
              onPress={() => navigate('MeasurementMonitoring')}
              leftIcon={
                <Image source={DummyImage.device} width={30} height={30} />
              }
            />
            <CommonItem
              name="Monitor Multiparámetros Yano"
              onPress={() => navigate('DeviceInfo')}
              leftIcon={
                <Image source={DummyImage.device} width={30} height={30} />
              }
              isConnected={true}
            />
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
    </SafeAreaView>
  );
};

export default MeasurementToolsHomeScreen;

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
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: Colors.White,
    padding: 10,
  },
});
