import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React, {useState} from 'react';
import arrow from '../assets/image/arrow_back.png';

export default function Verification() {
  const [selectedMethod, setSelectedMethod] = useState(null);

  const toggleSelection = method => {
    setSelectedMethod(selectedMethod === method ? null : method);
  };

  return (
    <View style={styles.container}>
      <View style={styles.Navbar}>
        <TouchableOpacity>
          <Image
            source={arrow}
            style={{height: 30, width: 30, paddingTop: 2}}
          />
        </TouchableOpacity>
        <Text style={styles.navbarText}>Account Verification</Text>
      </View>

      <View style={styles.SecondContainer}>
        <Text style={styles.instructionText}>
          {`For your safety, we want to make sure you are\nreally you. Select a method to verify your\naccount.`}
        </Text>

        <View
          style={[
            styles.VerificationMethod,
            selectedMethod === 'email' && styles.selectedBorder,
          ]}>
          <TouchableOpacity
            onPress={() => toggleSelection('email')}
            style={styles.roundButton}>
            {selectedMethod === 'email' && <View style={styles.innerCircle} />}
          </TouchableOpacity>
          <View style={styles.verificationTextContainer}>
            <Text style={styles.verificationTitle}>Email Verification</Text>
            <Text style={styles.verificationDescription}>
              {`We will send you a 6-digit verification\ncode to maria.clemente@gmail.com`}
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.VerificationMethod,
            selectedMethod === 'phone' && styles.selectedBorder,
          ]}>
          <TouchableOpacity
            onPress={() => toggleSelection('phone')}
            style={styles.roundButton}>
            {selectedMethod === 'phone' && <View style={styles.innerCircle} />}
          </TouchableOpacity>
          <View style={styles.verificationTextContainer}>
            <Text style={styles.verificationTitle}>Phone Verification</Text>
            <Text style={styles.verificationDescription}>
              {`We will send you a 6-digit verification\ncode to +1-234-567-8901`}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.bottomView}>
        <TouchableOpacity
          style={[
            styles.sendCodeButton,
            {backgroundColor: selectedMethod ? '#00263E' : 'gray'},
          ]}
          disabled={!selectedMethod}>
          <Text style={styles.sendCodeButtonText}>Send Code</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: 'white',
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
    paddingBottom: 100, // To avoid overlap with bottom view
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
    borderColor: 'transparent', // Hide border by default
  },
  selectedBorder: {
    borderColor: '#76BC21',
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
  bottomView: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
  },
  sendCodeButton: {
    width: '100%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  sendCodeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
