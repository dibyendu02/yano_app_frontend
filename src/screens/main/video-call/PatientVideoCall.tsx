import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import videoImage from '../../../assets/image/video_frame.png';
import {TopBar} from './components/TopBar';
import BottomSection from './components/BottomSection';
import Card from '../my-profile/UiUpdateComponents/Card';
import {useIsFocused, useNavigation} from '@react-navigation/native';

export default function PatientVideoCall() {
  // const {height} = Dimensions.get('window');
  const [isClicked, setIsClicked] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (Platform.OS === 'android') {
      if (isFocused) {
        StatusBar.setBarStyle('light-content');
      } else {
        StatusBar.setBarStyle('dark-content');
      }
    }
  }, [isFocused]);
  return (
    <View style={[style.mainContainer]}>
      <TopBar
        doctorName="Dr. Eduardo Anzola"
        duration="0:24"
        setIsClicked={setIsClicked}
      />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          marginBottom: 10,
          // backgroundColor: 'red',
        }}>
        <Image
          source={videoImage}
          style={{width: '96%', height: '102%', objectFit: 'contain'}}
        />
      </View>
      <BottomSection />
      {isClicked && (
        <View style={style.deletbuttonclick}>
          <Card
            title={'Do you want to leave the video consultation?'}
            children={
              'You will stop having contact with the health provider who treated you.'
            }
            active={setIsClicked}
            action={() => navigation.navigate('tabs')}
            contentContainerStyle={{paddingBottom: 10}}
          />
        </View>
      )}
    </View>
  );
}

const style = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#000',
    display: 'flex',
    justifyContent: 'space-between',
    flex: 1,
  },
  deletbuttonclick: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    position: 'absolute',
    height: '100%',
    width: '95%',
    marginHorizontal: '2%',
    zIndex: 1,
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 12,
  },
});
