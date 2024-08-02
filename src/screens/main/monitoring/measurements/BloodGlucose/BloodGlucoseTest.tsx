import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../../../../components/header/Header';
import {Colors} from '../../../../../constants/Colors';
import FilledButton from '../../../../../components/buttons/FilledButton';

const BloodGlucoseTest = ({navigation}: any) => {
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
          margin: 10,
          height: 120,
          borderRadius: 8,
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 50, color: Colors.SteelBlue}}>_ _</Text>
        <Text style={{color: Colors.SteelBlue}}>mmol/L</Text>
      </View>
      <View style={styles.addBtn}>
        <FilledButton
          label={'Start Measuring'}
          // icon={
          // }
          type={'blue'}
          style={{width: '92%', alignSelf: 'center', marginVertical: 14}}
          onPress={() => navigation.navigate('BloodGlucoseTestTime')}
          activeOpacity={0.8}
        />
      </View>
    </SafeAreaView>
  );
};

export default BloodGlucoseTest;

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
