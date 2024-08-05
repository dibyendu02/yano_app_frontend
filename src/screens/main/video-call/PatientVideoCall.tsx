import React from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import videoImage from '../../../assets/image/video_frame.png';
import {TopBar} from './components/TopBar';
import BottomSection from './components/BottomSection';

export default function PatientVideoCall() {
  const {height} = Dimensions.get('window');

  return (
    <View style={[style.mainContainer, {height}]}>
      <TopBar doctorName="Dr. Eduardo Anzola" duration="0:24" />
      <View style={{flex: 1, alignItems: 'center', marginBottom: 10}}>
        <Image source={videoImage} />
      </View>
      <BottomSection />
    </View>
  );
}

const style = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#000',
    display: 'flex',
    justifyContent: 'space-between',
  },
});
