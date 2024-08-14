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
import Welcome from '../../screens/auth/Welcome';
import MoreDetails from '../../screens/auth/MoreDetails';
import AuthChooseDevice from '../../screens/auth/AuthChooseDevice';
import AuthDeviceInfo from '../../screens/auth/AuthDeviceInfo';
import AuthDeviceConnected from '../../screens/auth/AuthDeviceConnected';
import AuthInstruction from '../../screens/auth/AuthInstruction';
import AuthAskDevice from '../../screens/auth/AuthAskDevice';
import FirstScreen from '../../screens/auth/FirstPage';

const Stack = createNativeStackNavigator<AuthStackParams>();

const authStackConfig: AuthStackConfig[] = [
  {name: 'FirstScreen', component: FirstScreen, options: {headerShown: false}},
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
    name: AuthScreen.Welcome,
    component: Welcome,
    options: {headerShown: false},
  },
  {
    name: AuthScreen.MoreDetails,
    component: MoreDetails,
    options: {headerShown: false},
  },
  {
    name: AuthScreen.ChooseDevice,
    component: AuthChooseDevice,
    options: {headerShown: false},
  },

  {
    name: AuthScreen.AskDevice,
    component: AuthAskDevice,
    options: {headerShown: false},
  },
  {
    name: AuthScreen.DeviceInfo,
    component: AuthDeviceInfo,
    options: {headerShown: false},
  },
  {
    name: AuthScreen.DeviceInstruction,
    component: AuthInstruction,
    options: {headerShown: false},
  },
  {
    name: AuthScreen.DeviceConnected,
    component: AuthDeviceConnected,
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
