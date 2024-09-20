import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import logo_transparent from '../assets/image/logo_transparent_two.png';
import {Image} from 'react-native';
import UserContext from '../contexts/UserContext';
import {navigate} from '../navigation/RootNavigation';
// Assuming Loader is an SVG, you can wrap it with Animated
import LoaderSvg from '../assets/icon/wrapper.svg';
import {retrieveData} from '../utils/Storage';
import {getDoctorById, getPatientById} from '../api/GET/auth';

const LoadingScreen = () => {
  const {login} = useContext(UserContext);
  const spinValue = useRef(new Animated.Value(0)).current;
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [userType, setUserType] = useState('');

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
  }, [spinValue, login]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const getUserData = async () => {
    const retrievedToken = await retrieveData('token');
    const retrievedUserId = await retrieveData('userId');
    const retrievedUserType = await retrieveData('userType');

    setToken(retrievedToken);
    setUserId(retrievedUserId);
    setUserType(retrievedUserType);

    // try {
    //   if (userType === 'doctor' && userId != '') {
    //     console.log('doctor signup');
    //     const res = await getDoctorById({userId, token});
    //     setTimeout(() => {
    //       login(res?.userData);
    //       navigate('tabs');
    //     }, 1000);
    //     console.log(res);
    //   } else {
    //     if (userId != '') {
    //       console.log('patient signup');
    //       const res = await getPatientById({userId, token});
    //       setTimeout(() => {
    //         login(res?.userData);
    //         navigate('tabs');
    //       }, 1000);
    //       console.log(res);
    //     }
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
  };

  useEffect(() => {
    const setUserData = async () => {
      try {
        if (userType === 'doctor' && userId != '') {
          console.log('doctor signup');
          const res = await getDoctorById({userId, token});
          setTimeout(() => {
            login(res?.userData);
            navigate('tabs');
          }, 1000);
          console.log(res);
        } else {
          if (userId != '') {
            console.log('patient signup');
            const res = await getPatientById({userId, token});
            setTimeout(() => {
              login(res?.userData);
              navigate('tabs');
            }, 1000);
            console.log(res);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    setUserData();
  }, [userId, userType]);

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#00263E',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={logo_transparent}
        style={{height: 60, marginBottom: 20, objectFit: 'contain'}}
      />
      {/* If you want to use ActivityIndicator */}
      {/* <ActivityIndicator color={'#fff'} size="large" animating={true} /> */}

      {/* Animated SVG loader */}
      <Animated.View style={{transform: [{rotate: spin}]}}>
        <LoaderSvg width={50} height={50} />
      </Animated.View>
    </View>
  );
};

export default LoadingScreen;
