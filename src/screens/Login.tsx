import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native';
import React, { useState } from 'react';
import googleIcon from '../assets/image/googleicon.png'
import facebookIcon from '../assets/image/fbIcon.png'; 
import AntDesign from 'react-native-vector-icons/AntDesign'
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity>
          {/* <Image source={arrow} style={{ width: 34, height: 34, marginLeft: 20, marginTop: 5 }} /> */}
          <AntDesign name="arrowleft" size={22} color={'black'}/>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.text}>Already Register ?</Text>
          <TouchableOpacity>
            <Text style={styles.loginButton}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.secondContainer}>
        <Text style={{ color: 'black', fontSize: 24, fontWeight: 'bold',marginBottom : 25 }}>Log in</Text>
        <View style={styles.inputField}>
          <Text style={{ color: 'black', fontWeight: 'bold' }}>Email</Text>
          <TextInput style={styles.inputBox} value={email} onChangeText={setEmail} />
        </View>
        <View style={styles.inputField}>
          <Text style={{ color: 'black', fontWeight: 'bold' }}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.inputBox, { flex: 1 }]}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={hidePassword}
            />
            {/* <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
              <Text style={styles.eyeIcon}>{hidePassword ? 'Show' : 'Hide'}</Text>
            </TouchableOpacity> */}
          </View>
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={{ color: 'black' }}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[styles.loginBtn, { backgroundColor: email && password ? '#00263E' : 'gray' }]}
          disabled={!email || !password}
        >
          <Text style={styles.loginBtnText}>Log in</Text>
        </TouchableOpacity>

        <Text style={{color : 'gray', fontSize : 15,alignSelf : 'center',marginBottom : 20}}>------------------------------or-------------------------------</Text>
        <TouchableOpacity style={styles.socialBtn}>
          <Image source={googleIcon} style={styles.socialIcon} />
          <Text style={styles.socialBtnText}>Log in with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialBtn}>
          <Image source={facebookIcon} style={styles.socialIcon} />
          <Text style={styles.socialBtnText}>Log in with Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20,
    marginLeft : 10,
    alignItems :'center'
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
  secondContainer: {
    backgroundColor: '#F5F5F5',
    padding: 10,
  },
  inputField: {
    marginBottom: 15,
  },
  inputBox: {
    height: 50,
    // borderColor: 'white',
    // borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 5,
    backgroundColor : 'white'
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeIcon: {
    padding: 10,
    color: 'blue',
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
    width : 339
  },
  loginBtnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 10,
    width : 339
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  socialBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color : 'black'
  },
});
