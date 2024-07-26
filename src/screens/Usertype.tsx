import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import arrow from '../assets/image/arrow_back.png';
import patientLogo from '../assets/image/healthLogo.png';
import healthcare from '../assets/image/providerLogo.png';
import Icons from '../assets/icon/Icon';

export default function Usertype({navigation}) {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSelection = userType => {
    setSelectedUser(userType);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          {/* <Icons.AntDesign name="arrowleft" size={30} color="black" /> */}
          <Image
            source={arrow}
            style={{height: 30, width: 30, paddingTop: 2}}
          />
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.text}>Already Register ?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginButton}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.secondContainer}>
        <Text style={styles.headerText}>What type of user are you?</Text>

        <View style={styles.subContainer}>
          <TouchableOpacity onPress={() => handleSelection('patient')}>
            <View
              style={[
                styles.PatientDiv,
                selectedUser === 'patient' && styles.selected,
              ]}>
              <Image source={patientLogo} />
              <Text style={{color: 'black', fontWeight: 'bold', paddingTop: 8}}>
                Patient
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleSelection('healthcare')}>
            <View
              style={[
                styles.healthCare,
                selectedUser === 'healthcare' && styles.selected,
              ]}>
              <Image source={healthcare} />
              <Text
                style={{
                  color: 'black',
                  fontWeight: 'bold',
                  paddingTop: 8,
                }}>
                {'Healthcare\n Provider'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          width: '100%',
          backgroundColor: 'white',
          paddingVertical: 10,
          height: '10%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          style={[
            styles.ContinueButton,
            selectedUser ? styles.activeButton : styles.inactiveButton,
          ]}
          disabled={!selectedUser}
          onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.buttonText2}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00263E',
    paddingTop: 10,
    paddingRight: 15,
  },
  loginButton: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    fontSize: 14,
    color: '#00263E',
    fontWeight: 'bold',
    padding: 10,
    marginRight: 15,
  },
  secondContainer: {
    backgroundColor: '#f5f5f5',
    flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  headerText: {
    color: '#00263E',
    fontWeight: 'bold',
    fontSize: 24,
    fontFamily: 'Roboto',
    marginBottom: 30,
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: '74%',
  },
  PatientDiv: {
    flexDirection: 'column',
    padding: 50,
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  healthCare: {
    flexDirection: 'column',
    padding: 50,
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected: {
    borderColor: 'green',
    borderWidth: 2,
  },
  ContinueButton: {
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '90%',
    // marginTop: 360,
    alignSelf: 'center',
  },
  inactiveButton: {
    backgroundColor: '#A9A9A9',
  },
  activeButton: {
    backgroundColor: '#00263E',
  },
  buttonText2: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
});
