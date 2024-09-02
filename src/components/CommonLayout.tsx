import {StyleSheet, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {Colors} from '../constants/Colors';

const CommonLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.GhostWhite,
        position: 'relative',
      }}>
      {children}
    </View>
  );
};

export default CommonLayout;
