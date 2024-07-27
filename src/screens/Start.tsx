import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import picture1 from '../assets/image/singup.png';
import logo from '../assets/image/logo.png';
import PrimaryButton from '../components/buttons/PrimaryButton';
export default function Start({navigation}) {
  return (
    <View style={styles.Container}>
      <View style={styles.SecondContainer}>
        <Image source={picture1} style={{width: '100%', height: '100%'}} />
        <View style={styles.textContainer}>
          <Image source={logo} style={styles.logo} />

          <View style={{width: '100%', height: '20%'}}>
            <View style={styles.WelcomeText}>
              <Text
                style={{color: 'white', fontSize: 40, fontWeight: 'semibold'}}>
                Welcome
              </Text>
              <Text
                style={{color: 'white', fontSize: 18, fontWeight: 'semibold'}}>
                You are no longer alone.
              </Text>
            </View>
            <TouchableOpacity
              style={styles.signUpButton}
              onPress={() => navigation.navigate('Usertype')}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <PrimaryButton
              label="Log in"
              onPress={() => navigation.navigate('Login')}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  SecondContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    // marginBottom: 350,
  },
  WelcomeText: {
    // width: '70%',
    // height: 67,
    alignItems: 'center',
    marginBottom: 30,
  },
  textContainer: {
    bottom: '15%',
    width: '85%',
    height: '80%',
    position: 'absolute',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  signUpButton: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: 10,
    width: '100%',
    marginBottom: 15,
  },
  buttonText: {
    color: '#00263E',
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
});
