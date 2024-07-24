import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import picture1 from '../assets/image/singup.png';
import logo from '../assets/image/logo.png';
export default function Start() {

  return (
    <View style={styles.Container}>
      <View style={styles.SecondContainer}>
        <Image source={picture1} />
        <View style={styles.textContainer}>
          <Image source={logo} style={styles.logo}/>
          <View style={styles.WelcomeText}>
            <Text style={{color: 'white', fontSize : 36, fontWeight : 'semibold'}}>Welcome</Text>
            <Text style={{color: 'white', fontSize : 16, fontWeight : 'semibold'}}>You are no longer alone.</Text>
          </View>
            <TouchableOpacity style={styles.signUpButton} >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.LoginButton} >
              <Text style={styles.buttonText2}>Log in</Text>
            </TouchableOpacity>
          
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  SecondContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo : {
    marginBottom : 350
  },
  WelcomeText: {
    width: 172,
    height: 67,
    alignItems: 'center',
    marginBottom : 30
  },
  textContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  signUpButton: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
    width : 300,
    marginBottom : 15
  },
  buttonText: {
    color: '#00263E',
    fontSize: 16,
    fontFamily : 'Roboto',
    fontWeight : 'bold'
  },
  LoginButton : {
    backgroundColor: '#00263E',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
    width : 300,
    marginBottom : 10
  },
  buttonText2 :{
    color: 'white',
    fontSize: 16,
    fontFamily : 'Roboto',
    fontWeight : 'bold'
  }
});
