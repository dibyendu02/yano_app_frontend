import {Image, Platform, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../../../../components/header/Header';
import {Colors} from '../../../../../constants/Colors';
import FilledButton from '../../../../../components/buttons/FilledButton';
import Card from '../../../../../components/cards/Card';
import CustomRadioButton from '../../../../../components/formComp/CustomRadio';
import RadioButton from '../components/RadioButton';
import StripCodeScroll from '../components/StripCodeScroll';
import {StaticImage} from '../../../../../assets/images';

const BloodGlucoseStep1 = ({navigation}: any) => {
  const [code, setCode] = useState('C20');
  return (
    <View
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
          marginTop: 12,
          width: '94%',
          margin: 'auto',
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
          Insert the test strip into the receiving hole, then press next.
        </Text>
        <View>
          <Image
            source={StaticImage.InsertTheStrip}
            style={{
              height: 296,
              width: 296,
            }}
          />
        </View>
      </View>

      <View style={styles.addBtn}>
        <FilledButton
          label={'Back'}
          // icon={
          // }
          type={'lightGrey'}
          style={{width: '48%', alignSelf: 'center', marginVertical: 14}}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        />
        <FilledButton
          label={'Next'}
          // icon={
          // }
          type={'blue'}
          style={{width: '48%', alignSelf: 'center', marginVertical: 14}}
          onPress={() => navigation.navigate('BloodGlucoseStep2')}
          activeOpacity={0.8}
        />
      </View>
    </View>
  );
};

export default BloodGlucoseStep1;

const styles = StyleSheet.create({
  addBtn: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 10 : 0,
    left: 0,
    width: '100%',
    backgroundColor: Colors.White,
    padding: 10,
    paddingHorizontal: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
