// MonitoredProfile.tsx
import React from 'react';
import {View, Text, Image, StyleSheet, SafeAreaView} from 'react-native';
import {Colors} from '../../../constants/Colors';
import Card from '../../../components/cards/Card';
import {DummyImage} from '../../../assets/dummy/images';
import Header from '../../../components/header/Header';
import FilledButton from '../../../components/buttons/FilledButton';
import HeaderLocal from './component/HeaderLocal';
import {navigate} from '../../../navigation/RootNavigation';

const AfterQR = () => {
  return (
    <View style={styles.container}>
      <HeaderLocal
        title="Add patient"
        headerRightComponent={
          <FilledButton
            label="Add"
            type="blue"
            style={{
              width: 70,
              paddingVertical: 10,
              borderRadius: 10,
            }}
            // disabled={disabled}
            // onPress={() => navigate('EmailNotFoundPatient')}
            onPress={() => {
              navigate('PatientMonitoringProfileLocal');
            }}
          />
        }
        customStyle={{paddingBottom: 2, paddingTop: 32}}
      />
      <View style={styles.body}>
        <Card
          contentContainerStyle={{
            backgroundColor: Colors.White,
            marginTop: 12,
          }}>
          <Image source={DummyImage.user} style={{height: 70, width: 70}} />
          <Text
            style={{
              fontSize: 18,
              color: Colors.Blue,
              fontWeight: 'semibold',
              marginTop: 10,
            }}>
            María Clemente
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: Colors.SteelBlue,
              textAlign: 'center',
              width: '85%',
            }}>
            maria.clemente@gmail.com
          </Text>
        </Card>
      </View>
    </View>
  );
};

export default AfterQR;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.GhostWhite,
  },
  body: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  findButton: {
    paddingHorizontal: 0,
  },
});
