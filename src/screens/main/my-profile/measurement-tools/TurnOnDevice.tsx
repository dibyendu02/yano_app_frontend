import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {Colors} from '../../../../constants/Colors';
import Header from '../../../../components/header/Header';
import {DummyImage} from '../../../../assets/dummy/images';
import FilledButton from '../../../../components/buttons/FilledButton';
import {useRoute} from '@react-navigation/native';

const TurnOnDevice = ({navigation}: any) => {
  const route = useRoute();
  const devicename = route?.params?.devicename;

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('DeviceConnected', {devicename: devicename});
    }, 1000);
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.GhostWhite,
        position: 'relative',
      }}>
      <Header title="" />
      <ScrollView style={{paddingVertical: 12, width: '94%', margin: 'auto'}}>
        <View>
          <View
            style={{
              backgroundColor: Colors.White,
              paddingVertical: 20,
              paddingHorizontal: 20,
              borderRadius: 10,
              marginBottom: 20,
            }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: Colors.Blue,
                textAlign: 'center',
                marginBottom: 10,
              }}>
              Turn on the device
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: Colors.SteelBlue,
                textAlign: 'center',
              }}>
              Please turn on the device by holding the power button until the
              blue light flashes.
            </Text>
            <Image
              source={DummyImage.deviceTurnOn}
              width={250}
              height={250}
              style={{
                alignSelf: 'center',
                marginTop: 20,
                width: 250,
                height: 250,
              }}
            />
          </View>
        </View>
      </ScrollView>
      {/* <View style={styles.addBtn}>
        <FilledButton
          label="Add a device"
          type="blue"
          onPress={() => navigation.navigate('DeviceConnected')}
        />
      </View> */}
    </View>
  );
};

export default TurnOnDevice;

const styles = StyleSheet.create({
  addBtn: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 10 : 0,
    left: 0,
    width: '100%',
    backgroundColor: Colors.White,
    padding: 10,
  },
});
