import {
  Image,
  Platform,
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
    <View
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
      <ScrollView style={{paddingVertical: 12, width: '94%', margin: 'auto'}}>
        <View
          style={{
            backgroundColor: Colors.White,
            paddingHorizontal: 12,
            borderRadius: 8,
          }}>
          <PatientElements
            name="Yano Multi-Parameter Monitor"
            onPress={() => navigate(AuthScreen.DeviceInfo)}
            element={
              <Image
                source={DummyImage.largeDevice}
                style={{width: 50, height: 50}}
              />
            }
            customStyle={{
              borderBottomWidth: 1,
              borderColor: Colors.LightGray,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              paddingHorizontal: 5,
            }}
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
            customStyle={{
              borderBottomWidth: 1,
              borderColor: Colors.LightGray,
              borderRadius: 0,
              paddingHorizontal: 5,
            }}
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
            customStyle={{
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              paddingHorizontal: 5,
            }}
            color=""
          />
        </View>
      </ScrollView>
    </View>
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
    bottom: Platform.OS === 'ios' ? 10 : 0,
    left: 0,
    width: '100%',
    backgroundColor: Colors.White,
    padding: 10,
  },
  skipButton: {
    borderWidth: 1,
    borderColor: Colors.Blue,
    borderRadius: 8,
    fontSize: 14,
    color: '#00263E',
    fontWeight: 'bold',
    padding: 10,
    paddingHorizontal: 15,
    marginRight: 15,
  },
});
