import {StyleSheet, Text, View, TouchableOpacity, Image,TextInput} from 'react-native';
import React from 'react';
import arrow from '../assets/image/arrow_back.png';
export default function CodeVerification() {
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
        <Text style={{color : 'black', fontSize : 16 , fontFamily : 'Roboto', marginTop : 20, marginBottom : 20}}>{`Please enter the 6-digit verification code that\nwas sent to 0412-6808909`}</Text>
        <View style={styles.inputField}>
          <Text style={{color : 'black',fontWeight : 'bold'}}>Verification Code</Text>
          <TextInput style={styles.inputBox} />
          <View style={{marginTop:  450 , justifyContent : 'center', alignItems : 'center'}}>
            <Text>Didn't you receive the text message?</Text>
            <TouchableOpacity>
                <Text style={{color :'#00263E',textDecorationLine :'underline'}}>{`Re-Send Code`}</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  SecondContainer : {
    paddingLeft : 10,
    backgroundColor : '#F5F5F5',
    alignItems : 'center'
  },
  inputField: {
    width: '90%',
    marginBottom: 15,
  },
  inputBox: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 5,
    
  },
});
