import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext} from 'react';

import {DummyImage} from '../../assets/dummy/images';
import {Colors} from '../../constants/Colors';
import PatientElements from '../../components/PatientElements';
import OutlineButton from '../../components/buttons/OutlineButton';
import {navigate} from '../../navigation/RootNavigation';
import Header from '../../components/header/Header';
import UserContext from '../../contexts/UserContext';
import {AuthScreen} from '../../navigation/auth/AuthScreens';

const AuthChooseDevice = () => {
  const {login, isPatient} = useContext(UserContext);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.GhostWhite,
        position: 'relative',
      }}>
      <Header
        title="Choose your device"
        headerRightComponent={
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                navigate(AuthScreen.LoadingScreen);
              }}>
              <Text style={styles.skipButton}>Skip</Text>
            </TouchableOpacity>
          </View>
        }
      />
      <ScrollView>
        <View style={{padding: 20}}>
          <PatientElements
            name="Monitor Multiparámetros Yano"
            onPress={() => navigate(AuthScreen.DeviceInfo)}
            element={
              <Image source={DummyImage.device} width={30} height={30} />
            }
            color=""
          />
          <PatientElements
            name="Medidor continuo de glucosa"
            onPress={() => navigate('AuthDeviceInfo')}
            element={
              <Image source={DummyImage.glucoround} width={30} height={30} />
            }
            color=""
          />
          <PatientElements
            name="Glucómetro"
            onPress={() => navigate('AuthDeviceInfo')}
            element={
              <Image source={DummyImage.glucometer} width={30} height={30} />
            }
            color=""
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AuthChooseDevice;

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
  skipButton: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    fontSize: 14,
    color: '#00263E',
    fontWeight: 'bold',
    padding: 10,
    paddingHorizontal: 15,
    marginRight: 15,
  },
});
