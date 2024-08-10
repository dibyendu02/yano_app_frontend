import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import rotateBtn from '../../../../assets/image/rotate.png';
// import videoBtn from '../../../../assets/image/video.png';
// import videoOffBtn from '../../../../assets/image/Video_off.png';
// import muteBtn from '../../../../assets/image/mute.png';
// import micOffBtn from '../../../../assets/image/Mic_off.png';
// import vitalsBtn from '../../../../assets/image/vitals.png';
import { DummyImage } from '../../../../assets/dummy/images';
import Badge from '../../../../components/Badge';
import { BluetoothConnected, NextIcon } from '../../../../assets/icon/IconNames';
import CustomBottomModal from '../../../../components/bottom-sheet/CommonButtonModal';
import { Colors } from '../../../../constants/Colors';
import CommonHeader from '../../../healthCondition/components/CommonHeader';
import Icons from '../../../../assets/icon/Icon';
import MeasurementItems from '../../../../components/ShowItems';
import { measurementList2 } from '../../../../assets/measurement-items/measurementList';
import { staticIcons } from '../../../../assets/image';
import MeasurementItemsLocal from './MeasurementItemsLocal';
import CommonHeaderLocal from './CompoundHeaderLocal';

interface BottomSectionProps { }

const BottomSection: React.FC<BottomSectionProps> = () => {
  const [rotate, setRotate] = useState(true);
  const [mute, setMute] = useState(true);
  const [video, setVideo] = useState(true);
  const [vitals, setVitals] = useState(false);
  const [showVitals, setShowVitals] = useState(false);

  function toggleRotate() {
    setRotate(!rotate);
  }
  function toggleVideo() {
    setVideo(!video);
  }
  function toggleMute() {
    setMute(!mute);
  }
  function toggleVitals() {
    setVitals(!vitals);
  }

  return (
    <View style={style.mainSection}>
      <View style={style.button}>
        <TouchableOpacity onPress={toggleRotate}
          style={{ height: 40, width: 40, backgroundColor: '#333333', borderRadius: 25, alignItems: 'center', justifyContent: 'center' }}
        >
          <Image source={staticIcons.FlipCamera}
            style={{ height: 24, width: 24 }}
          />
        </TouchableOpacity>
        <Text style={style.textColor}>Rotate</Text>
      </View>
      <View style={style.button}>
        <TouchableOpacity onPress={toggleVideo}
          style={{ height: 40, width: 40, backgroundColor: (video ? '#333333' : '#ffffff'), borderRadius: 25, alignItems: 'center', justifyContent: 'center' }}
        >
          <Image source={staticIcons.VideoCamOff}
            style={{ height: 24, width: 24, tintColor: video ? '#ffffff' : '#333333' }}
          />
        </TouchableOpacity>
        <Text style={style.textColor}>Video</Text>
      </View>
      <View style={style.button}>
        <TouchableOpacity onPress={toggleMute}
          style={{ height: 40, width: 40, backgroundColor: (mute ? '#333333' : '#ffffff'), borderRadius: 25, alignItems: 'center', justifyContent: 'center' }}
        >
          <Image source={staticIcons.MicOff}
            style={{ height: 24, width: 24, tintColor: mute ? '#ffffff' : '#333333' }}
          />
        </TouchableOpacity>
        <Text style={style.textColor}>Mute</Text>
      </View>
      <View style={style.button}>
        <TouchableOpacity onPress={toggleVitals}
          style={{ height: 40, width: 40, backgroundColor: '#333333', borderRadius: 25, alignItems: 'center', justifyContent: 'center' }}
        >
          <Image source={staticIcons.MonitorHeart}
            style={{ height: 24, width: 24 }}
          />
        </TouchableOpacity>
        <Text style={style.textColor}>Vitals</Text>
      </View>
      <CustomBottomModal
        boxStyle={{ height: (showVitals && 400) }}
        isVisible={vitals} onBackdropPress={() => setVitals(false)}>
        {!showVitals ?
          <View style={{ padding: 20 }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: Colors.Blue,
              marginBottom: 10,
            }}>Measurement Tools</Text>
            <TouchableOpacity
              onPress={() => setShowVitals(true)}
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 10,
                backgroundColor: Colors.White,
                borderRadius: 10,
                marginBottom: 10,
              }}
            >
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 15,
              }}>
                <Image
                  source={DummyImage.device}
                  style={{ width: 40, height: 40 }}
                />
                <View style={{
                  width: "80%",
                }}>
                  <Text style={{
                    fontSize: 16,
                    color: Colors.Blue,
                  }} >Dispositivo multiparámetros Yano </Text>
                  <Badge icon={<BluetoothConnected size={16} />} text='Connected' customStyle={{ width: 110, borderRadius: 5, padding: 4, paddingVertical: 2 }} />
                </View>
              </View>
              <NextIcon size={32} />
            </TouchableOpacity>
          </View> :
          <View style={{
            paddingHorizontal: 20,
          }}>
            <CommonHeaderLocal title='Select a measurement' leftIcon={
              <TouchableOpacity onPress={() => setShowVitals(false)}>
                <Icons.MaterialIcons name='arrow-back' size={30} color={Colors.Blue} />
              </TouchableOpacity>
            } />
            <View
              style={{
                height: '100%',
              }}
            >
              <MeasurementItemsLocal data={measurementList2} />
            </View>
          </View>}
      </CustomBottomModal >
    </View >
  );
};

const style = StyleSheet.create({
  mainSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 20,
  },
  textColor: {
    color: 'white',
    paddingVertical: 6,
  },
  button: {
    display: 'flex',
    alignItems: 'center',
  },
  navbar: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: Colors.White,
  },
  navbarTitle: {
    color: Colors.Blue,
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    paddingLeft: 15,
  },
  boxStyle: {
    width: '100%',
    backgroundColor: Colors.White,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingTop: 10
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.Blue,
  },
  para: {
    fontSize: 14,
    color: Colors.SteelBlue,
    marginBottom: 4,
  },
  flexBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default BottomSection;
