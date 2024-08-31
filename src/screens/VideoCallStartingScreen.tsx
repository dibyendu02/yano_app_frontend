import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
} from 'react-native';
import React, {useContext, useEffect, useRef} from 'react';

import UserContext from '../contexts/UserContext';
import {navigate} from '../navigation/RootNavigation';

import {Colors} from '../constants/Colors';
import {useNavigation} from '@react-navigation/native';

const VideoCallStart = () => {
  const spinValue = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useEffect(() => {
    // Start the spin animation
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000, // Increase the duration for smoother animation
        easing: Easing.linear, // Use Easing.linear for continuous motion
        useNativeDriver: true,
      }),
    ).start();

    // Uncomment this when you want to trigger login and navigation

    setTimeout(() => {
      navigation.replace('PatientVideoCall');
    }, 2000);
  }, [spinValue, navigation]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#00263E',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {/* <Image
        source={logo_transparent}
        style={{height: 60, marginBottom: 20, objectFit: 'contain'}}
      /> */}
      {/* If you want to use ActivityIndicator */}
      <ActivityIndicator color={'#fff'} size="large" animating={true} />
      <Text
        style={{
          fontSize: 20,
          fontWeight: '500',
          color: Colors.White,
          marginTop: 20,
        }}>
        Ya falta muy poco...
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: 'white',
          opacity: 0.6,
          width: '50%',
          textAlign: 'center',
        }}>
        We are looking for the perfect doctor for you.
      </Text>

      {/* Animated SVG loader */}
      {/* <Animated.View style={{transform: [{rotate: spin}]}}>
        <LoaderSvg width={50} height={50} />
      </Animated.View> */}
    </View>
  );
};

export default VideoCallStart;
