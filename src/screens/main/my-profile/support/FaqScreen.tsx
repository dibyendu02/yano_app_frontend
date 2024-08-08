import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../../../../components/header/Header';
import {Colors} from '../../../../constants/Colors';

const FaqScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Frequently asked questions" />
    </SafeAreaView>
  );
};

export default FaqScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.GhostWhite,
  },
});
