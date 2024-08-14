import React, {useEffect} from 'react';
import {
  DefaultTheme,
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';
import AuthStack from './src/navigation/auth/AuthStack';
import {useState} from 'react';
import MainStack from './src/navigation/main/MainStack';
import UserContext from './src/contexts/UserContext';
import {navigationRef} from './src/navigation/RootNavigation';
import {Colors} from './src/constants/Colors';
import {StatusBar} from 'react-native';
import Welcome from './src/screens/auth/Welcome';
import MoreDetails from './src/screens/auth/MoreDetails';
import Registration from './src/screens/auth/Registration';
import {removeDataByKey, retrieveData} from './src/utils/Storage';
import {AuthScreen} from './src/navigation/auth/AuthScreens';

export const BASE_URL = 'https://yano-backend.onrender.com';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPatient, setIsPatient] = useState(false);

  const PatientLogin = () => {
    setIsPatient(true);
  };

  const ProviderLogin = () => {
    setIsPatient(false);
  };

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsPatient(false);

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

  // variables

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

  useEffect(() => {
    gettingAuth();
    gettingUserType();
    // if (isAuth) setIsLoggedIn(true);
    // if (userType == 'patient') setIsPatient(true);

    // if (isAuth && userType == 'patient') {
    //   PatientLogin();
    //   navigation.navigate(AuthScreen.LoadingScreen);
    // }
  }, []);

  useEffect(() => {
    if (isAuth && userType == 'patient') {
      setIsLoggedIn(true);
      setIsPatient(true);
    }
    if (isAuth && userType == 'doctor') {
      setIsLoggedIn(true);
      setIsPatient(false);
    }
  }, [isAuth, userType]);

  return (
    <NavigationContainer ref={navigationRef} theme={theme}>
      <StatusBar
        barStyle="dark-content" // You can use "dark-content" if you prefer dark text
        backgroundColor="white" // Set the background color you want
      />
      <UserContext.Provider
        value={{login, logout, ProviderLogin, PatientLogin, isPatient}}>
        {isLoggedIn ? <MainStack /> : <AuthStack />}
      </UserContext.Provider>
    </NavigationContainer>
  );
}
