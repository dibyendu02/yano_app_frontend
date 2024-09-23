import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import {staticIcons} from '../assets/image';
import {Colors} from '../constants/Colors';
import Header from '../components/header/Header';

export default function ForgotPass({navigation}) {
  const [email, setEmail] = useState('');
  const [clicked, setClicked] = useState(false);

  return (
    <View style={styles.container}>
      <Header title="Forgot your password?" />

      {!clicked ? (
        <View style={styles.SecondContainer}>
          <Text style={styles.instructionsText}>
            {`Enter your Email and we will send an email with the instructions to reset your password.`}
          </Text>
          <View style={styles.inputField}>
            <Text style={{color: '#00263E', fontWeight: 'bold'}}>Email</Text>
            <TextInput
              style={styles.inputBox}
              value={email}
              onChangeText={text => setEmail(text)}
              // placeholder="john@gmail.com"
            />
          </View>
          <TouchableOpacity
            onPress={() => setClicked(true)}
            style={[
              styles.submitButton,
              {backgroundColor: email ? '#00263E' : '#93a2ac'},
            ]}
            disabled={!email}>
            <Text style={styles.submitButtonText}>Send instruction</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.SecondContainer}>
          <Text style={styles.headingText}>The link is on the way</Text>
          <Text style={styles.descriptionText}>
            You will soon receive an email with the link to change your
            password.
          </Text>
          <TouchableOpacity
            style={{
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
              width: '100%', // Make the button span the full width of the container
              marginTop: 20,
              backgroundColor: Colors.Blue,
            }}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.submitButtonText}>Back to login</Text>
          </TouchableOpacity>
        </View>
      )}
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
    marginTop: 20,
    marginLeft: 20,
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
    paddingTop: 12,
    backgroundColor: '#F5F5F5',
    alignItems: 'flex-start', // Changed to 'flex-start' to avoid center alignment
    paddingHorizontal: 20,
    flex: 1,
  },
  instructionsText: {
    color: '#3D5A6C',
    fontSize: 16,
    fontFamily: 'Roboto',
    // marginTop: 20,
    marginBottom: 20,
    width: '85%',
  },
  inputField: {
    width: '100%',
    marginBottom: 15,
  },
  inputBox: {
    height: 50, // Increased height to 50
    borderColor: Colors.LightGray,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 8,
    color: '#00263E',
    backgroundColor: Colors.White,
  },
  submitButton: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    width: '100%', // Make the button span the full width of the container
    marginTop: 5,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'medium',
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
    marginRight: 20,
  },
});
