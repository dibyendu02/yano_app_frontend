import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useState } from 'react';
import arrow from '../assets/image/arrow_back.png';

export default function Verification() {
  const [isEmailSelected, setIsEmailSelected] = useState(false);
  const [isPhoneSelected, setIsPhoneSelected] = useState(false);

  const toggleEmailSelection = () => {
    setIsEmailSelected(!isEmailSelected);
  };

  const togglePhoneSelection = () => {
    setIsPhoneSelected(!isPhoneSelected);
  };

  return (
    <View style={styles.container}>
      <View style={styles.Navbar}>
        <TouchableOpacity>
          <Image source={arrow} style={{ height: 30, width: 30, paddingTop: 2 }} />
        </TouchableOpacity>
        <Text style={styles.navbarText}>
          Account Verification
        </Text>
      </View>

      <View style={styles.SecondContainer}>
        <Text style={styles.instructionText}>
          {`For your safety, we want to make sure you are\nreally you. Select a method to verify your\naccount.`}
        </Text>

        <View style={[styles.VerificationMethod, isEmailSelected && styles.selectedBorder]}>
          <TouchableOpacity onPress={toggleEmailSelection} style={styles.roundButton}>
            {isEmailSelected && <View style={styles.innerCircle} />}
          </TouchableOpacity>
          <View style={styles.verificationTextContainer}>
            <Text style={styles.verificationTitle}>Email Verification</Text>
            <Text style={styles.verificationDescription}>
              {`We will send you a 6-digit verification\ncode to maria.clemente@gmail.com`}
            </Text>
          </View>
        </View>

        <View style={[styles.VerificationMethod, isPhoneSelected && styles.selectedBorder]}>
          <TouchableOpacity onPress={togglePhoneSelection} style={styles.roundButton}>
            {isPhoneSelected && <View style={styles.innerCircle} />}
          </TouchableOpacity>
          <View style={styles.verificationTextContainer}>
            <Text style={styles.verificationTitle}>Phone Verification</Text>
            <Text style={styles.verificationDescription}>
              {`We will send you a 6-digit verification\ncode to +1-234-567-8901`}
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.sendCodeButton} disabled={!isEmailSelected && !isPhoneSelected}>
          <Text style={styles.sendCodeButtonText}>Send Code</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
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
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 10,
  },
  instructionText: {
    color: 'black',
    fontSize: 16,
  },
  VerificationMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 25,
    marginTop: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'gray',
    backgroundColor: 'white',
  },
  selectedBorder: {
    borderColor: 'green',
  },
  roundButton: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  innerCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: 'green',
  },
  verificationTextContainer: {
    flex: 1,
  },
  verificationTitle: {
    fontWeight: 'bold',
    color: 'black',
  },
  verificationDescription: {
    color: 'gray',
  },
  sendCodeButton: {
    backgroundColor: '#00263E',
    padding: 20,
    borderRadius: 10,
    marginTop: 250,
    alignItems: 'center',
    // opacity: 0.5,
  },
  sendCodeButtonEnabled: {
    
  },
  sendCodeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
