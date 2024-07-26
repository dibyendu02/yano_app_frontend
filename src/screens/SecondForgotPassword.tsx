import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import arrow from '../assets/image/arrow_back.png';

export default function SecondForgotPassword({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.Navbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={arrow}
            style={{height: 30, width: 30, paddingTop: 2}}
          />
        </TouchableOpacity>
        <Text style={styles.navbarText}>Forgot Your Password?</Text>
      </View>

      <View style={styles.SecondContainer}>
        <Text style={styles.headingText}>The link is on the way</Text>
        <Text style={styles.descriptionText}>
          Soon you will receive an email with the link for password change.
        </Text>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.submitButtonText}>Back to Login</Text>
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
    flex: 1,
    padding: 15,
    backgroundColor: '#F5F5F5',
    alignItems: 'flex-start',
  },
  headingText: {
    color: '#00263E',
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  descriptionText: {
    marginTop: 5,
    color: '#3D5A6C',
    fontSize: 16,
    fontFamily: 'Roboto',
  },
  submitButton: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#00263E',
    marginTop: 30,
    width: '100%', // Make the button span the full width of the container
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
