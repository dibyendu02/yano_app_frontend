import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../../../../components/header/Header';
import {Colors} from '../../../../../constants/Colors';
import FilledButton from '../../../../../components/buttons/FilledButton';
import Card from '../../../../../components/cards/Card';
import CustomRadioButton from '../../../../../components/formComp/CustomRadio';
import RadioButton from '../components/RadioButton';
import StripCodeScroll from '../components/StripCodeScroll';

const BloodGlucoseSelectStrip = ({navigation}: any) => {
  const [code, setCode] = useState('C20');
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.GhostWhite,
        position: 'relative',
      }}>
      <Header title={'Blood Glucose'} />
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
            color: Colors.SteelBlue,
            fontSize: 16,
            marginBottom: 20,
            fontWeight: '500',
          }}>
          Select the test strip code, then press the next button.
        </Text>
        <StripCodeScroll setCode={setCode} />
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
          onPress={() => navigation.navigate('BloodGlucoseReading')}
          activeOpacity={0.8}
        />
      </View>
    </SafeAreaView>
  );
};

export default BloodGlucoseSelectStrip;

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
