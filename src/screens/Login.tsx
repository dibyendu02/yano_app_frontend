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
import googleIcon from '../assets/image/googleicon.png';
import facebookIcon from '../assets/image/fbIcon.png';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Colors} from '../constants/Colors';
import {navigate} from '../navigation/RootNavigation';
import {AuthScreen} from '../navigation/auth/AuthScreens';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={30} color={'#00263E'} />
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.text}>Not Registered?</Text>
          <TouchableOpacity onPress={() => navigate(AuthScreen.Registration)}>
            <Text style={styles.loginButton}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.secondContainer}>
        <Text style={styles.headerText}>Log in</Text>
        <View style={styles.inputField}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.inputBox}
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputField}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.inputBox, {flex: 1}]}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={hidePassword}
            />
          </View>
          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={() => navigation.navigate('ForgotPass')}>
            <Text style={{color: '#00263E'}}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[
            styles.loginBtn,
            {backgroundColor: email && password ? '#00263E' : 'gray'},
          ]}
          onPress={() => navigation.navigate('LoadingScreen')}
          // disabled={!email || !password}
        >
          <Text style={styles.loginBtnText}>Log in</Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 40,
          }}>
          <View style={{width: '45%', height: 2, backgroundColor: '#E9E9E9'}} />
          <Text>or</Text>
          <View style={{width: '45%', height: 2, backgroundColor: '#E9E9E9'}} />
        </View>
        <TouchableOpacity style={styles.socialBtn}>
          <Image source={googleIcon} style={styles.socialIcon} />
          <Text style={styles.socialBtnText}>Log in with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialBtn}>
          <Image source={facebookIcon} style={styles.socialIcon} />
          <Text style={styles.socialBtnText}>Log in with Facebook</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 10,
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
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
    // alignItems: 'center',
  },
  headerText: {
    color: '#00263E',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 25,
  },
  inputField: {
    marginBottom: 15,
    width: '100%',
  },
  label: {
    color: '#00263E',
    fontWeight: 'bold',
  },
  inputBox: {
    height: 50,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 5,
    backgroundColor: 'white',
    borderColor: '#E9E9E9',
    borderWidth: 1,
    width: '100%',
    color: Colors.Blue,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  forgotPassword: {
    alignItems: 'flex-end',
    marginTop: 5,
  },
  loginBtn: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 5,
    width: '100%',
  },
  loginBtnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orText: {
    color: 'gray',
    fontSize: 15,
    alignSelf: 'center',
    marginBottom: 20,
  },
  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderWidth: 1,
    borderColor: '#E9E9E9',
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
    backgroundColor: 'white',
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  socialBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});
