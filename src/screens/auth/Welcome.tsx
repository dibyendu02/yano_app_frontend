import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { StaticImage } from '../../assets/images';
import { Colors } from '../../constants/Colors';
import FilledButton from '../../components/buttons/FilledButton';
import { navigate } from '../../navigation/RootNavigation';
import { AuthScreen } from '../../navigation/auth/AuthScreens';

const Welcome = () => {
  const [name, setName] = useState('Pedro');
  return (
    <ImageBackground source={StaticImage.Welcome} style={styles.container}>
      <View style={styles.overlay}>
        <Image source={StaticImage.WaveIcon} />
        <Text style={{ fontSize: 30, color: Colors.White, fontWeight: '600' }}>
          Hi, {name}
        </Text>
        <Text style={{ color: Colors.White, fontSize: 17.4, marginBottom: 12 }}>
          To make sure your experience with Yano is the best it can be, we need
          to get to know you a little better.
        </Text>
        <FilledButton
          type="blue"
          label="Continue"
          onPress={() => navigate(AuthScreen.MoreDetails)}
        />
      </View>
    </ImageBackground>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: 'Roboto',
  },
  overlay: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    gap: 8,
    padding: 18,
  },
});
