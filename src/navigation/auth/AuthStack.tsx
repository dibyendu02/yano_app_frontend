import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoadingScreen from '../../screens/LoadingScreen';
import ForgotPass from '../../screens/ForgotPass';
import SecondForgotPassword from '../../screens/SecondForgotPassword';
import Landing from '../../screens/auth/Landing';
import {AuthStackConfig, AuthStackParams} from './types';
import {AuthScreen} from './AuthScreens';
import SelectUserType from '../../screens/auth/SelectUserType';
import Registration from '../../screens/auth/Registration';
import Login from '../../screens/auth/Login';
import AccountVerification from '../../screens/auth/AccountVerification';

const Stack = createNativeStackNavigator<AuthStackParams>();

const authStackConfig: AuthStackConfig[] = [
  {name: AuthScreen.Landing, component: Landing, options: {headerShown: false}},
  {
    name: AuthScreen.SelectUserType,
    component: SelectUserType,
    options: {headerShown: false},
  },
  {name: AuthScreen.Login, component: Login, options: {headerShown: false}},
  {
    name: AuthScreen.Registration,
    component: Registration,
    options: {headerShown: false},
  },
  {
    name: AuthScreen.AccountVerification,
    component: AccountVerification,
    options: {headerShown: false},
  },
  {
    name: 'LoadingScreen',
    component: LoadingScreen,
    options: {headerShown: false},
  },
  {name: 'ForgotPass', component: ForgotPass, options: {headerShown: false}},
  {
    name: 'SecondForgotPassword',
    component: SecondForgotPassword,
    options: {headerShown: false},
  },
];

const AuthStack = () => {
  return (
    <Stack.Navigator>
      {authStackConfig.map(({name, component, options}, index) => (
        <Stack.Screen
          key={index}
          name={name}
          component={component}
          options={options}
        />
      ))}
    </Stack.Navigator>
  );
};

export default AuthStack;
