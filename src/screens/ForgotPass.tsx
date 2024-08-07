import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
} from 'react-native';
import React, { useState } from 'react';
import arrow from '../assets/image/arrow_back.png'

export default function ForgotPass({ navigation }) {
  const [email, setEmail] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.Navbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={arrow}
            style={{ height: 30, width: 30, paddingTop: 2 }}
          />
        </TouchableOpacity>
        <Text style={styles.navbarText}>Forgot Your Password?</Text>
      </View>

      <View style={styles.SecondContainer}>
        <Text style={styles.instructionsText}>
          {`Enter your email and we will send an email\nwith the instructions to reestablish your password.`}
        </Text>
        <View style={styles.inputField}>
          <Text style={{ color: '#00263E', fontWeight: 'bold' }}>Email</Text>
          <TextInput
            style={styles.inputBox}
            value={email}
            onChangeText={text => setEmail(text)}
            placeholder="john@gmail.com"
          />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('SecondForgotPassword')}
          style={[
            styles.submitButton,
            { backgroundColor: email ? '#00263E' : '#93a2ac' },
          ]}
          disabled={!email}>
          <Text style={styles.submitButtonText}>Send Instruction</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  Navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 10,
    marginBottom: 20,
  },
  navbarText: {
    color: '#00263E',
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 20,
  },
  SecondContainer: {
    paddingLeft: 18,
    backgroundColor: '#F5F5F5',
    alignItems: 'flex-start', // Changed to 'flex-start' to avoid center alignment
    paddingHorizontal: 20,
    flex: 1,
  },
  instructionsText: {
    color: '#3D5A6C',
    fontSize: 16,
    fontFamily: 'Roboto',
    marginTop: 20,
    marginBottom: 20,
  },
  inputField: {
    width: '100%',
    marginBottom: 15,
  },
  inputBox: {
    height: 50, // Increased height to 50
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 5,
    color: '#00263E',
  },
  submitButton: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    width: '100%', // Make the button span the full width of the container
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
