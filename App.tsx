import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Start from './src/screens/Start'
import Usertype from './src/screens/Usertype'
import Signup from './src/screens/Signup'
import Verification from './src/screens/Verification'
import CodeVerification from './src/screens/CodeVerification'
import ForgotPass from './src/screens/ForgotPass'
import ForgotPass2 from './src/screens/SecondForgotPassword'
import Login from './src/screens/Login'
import MonitoringFilled from './src/screens/MonitoringFilled'
import PatientProfileWithoutparameter from './src/screens/PatientProfileWithoutparameter'
import MonitoringPatientHold from './src/screens/MonitoringPatientHold'

export default function App() {
  return (
      // <Start></Start>
      // <Usertype/>
      // <Signup></Signup>
      // <Verification></Verification>
      // <CodeVerification></CodeVerification>
      // <ForgotPass></ForgotPass>
      // <ForgotPass2></ForgotPass2>
      // <Login></Login>
      // <MonitoringFilled></MonitoringFilled>
      // <PatientProfileWithoutparameter></PatientProfileWithoutparameter>
      <MonitoringPatientHold></MonitoringPatientHold>
       
    
  )
}

const styles = StyleSheet.create({})