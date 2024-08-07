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
import {Colors} from '../../constants/Colors';
import Header from '../../components/header/Header';
import {DummyImage} from '../../assets/dummy/images';
import FilledButton from '../../components/buttons/FilledButton';
import {navigate} from '../../navigation/RootNavigation';
import UserContext from '../../contexts/UserContext';
import {StaticImage} from '../../assets/images';
import {AuthScreen} from '../../navigation/auth/AuthScreens';

const AuthAskDevice = ({navigation}: any) => {
  const {login, isPatient} = useContext(UserContext);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.GhostWhite,
        position: 'relative',
      }}>
      <Header
        title=""
        headerRightComponent={
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(AuthScreen.LoadingScreen);
              }}>
              <Text style={styles.skipButton}>Skip</Text>
            </TouchableOpacity>
          </View>
        }
      />
      <ScrollView>
        <View style={{padding: 20}}>
          <View
            style={{
              backgroundColor: Colors.White,
              padding: 20,
              borderRadius: 10,
              marginBottom: 20,
            }}>
            <Image
              source={StaticImage.DeviceStart}
              width={250}
              height={250}
              style={{
                alignSelf: 'center',
                marginBottom: 20,
                width: 150,
                height: 150,
              }}
            />
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: Colors.Blue,
                textAlign: 'center',
                marginBottom: 10,
              }}>
              Do you have one of our devices?
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: Colors.SteelBlue,
                textAlign: 'center',
              }}>
              Use our app to connect your Yano device and start taking control
              of your health.
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.addBtn}>
        <FilledButton
          label="Connect this device"
          type="blue"
          onPress={() => navigation.navigate(AuthScreen.ChooseDevice)}
        />
      </View>
    </SafeAreaView>
  );
};

export default AuthAskDevice;

const styles = StyleSheet.create({
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
