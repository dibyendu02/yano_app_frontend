import React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import AuthStack from './src/navigation/auth/AuthStack';
import {useState} from 'react';
import MainStack from './src/navigation/main/MainStack';
import UserContext from './src/contexts/UserContext';
import {navigationRef} from './src/navigation/RootNavigation';
import {Colors} from './src/constants/Colors';
import {StatusBar} from 'react-native';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //patient view

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
  };

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: Colors.White,
    },
  };

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
