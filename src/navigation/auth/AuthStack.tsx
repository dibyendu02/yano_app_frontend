import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../../screens/auth/Login';
import CodeVerification from '../../screens/CodeVerification';
import Verification from '../../screens/Verification';
import LoadingScreen from '../../screens/LoadingScreen';
import ForgotPass from '../../screens/ForgotPass';
import SecondForgotPassword from '../../screens/SecondForgotPassword';
import Landing from '../../screens/auth/Landing';
import {AuthStackConfig, AuthStackParams} from './types';
import {AuthScreen} from './AuthScreens';
import SelectUserType from '../../screens/auth/SelectUserType';
import Registration from '../../screens/auth/Registration';

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
    name: 'Verification',
    component: Verification,
    options: {headerShown: false},
  },
  {
    name: 'CodeVerification',
    component: CodeVerification,
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
