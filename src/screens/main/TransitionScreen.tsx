import React, {useEffect} from 'react';
import {Colors} from '../../constants/Colors';
import {ActivityIndicator, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const TransitionScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('MonitoredProfile');
    }, 2000);
  });
  return (
    <View style={{flex: 1, backgroundColor: Colors.Blue}}>
      <View
        style={{
          flexDirection: 'column',
          gap: 5,
          alignItems: 'center',
          paddingHorizontal: 28,
          marginTop: '80%',
        }}>
        <ActivityIndicator color={Colors.White} size={35} />
        <Text style={{fontSize: 20, color: 'white', fontWeight: 'semibold'}}>
          Loading patient information
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: 'rgba(255,255,255, 0.6)',
            textAlign: 'center',
          }}>
          You will be able to access your health history and recieve
          notifications.
        </Text>
      </View>
    </View>
  );
};

export default TransitionScreen;
