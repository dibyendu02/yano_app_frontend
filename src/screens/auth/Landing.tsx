/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import FilledButton from '../../components/buttons/FilledButton';
import {LandingScreenProps} from '../../navigation/auth/types';
import {Colors} from '../../constants/Colors';
import {StaticImage} from '../../assets/images';
import {AuthScreen} from '../../navigation/auth/AuthScreens';

const Landing: React.FC<LandingScreenProps> = ({navigation}) => {
  return (
    <ImageBackground source={StaticImage.Landing} style={styles.container}>
      <SafeAreaView style={styles.contentContainer}>
        <Image source={StaticImage.Logo} />
        <View style={{width: '90%', paddingVertical: 20}}>
          <View style={{alignItems: 'center', marginBottom: 50}}>
            <Text style={styles.welcomeText}>Welcome</Text>
            <Text style={styles.messageText}>You are no longer alone.</Text>
          </View>

          <FilledButton
            type="white"
            label="Sign Up"
            onPress={() => navigation.navigate('Usertype')}
          />
          <FilledButton
            type="blue"
            label="Log in"
            onPress={() => navigation.navigate(AuthScreen.Login)}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Landing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeText: {
    color: Colors.White,
    fontSize: 40,
    fontWeight: 'semibold',
  },
  messageText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'semibold',
  },
});
