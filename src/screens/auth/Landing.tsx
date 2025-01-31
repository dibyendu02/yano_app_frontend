/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import FilledButton from '../../components/buttons/FilledButton';
import {LandingScreenProps} from '../../navigation/auth/types';
import {Colors} from '../../constants/Colors';
import {StaticImage} from '../../assets/images';
import {AuthScreen} from '../../navigation/auth/AuthScreens';
import {navigate} from '../../navigation/RootNavigation';

const Landing: React.FC<LandingScreenProps> = () => {
  const isFocused = useIsFocused();

  // useEffect(() => {
  //   if (Platform.OS === 'android') {
  //     if (isFocused) {
  //       StatusBar.setBarStyle('dark-content');
  //       StatusBar.setBackgroundColor('#a4d6eb');
  //     } else {
  //       StatusBar.setBarStyle('dark-content');
  //       StatusBar.setBackgroundColor('white');
  //     }
  //   }
  // }, [isFocused]);

  return (
    <ImageBackground source={StaticImage.Start} style={styles.container}>
      <View style={styles.contentContainer}>
        {/* <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Image
            source={StaticImage.Logo}
            style={{marginTop: 50, width: '55%', height: 88}}
          />
        </View> */}

        <View style={{width: '90%', paddingVertical: 0}}>
          <View style={{alignItems: 'center', marginBottom: 40}}>
            <Text style={styles.welcomeText}>Welcome</Text>
            <Text style={styles.messageText}>You are no longer alone.</Text>
          </View>

          <FilledButton
            type="white"
            label="Sign up"
            onPress={() => navigate(AuthScreen.SelectUserType)}
            style={{marginBottom: 12}}
          />
          <FilledButton
            type="blue"
            label="Log in"
            onPress={() => navigate(AuthScreen.Login)}
          />
        </View>
      </View>
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    bottom: Platform.OS === 'ios' ? 10 : 0,

  },
  welcomeText: {
    color: Colors.White,
    fontSize: 40,
    fontWeight: 'bold',
  },
  messageText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'semibold',
  },
});
