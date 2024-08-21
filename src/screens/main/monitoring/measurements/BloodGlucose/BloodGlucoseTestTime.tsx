import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../../../../components/header/Header';
import {Colors} from '../../../../../constants/Colors';
import FilledButton from '../../../../../components/buttons/FilledButton';
import Card from '../../../../../components/cards/Card';
import CustomRadioButton from '../../../../../components/formComp/CustomRadio';
import RadioButton from '../components/RadioButton';

const BloodGlucoseTestTime = ({navigation}: any) => {
  const [time, setTime] = useState('before-breakfast');
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.GhostWhite,
        position: 'relative',
      }}>
      <Header title={'Blood glucose'} />

      {/* <Card title="Please choose the measurement time, then press the next button."> */}
      <View
        style={{
          backgroundColor: Colors.White,
          marginTop: 12,
          width: '94%',
          margin: 'auto',
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
          Please choose the measurement time, then press the next button.
        </Text>
        <RadioButton
          label="Before Breakfast"
          value="before-breakfast"
          selectedValue={time}
          onValueChange={setTime}
        />
        <View style={{width: '100%', height: 1, backgroundColor: '#E9E9E9'}} />
        <RadioButton
          label="After Breakfast"
          value="after-breakfast"
          selectedValue={time}
          onValueChange={setTime}
        />
        <View style={{width: '100%', height: 1, backgroundColor: '#E9E9E9'}} />
        <RadioButton
          label="Before Lunch"
          value="before-lunch"
          selectedValue={time}
          onValueChange={setTime}
        />
        <View style={{width: '100%', height: 1, backgroundColor: '#E9E9E9'}} />
        <RadioButton
          label="After Lunch"
          value="after-lunch"
          selectedValue={time}
          onValueChange={setTime}
        />
        <View style={{width: '100%', height: 1, backgroundColor: '#E9E9E9'}} />
        <RadioButton
          label="Before Dinner"
          value="before-dinner"
          selectedValue={time}
          onValueChange={setTime}
        />
        <View style={{width: '100%', height: 2, backgroundColor: '#E9E9E9'}} />
        <RadioButton
          label="After Dinner"
          value="after-dinner"
          selectedValue={time}
          onValueChange={setTime}
        />
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
          onPress={() => navigation.navigate('BloodGlucoseSelectStrip')}
          activeOpacity={0.8}
        />
      </View>
    </SafeAreaView>
  );
};

export default BloodGlucoseTestTime;

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
