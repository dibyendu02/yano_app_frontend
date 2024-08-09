import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../../../../components/header/Header';
import { Colors } from '../../../../../constants/Colors';
import FilledButton from '../../../../../components/buttons/FilledButton';
import Card from '../../../../../components/cards/Card';
import CustomRadioButton from '../../../../../components/formComp/CustomRadio';
import RadioButton from '../components/RadioButton';
import StripCodeScroll from '../components/StripCodeScroll';
import { StaticImage } from '../../../../../assets/images';
import { Image } from 'react-native';

const BloodGlucoseStep2 = ({ navigation }: any) => {
  const [code, setCode] = useState('C20');
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.GhostWhite,
        position: 'relative',
      }}>
      <Header title={'Blood glucose'} />
      <View
        style={{
          backgroundColor: 'white',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 15,
          borderRadius: 10,
          padding: 15,
        }}>
        <Text
          style={{
            color: Colors.Blue,
            fontSize: 18,
            marginBottom: 20,
            fontWeight: '400',
          }}>
          Take a drop of blood from one of your fingers using a lancing device.
        </Text>
        <View>
          <Image source={StaticImage.TakeADropOfBlood} style={{
            height: 296,
            width: 296
          }} />
        </View>
      </View>

      <View style={styles.addBtn}>
        <FilledButton
          label={'Back'}
          // icon={
          // }
          type={'lightGrey'}
          style={{ width: '48%', alignSelf: 'center', marginVertical: 14 }}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        />
        <FilledButton
          label={'Next'}
          // icon={
          // }
          type={'blue'}
          style={{ width: '48%', alignSelf: 'center', marginVertical: 14 }}
          onPress={() => navigation.navigate('BloodGlucoseStep3')}
          activeOpacity={0.8}
        />
      </View>
    </SafeAreaView>
  );
};

export default BloodGlucoseStep2;

const styles = StyleSheet.create({
  addBtn: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: Colors.White,
    padding: 10,
    paddingHorizontal: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
