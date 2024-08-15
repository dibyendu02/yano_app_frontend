import React, {useEffect, useState} from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import AuthStack from './src/navigation/auth/AuthStack';
import MainStack from './src/navigation/main/MainStack';
import UserContext from './src/contexts/UserContext';
import {navigationRef} from './src/navigation/RootNavigation';
import {Colors} from './src/constants/Colors';
import {StatusBar} from 'react-native';
import {removeDataByKey, retrieveData} from './src/utils/Storage';
import axios from 'axios';

export const BASE_URL = 'https://yano-backend.onrender.com';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPatient, setIsPatient] = useState(false);
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState({}); // Initialize as an empty object

  const PatientLogin = () => {
    setIsPatient(true);
  };

  const ProviderLogin = () => {
    setIsPatient(false);
  };

  const login = data => {
    setUserData(data); // Update userData in context
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsPatient(false);
    setUserData({}); // Clear userData on logout

    removeDataByKey('token');
    removeDataByKey('userId');
    removeDataByKey('isAuth');
    removeDataByKey('userType');
  };

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: Colors.White,
    },
  };

  const [isAuth, setIsAuth] = useState(false);
  const [userType, setUserType] = useState('');

  const gettingAuth = async () => {
    const data = await retrieveData('isAuth');
    setIsAuth(data);
    console.log('isAuth ', isAuth);
  };

  const gettingUserType = async () => {
    const data = await retrieveData('userType');
    setUserType(data);
    console.log('userType ', userType);
  };

  const gettingUserId = async () => {
    const data = await retrieveData('userId');
    setUserId(data);
    console.log('userId ', userId);
  };

  useEffect(() => {
    gettingAuth();
    gettingUserType();
    gettingUserId();
  }, []);

  const fetchPatientData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}api/userpatient/${userId}`);
      setUserData(response.data.userData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDoctorData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}api/userdoctor/${userId}`);
      setUserData(response.data.userData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isAuth && userType === 'patient') {
      fetchPatientData();
      setIsLoggedIn(true);
      setIsPatient(true);
    } else if (isAuth && userType === 'doctor') {
      fetchDoctorData();
      setIsLoggedIn(true);
      setIsPatient(false);
    }
  }, [isAuth, userType]);

  return (
    <NavigationContainer ref={navigationRef} theme={theme}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <UserContext.Provider
        value={{
          login,
          logout,
          ProviderLogin,
          PatientLogin,
          isPatient,
          userData, // Make userData available globally
        }}>
        {isLoggedIn ? <MainStack /> : <AuthStack />}
      </UserContext.Provider>
    </NavigationContainer>
  );
}
