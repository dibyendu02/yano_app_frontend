import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {Colors} from '../../../../constants/Colors';
import Header from '../../../../components/header/Header';
import {DummyImage} from '../../../../assets/dummy/images';
import FilledButton from '../../../../components/buttons/FilledButton';
import {useRoute} from '@react-navigation/native';

const DeviceInfo = ({navigation}: any) => {
  const route = useRoute();
  const devicename = route?.params?.devicename;

  console.log(devicename);
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
              padding: 20,
              borderRadius: 10,
              marginBottom: 20,
            }}>
            <Image
              source={
                (devicename == 'multimeter' && DummyImage.monitor) ||
                (devicename == 'medidor' && DummyImage.glucoround) ||
                (devicename == 'glucometer' && DummyImage.glucometer)
              }
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
                marginHorizontal: 40,
              }}>
              {(devicename == 'multimeter' && `Yano Multi-Parameter Monitor`) ||
                (devicename == 'medidor' && `Medidor continuo de glucosa`) ||
                (devicename == 'glucometer' && `Glucómetro`)}
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: Colors.SteelBlue,
                textAlign: 'center',
                // marginHorizontal: 27,
              }}>
              It allows you to measure your blood {'\n'} pressure, glucose
              level, body {'\n'} temperature, heart rate and ECG.
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.addBtn}>
        <FilledButton
          label="Add a device"
          type="blue"
          onPress={() =>
            navigation.navigate('TurnOnDevice', {devicename: devicename})
          }
        />
      </View>
    </View>
  );
};

export default DeviceInfo;

const styles = StyleSheet.create({
  addBtn: {
    position: 'absolute',
    bottom:Platform.OS === 'ios' ? 10 :  0,
    left: 0,
    width: '100%',
    backgroundColor: Colors.White,
    padding: 10,
  },
});
