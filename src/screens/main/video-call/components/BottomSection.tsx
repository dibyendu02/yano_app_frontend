import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import rotateBtn from '../../../../assets/image/rotate.png';
import videoBtn from '../../../../assets/image/video.png';
import videoOffBtn from '../../../../assets/image/Video_off.png';
import muteBtn from '../../../../assets/image/mute.png';
import micOffBtn from '../../../../assets/image/Mic_off.png';
import vitalsBtn from '../../../../assets/image/vitals.png';

interface BottomSectionProps {}

const BottomSection: React.FC<BottomSectionProps> = () => {
  const [rotate, setRotate] = useState(true);
  const [mute, setMute] = useState(true);
  const [video, setVideo] = useState(true);
  const [vitals, setVitals] = useState(true);

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
        <TouchableOpacity onPress={toggleRotate}>
          <Image source={rotateBtn} />
        </TouchableOpacity>
        <Text style={style.textColor}>Rotate</Text>
      </View>
      <View style={style.button}>
        <TouchableOpacity onPress={toggleVideo}>
          <Image source={video ? videoBtn : videoOffBtn} />
        </TouchableOpacity>
        <Text style={style.textColor}>Video</Text>
      </View>
      <View style={style.button}>
        <TouchableOpacity onPress={toggleMute}>
          <Image source={mute ? muteBtn : micOffBtn} />
        </TouchableOpacity>
        <Text style={style.textColor}>Mute</Text>
      </View>
      <View style={style.button}>
        <TouchableOpacity onPress={toggleVitals}>
          <Image source={vitalsBtn} />
        </TouchableOpacity>
        <Text style={style.textColor}>Vitals</Text>
      </View>
    </View>
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
});

export default BottomSection;
