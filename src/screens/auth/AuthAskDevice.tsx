import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {Colors} from '../../constants/Colors';
import Header from '../../components/header/Header';
import {DummyImage} from '../../assets/dummy/images';
import FilledButton from '../../components/buttons/FilledButton';
import {navigate} from '../../navigation/RootNavigation';
import UserContext from '../../contexts/UserContext';
import {StaticImage} from '../../assets/images';
import {AuthScreen} from '../../navigation/auth/AuthScreens';
import Card from '../main/my-profile/UiUpdateComponents/Card';

const AuthAskDevice = ({navigation}: any) => {
  const {login, isPatient} = useContext(UserContext);
  const [isClicked, setIsClicked] = useState(false);

  const loginAction = () => {
    navigation.navigate(AuthScreen.LoadingScreen);
  };
  return (
    <View
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
                setIsClicked(true);
              }}>
              <Text style={styles.skipButton}>Skip</Text>
            </TouchableOpacity>
          </View>
        }
      />
      <ScrollView>
        <View style={{paddingVertical: 12, width: '94%', margin: 'auto'}}>
          <View
            style={{
              backgroundColor: Colors.White,
              padding: 20,
              borderRadius: 10,
              marginBottom: 20,
            }}>
            <Image
              source={StaticImage.DeviceStart}
              // width={300}
              // height={400}
              style={{
                alignSelf: 'center',
                marginBottom: 20,
                width: '70%',
                height: 280,
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
                width: '90%',
                marginHorizontal: 'auto',
              }}>
              Use our app to connect your Yano device and start taking control
              of your health.
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.addBtn}>
        <FilledButton
          label="Connect device"
          type="blue"
          onPress={() => navigation.navigate(AuthScreen.ChooseDevice)}
        />
      </View>
      {isClicked && (
        <View style={styles.afterBtnClick}>
          <Card
            title={'The device has not been connected yet'}
            children={
              'Are you sure you want to exit the device pairing process?'
            }
            active={setIsClicked}
            action={loginAction}
          />
        </View>
      )}
    </View>
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
  afterBtnClick: {
    // backgroundColor: Colors.LightBlack,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: 1,
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
});
