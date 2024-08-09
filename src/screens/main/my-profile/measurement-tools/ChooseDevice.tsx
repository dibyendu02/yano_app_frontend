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

const ChooseDevice = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.GhostWhite,
        position: 'relative',
      }}>
      <Header title="Choose Device" />
      <ScrollView>
        <View style={{padding: 20}}>
          <PatientElements
            name="Monitor Multiparámetros Yano"
            onPress={() => navigate(AuthScreen.DeviceInfo)}
            element={
              <Image
                source={DummyImage.largeDevice}
                style={{width: 50, height: 50}}
              />
            }
            color=""
          />
          <PatientElements
            name="Medidor continuo de glucosa"
            onPress={() => navigate('AuthDeviceInfo')}
            element={
              <Image
                source={DummyImage.glucoround}
                style={{width: 50, height: 50}}
              />
            }
            color=""
          />
          <PatientElements
            name="Glucómetro"
            onPress={() => navigate('AuthDeviceInfo')}
            element={
              <Image
                source={DummyImage.glucometer}
                style={{width: 50, height: 50}}
              />
            }
            color=""
          />
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
