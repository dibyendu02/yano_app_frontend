import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import arrow from '../assets/image/arrow_back.png';
import {Colors} from '../constants/Colors';

export default function CodeVerification({navigation}) {
  const onChangeText = (e: string) => {
    if (e?.length === 6) {
      navigation.navigate('LoadingScreen');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.Navbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={arrow}
            style={{height: 30, width: 30, paddingTop: 2}}
          />
        </TouchableOpacity>
        <Text style={styles.navbarText}>Account Verification</Text>
      </View>

      <View style={styles.SecondContainer}>
        <Text style={styles.verificationText}>
          Please enter the 6-digit verification code that\nwas sent to{' '}
          <Text style={{fontWeight: 'bold'}}>0412-6808909</Text>
        </Text>
        <View style={styles.inputField}>
          <Text style={{color: 'black', fontWeight: 'bold'}}>
            Verification Code
          </Text>
          <TextInput style={styles.inputBox} onChangeText={onChangeText} />
        </View>
      </View>

      <View style={styles.bottomView}>
        <Text>Didn't you receive the text message?</Text>
        <TouchableOpacity>
          <Text style={styles.resendText}>{`Re-Send Code`}</Text>
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
    flexDirection: 'column',
    backgroundColor: '#F5F5F5',
    // alignItems: 'center',
    flex: 1,

    paddingHorizontal: 18,
  },
  verificationText: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Roboto',
    marginTop: 20,
    marginBottom: 20,
    // textAlign: 'start',
  },
  inputField: {
    width: '100%',
    marginBottom: 15,
  },
  inputBox: {
    height: 50,
    borderColor: '#E9E9E9',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 5,
    backgroundColor: 'white',
    color: Colors.Blue,
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
  resendText: {
    color: '#00263E',
    textDecorationLine: 'underline',
    marginTop: 5,
  },
});
