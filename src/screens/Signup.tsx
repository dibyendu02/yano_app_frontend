import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import userpic from '../assets/image/User.png';
import {Dropdown} from 'react-native-element-dropdown';
import Icons from '../assets/icon/Icon';
import arrow from '../assets/image/arrow_back.png';

export default function Signup({navigation}) {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const genderOptions = [
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'},
  ];

  const isFormFilled = () => {
    return (
      name &&
      lastName &&
      email &&
      phoneNumber &&
      gender &&
      dateOfBirth &&
      speciality &&
      password &&
      repeatPassword
    );
  };

  const handleContinue = () => {
    if (password !== repeatPassword) {
      Alert.alert('Error', 'Passwords do not match');
    } else {
      // Handle form submission
      Alert.alert('Success', 'Form submitted');
      navigation.navigate('Verification');
    }
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

      <ScrollView
        style={styles.scrollViewContainer}
        contentContainerStyle={{alignItems: 'center'}}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Sign Up</Text>
          <Image source={userpic} style={styles.userPic} />
        </View>
        <View style={styles.inputField}>
          <Text style={{color: 'black', fontWeight: 'bold'}}>Name</Text>
          <TextInput
            style={styles.inputBox}
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={styles.inputField}>
          <Text style={{color: 'black', fontWeight: 'bold'}}>Last Name</Text>
          <TextInput
            style={styles.inputBox}
            value={lastName}
            onChangeText={setLastName}
          />
        </View>
        <View style={styles.inputField}>
          <Text style={{color: 'black', fontWeight: 'bold'}}>Email</Text>
          <TextInput
            style={styles.inputBox}
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputField}>
          <Text style={{color: 'black', fontWeight: 'bold'}}>Phone Number</Text>
          <TextInput
            style={styles.inputBox}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>
        <View style={styles.inputField}>
          <Text style={{color: 'black', fontWeight: 'bold'}}>Gender</Text>
          <Dropdown
            style={styles.dropdown}
            data={genderOptions}
            labelField="label"
            valueField="value"
            placeholder="Select Your Gender"
            value={gender}
            onChange={item => setGender(item.value)}
          />
        </View>
        <View style={styles.inputField}>
          <Text style={{color: 'black', fontWeight: 'bold'}}>
            Date of Birth
          </Text>
          <TextInput
            style={styles.inputBox}
            value={dateOfBirth}
            onChangeText={setDateOfBirth}
          />
        </View>
        <View style={styles.inputField}>
          <Text style={{color: 'black', fontWeight: 'bold'}}>Speciality</Text>
          <TextInput
            style={styles.inputBox}
            value={speciality}
            onChangeText={setSpeciality}
          />
        </View>
        <View style={styles.inputField}>
          <Text style={{color: 'black', fontWeight: 'bold'}}>Password</Text>
          <TextInput
            style={styles.inputBox}
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          <Text>Must be at least 8 characters</Text>
        </View>
        <View style={styles.inputField}>
          <Text style={{color: 'black', fontWeight: 'bold'}}>
            Repeat Password
          </Text>
          <TextInput
            style={styles.inputBox}
            secureTextEntry={true}
            value={repeatPassword}
            onChangeText={setRepeatPassword}
          />
        </View>
        <Text
          style={{
            color: 'black',
            fontSize: 15,
            textAlign: 'center',
          }}>{`When registering you are accepting our Terms and\nconditions and Privacy policies`}</Text>

        <TouchableOpacity
          style={[
            styles.continueButton,
            {
              backgroundColor: isFormFilled() ? '#00263E' : '#94A4AC',
              marginBottom: 20,
            },
          ]}
          disabled={!isFormFilled()}
          onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    paddingTop: 10,
    paddingRight: 15,
  },
  loginButton: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
    padding: 10,
    marginRight: 15,
  },
  scrollViewContainer: {
    width: '100%',
    backgroundColor: '#F5F5F5', // Light gray color
    // paddingVertical: ,
  },
  headerContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 20,
    // paddingHorizontal: 10,
    alignSelf: 'flex-start',
    // backgroundColor: 'red',
    marginLeft: 15,
  },
  headerText: {
    color: 'black',
    fontSize: 24,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    // marginLeft: 15,
    marginBottom: 10,
  },
  userPic: {
    width: 110,
    height: 110,
  },
  inputField: {
    width: '90%',
    marginBottom: 15,
  },
  inputBox: {
    height: 50,
    borderColor: '#E9E9E9',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 5,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 5,
  },
  continueButton: {
    marginTop: 20,
    padding: 15,
    borderRadius: 5,
    width: '90%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
