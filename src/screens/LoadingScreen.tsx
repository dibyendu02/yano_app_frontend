import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect } from 'react';
import logo_transparent from '../assets/image/logo_transparent.png';
import { Image } from 'react-native';
import UserContext from '../contexts/UserContext';
import { navigate } from '../navigation/RootNavigation';
const LoadingScreen = () => {
  const { login } = useContext(UserContext);

  useEffect(() => {
    setTimeout(() => {
      login();
      navigate('tabs');
    }, 1000);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#00263E',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image source={logo_transparent} style={{ height: 60, marginBottom: 20 }} />
      <ActivityIndicator color={'#fff'} size="large" animating={true} />
    </View>
  );
};

export default LoadingScreen;
