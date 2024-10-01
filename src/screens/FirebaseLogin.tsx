import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Button, Alert} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {AuthScreen} from '../navigation/auth/AuthScreens';

const FirebaseLogin = () => {
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    // Initialize Google Sign-In using your Web Client ID
    GoogleSignin.configure({
      webClientId:
        '27382433897-sol4o7a6ebn67t1vbad6udcgpra0jkj6.apps.googleusercontent.com',
    });
  }, []);

  const onGoogleButtonPress = async () => {
    try {
      // Check if your device supports Google Play services
      await GoogleSignin.hasPlayServices();

      // Get the user's ID token
      const userInfo = await GoogleSignin.signIn();

      console.log(userInfo);

      // Create a Google credential with the token
      //   const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign in the user with Firebase
      //   await auth().signInWithCredential(googleCredential);

      // Successfully signed in
      Alert.alert('Success', 'Signed in with Google!');
      navigation.replace(AuthScreen.Registration); // Navigate to Home screen on success
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Cancelled', 'Sign in was cancelled by the user.');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Error', 'Sign in is in progress.');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Error', 'Play services not available or outdated.');
      } else {
        Alert.alert('Error', 'Failed to sign in with Google. Try again.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Firebase Login with Google</Text>
      <Button title="Sign In with Google" onPress={onGoogleButtonPress} />
    </View>
  );
};

export default FirebaseLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});
