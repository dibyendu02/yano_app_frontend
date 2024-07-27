import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './src/navigation/auth/AuthStack';
import {useState} from 'react';
import MainStack from './src/navigation/main/MainStack';
import UserContext from './src/contexts/UserContext';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <NavigationContainer>
      <UserContext.Provider value={{login, logout}}>
        {!isLoggedIn ? <MainStack /> : <AuthStack />}
      </UserContext.Provider>
    </NavigationContainer>
  );
}
