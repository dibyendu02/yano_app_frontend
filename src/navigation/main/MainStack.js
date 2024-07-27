/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MonitoringPatientHold from '../../screens/MonitoringPatientHold';
import PatientProfileWithoutparameter from '../../screens/PatientProfileWithoutparameter';
import MonitoringFilled from '../../screens/MonitoringFilled';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MyProfile from '../../screens/MyProfile';
import Icons from '../../assets/icon/Icon';
import EmailNotFoundPatient from '../../screens/EmailNotFoundPatient';
import PatientMonitoringList from '../../screens/main/monitoring/PatientMonitoringList';
import AddPatient from '../../screens/main/AddPatient/AddPatient';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#76bc21',
        tabBarInactiveTintColor: 'black',
      }}>
      <Tab.Screen
        name="Home"
        component={PatientMonitoringList}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icons.MaterialIcons
              name="health-and-safety"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={MyProfile}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icons.FontAwesome5 name="user-circle" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const MainStack = () => {
  return (
    <Stack.Navigator>
      {/* Tabs */}
      <Stack.Screen
        name="tabs"
        component={Tabs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddPatient"
        component={AddPatient}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EmailNotFoundPatient"
        component={EmailNotFoundPatient}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PatientProfile"
        component={PatientProfileWithoutparameter}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MonitoringPatient"
        component={MonitoringPatientHold}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
