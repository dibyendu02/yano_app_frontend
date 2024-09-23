'use strict';

import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, Linking, View} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import Icons from '../../../assets/icon/Icon';
import {Colors} from '../../../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import {navigate} from '../../../navigation/RootNavigation';
import {findPatientByEmail} from '../../../api/POST/addPatient';
import {retrieveData} from '../../../utils/Storage';

const PatientQRCode = () => {
  const navigation = useNavigation();

  const [token, setToken] = useState('');

  const getUserData = async () => {
    // const retrievedUserId = await retrieveData('userId');
    const retrievedToken = await retrieveData('token');
    // const retrievedUserType = await retrieveData('userType');

    // setUserId(retrievedUserId);
    setToken(retrievedToken);
    // setUserType(retrievedUserType);
  };

  useEffect(() => {
    getUserData();
  }, []);

  const onSuccess = async e => {
    console.log(e.data);
    try {
      const data = await findPatientByEmail({data: {email: e.data}, token});
      console.log(data);
      const userData = data?.userData;
      // Pass the userData to the next screen
      navigation.replace('AfterQR', {userData});
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Icons.AntDesign name="arrowleft" size={24} color={Colors.White} />
      </TouchableOpacity>

      {/* Instruction Text */}
      <View style={styles.instructionContainer}>
        <Text style={styles.instructionText}>
          Position your patient's QR code inside the rectangle to scan it.
        </Text>
      </View>

      {/* QR Code Scanner */}
      <QRCodeScanner
        onRead={onSuccess}
        flashMode={RNCamera.Constants.FlashMode.auto}
        containerStyle={styles.cameraContainer}
        cameraStyle={styles.camera}
        topViewStyle={styles.zeroContainer}
        bottomViewStyle={styles.zeroContainer}
        showMarker={true}
        markerStyle={styles.marker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  instructionContainer: {
    position: 'absolute',
    top: '25%',
    left: 0,
    right: 0,
    zIndex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  instructionText: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  marker: {
    borderColor: '#FFF',
    borderRadius: 10,
    borderWidth: 2,
    height: 250,
    width: 250,
    alignSelf: 'center',
  },
  zeroContainer: {
    height: 0,
    flex: 0,
  },
});

export default PatientQRCode;
