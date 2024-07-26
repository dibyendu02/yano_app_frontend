import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Start from '../screens/Start';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Usertype from '../screens/Usertype';
import CodeVerification from '../screens/CodeVerification';
import Verification from '../screens/Verification';
import LoadingScreen from '../screens/LoadingScreen';
import ForgotPass from '../screens/ForgotPass';
import SecondForgotPassword from '../screens/SecondForgotPassword';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Start"
        component={Start}
        options={{headerShown: false}}
      />
      {/* Usertype */}
      <Stack.Screen
        name="Usertype"
        component={Usertype}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{headerShown: false}}
      />
      {/* CodeVerification */}
      <Stack.Screen
        name="Verification"
        component={Verification}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CodeVerification"
        component={CodeVerification}
        options={{headerShown: false}}
      />
      {/* LoadingScreen */}
      <Stack.Screen
        name="LoadingScreen"
        component={LoadingScreen}
        options={{headerShown: false}}
      />
      {/* ForgotPass */}
      <Stack.Screen
        name="ForgotPass"
        component={ForgotPass}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SecondForgotPassword"
        component={SecondForgotPassword}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
