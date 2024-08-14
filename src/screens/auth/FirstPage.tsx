import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
} from 'react-native';
import React, {useContext, useEffect, useRef} from 'react';

import logo_transparent from '../../assets/image/logo_transparent.png';
import {Image} from 'react-native';
import UserContext from '../../contexts/UserContext';
import {navigate} from '../../navigation/RootNavigation';
import LoaderSvg from '../../assets/icon/wrapper.svg';

const FirstScreen = () => {
  const spinValue = useRef(new Animated.Value(0)).current;

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
      //   login();
      //   navigate('tabs');
      navigate('Landing');
    }, 2000);
  }, [spinValue]);

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
      <Image source={logo_transparent} style={{height: 60, marginBottom: 20}} />
      {/* If you want to use ActivityIndicator */}
      {/* <ActivityIndicator color={'#fff'} size="large" animating={true} /> */}

      {/* Animated SVG loader */}
      <Animated.View style={{transform: [{rotate: spin}]}}>
        <LoaderSvg width={50} height={50} />
      </Animated.View>
    </View>
  );
};

export default FirstScreen;
