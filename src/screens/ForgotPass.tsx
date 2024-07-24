import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native';
import React, { useState } from 'react';
import arrow from '../assets/image/arrow_back.png';

export default function ForgotPass() {
  const [email, setEmail] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.Navbar}>
        <TouchableOpacity>
          <Image
            source={arrow}
            style={{ height: 30, width: 30, paddingTop: 2 }}
          />
        </TouchableOpacity>
        <Text style={styles.navbarText}>Forgot Your Password?</Text>
      </View>

      <View style={styles.SecondContainer}>
        <Text style={styles.instructionsText}>{`Enter your email and we will send an email\nwith the instructions to reestablish your password.`}</Text>
        <View style={styles.inputField}>
          <Text style={{ color: 'black', fontWeight: 'bold' }}>Email</Text>
          <TextInput
            style={styles.inputBox}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
      </View>
      <TouchableOpacity
        style={[styles.submitButton, { backgroundColor: email ? '#00263E' : 'gray' }]}
        disabled={!email}
      >
        <Text style={styles.submitButtonText}>Send Instruction</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  Navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 10,
    marginBottom: 20,
  },
  navbarText: {
    color: 'black',
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 20,
  },
  SecondContainer: {
    paddingLeft: 10,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
  },
  instructionsText: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Roboto',
    marginTop: 20,
    marginBottom: 20,
  },
  inputField: {
    width: '90%',
    marginBottom: 15,
  },
  inputBox: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 5,
  },
  submitButton: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 20,
    borderRadius: 5,
    marginTop : 410
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
