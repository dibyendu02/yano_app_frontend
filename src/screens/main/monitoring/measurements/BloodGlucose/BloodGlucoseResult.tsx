import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../../../../components/header/Header';
import {Colors} from '../../../../../constants/Colors';
import FilledButton from '../../../../../components/buttons/FilledButton';
import {UTurnIcon} from '../../../../../assets/icon/IconNames';
import Scale from '../../../../../assets/measurements/images/bloodGlucose.png';
import Icons from '../../../../../assets/icon/Icon';

const BloodGlucoseResult = ({navigation}: any) => {
  const [code, setCode] = useState('C20');

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.GhostWhite,
        position: 'relative',
      }}>
      <Header
        title={'Blood glucose'}
        headerRightComponent={
          <Icons.Feather name="share-2" color={Colors.Blue} size={25} />
        }
      />
      <View
        style={{
          backgroundColor: 'white',
          marginVertical: 12,
          width: '94%',
          margin: 'auto',
          height: 120,
          borderRadius: 8,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 40, fontWeight: '600', color: Colors.Blue}}>
          5.0
        </Text>
        <Text style={{color: Colors.SteelBlue}}>mmol/L</Text>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          marginHorizontal: 10,
          height: 120,
          borderRadius: 8,
          flexDirection: 'column',
          padding: 15,
          //   alignItems: 'center',
          //   justifyContent: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            // alignItems: 'center',
            position: 'relative',
            height: '120%',
          }}>
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 30,
              backgroundColor: Colors.Green,
            }}
          />
          <Text style={{fontSize: 18, fontWeight: '600', color: Colors.Blue}}>
            Normal glucose level
          </Text>
        </View>
        <Image
          source={Scale}
          style={{
            marginTop: 15,
            width: '100%',
            objectFit: 'contain',
            position: 'absolute',
            bottom: -60,
            left: 20,
          }}
        />
      </View>

      <View style={styles.addBtn}>
        <FilledButton
          label={'Start again'}
          icon={<UTurnIcon color="white" />}
          type={'blue'}
          style={{width: '100%', alignSelf: 'center', marginVertical: 14}}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        />
      </View>
    </View>
  );
};

export default BloodGlucoseResult;

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
