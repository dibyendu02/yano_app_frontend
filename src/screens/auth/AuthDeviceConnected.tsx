import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext} from 'react';
import {Colors} from '../../constants/Colors';
import Header from '../../components/header/Header';
import FilledButton from '../../components/buttons/FilledButton';
import {OkIcon} from '../../assets/icon/IconNames';
import UserContext from '../../contexts/UserContext';
import {AuthScreen} from '../../navigation/auth/AuthScreens';

const AuthDeviceConnected = ({navigation}: any) => {
  const {login} = useContext(UserContext);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.GhostWhite,
        position: 'relative',
      }}>
      {/* <Header title="" /> */}
      <View
        style={{
          width: '100%',
          height: 50,
          backgroundColor: Colors.White,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: Colors.Blue,
          }}>
          ¡Felicidades!
        </Text>
      </View>
      <ScrollView>
        <View style={{padding: 20}}>
          <View
            style={{
              backgroundColor: Colors.White,
              paddingVertical: 40,
              paddingHorizontal: 40,
              borderRadius: 10,
              marginBottom: 20,
            }}>
            <View
              style={{
                alignSelf: 'center',
                marginBottom: 20,
                width: 100,
                height: 100,
              }}>
              <OkIcon size={90} />
            </View>
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: Colors.Blue,
                textAlign: 'center',
                marginBottom: 5,
              }}>
              Yano Multi-Parameter Monitor has been added
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: Colors.SteelBlue,
                textAlign: 'center',
              }}>
              Start measuring your vital signs.
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.addBtn}>
        <FilledButton
          label="Continue"
          type="blue"
          onPress={() => {
            // login();
            navigation.navigate(AuthScreen.LoadingScreen);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default AuthDeviceConnected;

const styles = StyleSheet.create({
  addBtn: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: Colors.White,
    padding: 10,
  },
});
