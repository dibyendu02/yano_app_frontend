import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './src/navigation/AuthStack';
import {useState} from 'react';
import MainStack from './src/navigation/MainStack';
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
        {isLoggedIn ? <MainStack /> : <AuthStack />}
      </UserContext.Provider>
    </NavigationContainer>
  );
}
