import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import Header from '../../../../components/header/Header';
import {DummyImage} from '../../../../assets/dummy/images';
import {Colors} from '../../../../constants/Colors';
import PatientElements from '../../../../components/PatientElements';
import OutlineButton from '../../../../components/buttons/OutlineButton';
import {navigate} from '../../../../navigation/RootNavigation';
import {AuthScreen} from '../../../../navigation/auth/AuthScreens';

const devices = [
  {
    id: 1,
    name: 'Monitor Multiparámetros Yano',
    image: DummyImage.largeDevice,
    navigateTo: AuthScreen.DeviceInfo,
  },
  {
    id: 2,
    name: 'Medidor continuo de glucosa',
    image: DummyImage.glucoround,
    navigateTo: 'AuthDeviceInfo',
  },
  {
    id: 3,
    name: 'Glucómetro',
    image: DummyImage.glucometer,
    navigateTo: 'AuthDeviceInfo',
  },
];

const ChooseDevice = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.GhostWhite,
        position: 'relative',
      }}>
      <Header title="Choose Device" />
      <ScrollView style={{paddingVertical: 12, width: '94%', margin: 'auto'}}>
        <View style={{}}>
          {devices.map((device, index) => {
            let containerStyle = {};
            if (index === 0) {
              // First device
              containerStyle = {
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
              };
            } else if (index === devices.length - 1) {
              // Last device
              containerStyle = {
                borderBottomLeftRadius: 8,
                borderBottomRightRadius: 8,
              };
            }

            return (
              <PatientElements
                key={device.id}
                name={device.name}
                onPress={() => navigate(device.navigateTo)}
                element={
                  <Image
                    source={device.image}
                    style={{width: 50, height: 50}}
                  />
                }
                color=""
                customStyle={[
                  // styles.deviceContainer,
                  // containerStyle,
                  // index === 1 && styles.middleDevice, // Middle device
                  {borderRadius: 0},
                ]}
              />
            );
          })}
        </View>
      </ScrollView>
      <View style={styles.addBtn}>
        <Text
          style={{
            textAlign: 'center',
            color: Colors.SteelBlue,
            marginBottom: 6,
          }}>
          Still don't have one of our devices?
        </Text>
        <OutlineButton
          label="Click here to buy"
          type="blue"
          onPress={() => navigate('DeviceAndAccessories')}
        />
      </View>
    </SafeAreaView>
  );
};

export default ChooseDevice;

const styles = StyleSheet.create({
  deviceContainer: {
    borderWidth: 1,
    borderColor: Colors.LightGray,
  },
  middleDevice: {
    borderRadius: 0, // Remove all border radius for the middle device
  },
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
