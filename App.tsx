import React, {useEffect, useState} from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import AuthStack from './src/navigation/auth/AuthStack';
import MainStack from './src/navigation/main/MainStack';
import UserContext from './src/contexts/UserContext';
import {navigationRef} from './src/navigation/RootNavigation';
import {Colors} from './src/constants/Colors';
import {StatusBar} from 'react-native';
import Welcome from './src/screens/auth/Welcome';
import MoreDetails from './src/screens/auth/MoreDetails';
import Registration from './src/screens/auth/Registration';
import DeviceConnection from './src/screens/DeviceConnection';
import DeviceGetData from './src/screens/DeviceGetData';
import {removeDataByKey, retrieveData} from './src/utils/Storage';
import axios from 'axios';

export const BASE_URL = 'https://yano-backend.onrender.com';
// export const BASE_URL = 'http://192.168.29.167:5000';

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

  useEffect(() => {
    const initializeAuth = async () => {
      const authData = await retrieveData('isAuth');
      const typeData = await retrieveData('userType');
      const idData = await retrieveData('userId');

      setIsAuth(authData);
      setUserType(typeData);
      setUserId(idData);

      console.log('isAuth ', authData);
      console.log('userType ', typeData);
      console.log('userId ', idData);
    };

    initializeAuth();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          if (userType === 'patient') {
            const response = await axios.get(
              `${BASE_URL}/api/userpatient/${userId}`,
            );
            setUserData(response.data.userData);
            PatientLogin();
          } else if (userType === 'doctor') {
            const response = await axios.get(
              `${BASE_URL}/api/userdoctor/${userId}`,
            );
            setUserData(response.data.userData);
            ProviderLogin();
          }
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (isAuth) {
      fetchData();
    }
  }, [isAuth, userType, userId]);

  return (
    <NavigationContainer ref={navigationRef} theme={theme}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
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
    // <DeviceGetData />
  );
}
