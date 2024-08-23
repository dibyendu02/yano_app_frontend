import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../../../../components/header/Header';
import {Colors} from '../../../../../constants/Colors';
import FilledButton from '../../../../../components/buttons/FilledButton';
import Card from '../../../../../components/cards/Card';
import CustomRadioButton from '../../../../../components/formComp/CustomRadio';
import RadioButton from '../components/RadioButton';
import StripCodeScroll from '../components/StripCodeScroll';

const BloodGlucoseReading = ({navigation}: any) => {
  const [code, setCode] = useState('C20');
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('BloodGlucoseResult');
    }, 3000);
  }, []);
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
          paddingHorizontal: 10,
        }}>
        <Text
          style={{
            color: Colors.SteelBlue,
            fontSize: 16,
            marginBottom: 20,
            fontWeight: '500',
          }}>
          The blood sample was detected. Wait a few seconds to get the result.
        </Text>
        <ActivityIndicator size={'large'} color={Colors.Blue} />
      </View>

      <View style={styles.addBtn}>
        <FilledButton
          label={'Stop measurement'}
          // icon={
          // }
          type={'red'}
          style={{width: '100%', alignSelf: 'center', marginVertical: 14}}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        />
      </View>
    </SafeAreaView>
  );
};

export default BloodGlucoseReading;

const styles = StyleSheet.create({
  addBtn: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: Colors.White,
    padding: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
