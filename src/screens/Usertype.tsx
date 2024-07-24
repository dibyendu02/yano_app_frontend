import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import arrow from '../assets/image/arrow_back.png'
import patientLogo from '../assets/image/healthLogo.png'
import healthcare from '../assets/image/providerLogo.png'

export default function Usertype() {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSelection = (userType) => {
    setSelectedUser(userType);
  }

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity>
          <Image source={arrow} style={{width : 34, height : 34, marginLeft : 20, marginTop : 5}}/>
        </TouchableOpacity>
        <View style={{flexDirection : 'row'}}>
          <Text style={styles.text}>Already Register ?</Text>
          <TouchableOpacity>
            <Text style= {styles.loginButton}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.secondContainer}>
        <Text style={styles.headerText}>What type of user are you?</Text>

        <View style={styles.subContainer}>
          <TouchableOpacity onPress={() => handleSelection('patient')}>
            <View style={[styles.PatientDiv, selectedUser === 'patient' && styles.selected]}>
              <Image source={patientLogo}/>
              <Text style={{color : 'black', fontWeight : 'bold',paddingTop : 8}}>Patient</Text>
            </View>
          </TouchableOpacity>
       
          <TouchableOpacity onPress={() => handleSelection('healthcare')}>
            <View style={[styles.healthCare, selectedUser === 'healthcare' && styles.selected]}>
              <Image source={healthcare}/>
              <Text style={{color : 'black', fontWeight : 'bold',paddingTop : 8}}>{`Healthcare\n Provider`}</Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={[styles.ContinueButton, selectedUser ? styles.activeButton : styles.inactiveButton]} 
          disabled={!selectedUser}
        >
          <Text style={styles.buttonText2}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
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
    backgroundColor: 'light-gray',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 24,
    fontFamily: 'Roboto',
    marginBottom: 30,
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    
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
    width: 300,
    marginTop: 360,
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
})
