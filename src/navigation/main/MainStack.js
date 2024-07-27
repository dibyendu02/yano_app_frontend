
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MonitoringPatientHold from '../../screens/MonitoringPatientHold';
import PatientProfileWithoutparameter from '../../screens/PatientProfileWithoutparameter';
import MonitoringFilled from '../../screens/MonitoringFilled';


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyProfile from '../../screens/MyProfile';
import AddPatients from '../../screens/AddPatients';
import Icons from '../../assets/icon/Icon';
import EmailNotFoundPatient from '../../screens/EmailNotFoundPatient'; 
import HealthConditionHomeScreen from '../../screens/healthCondition/HealthConditionHomeScreen';
import HealthConditionDetails from '../../screens/healthCondition/HealthConditionDetails';
import AddHealthRecord from '../../screens/healthCondition/AddHealthRecord';
import MedicalHistory from '../../screens/healthCondition/MedicalHistory';

import EmailNotFoundPatient from '../../screens/EmailNotFoundPatient';
import PatientMonitoringList from '../../screens/main/monitoring/PatientMonitoringList';


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

        name="Monitor"
        component={MonitoringFilled}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (

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

          tabBarIcon: ({ color, size }) => (

            <Icons.FontAwesome5 name="user-circle" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const MainStack = () => {
  return (

    <Stack.Navigator >

      {/* Tabs */}
      <Stack.Screen
        name="tabs"
        component={Tabs}

        options={{ headerShown: false }}
      />
      {/* AddPatients */}
      <Stack.Screen
        name="AddPatients"
        component={AddPatients}
        options={{ headerShown: false }}

      />
      <Stack.Screen
        name="EmailNotFoundPatient"
        component={EmailNotFoundPatient}

        options={{ headerShown: false }}
      />
      {/* MonitoringFilled */}
      {/* <Stack.Screen
        name="MonitoringFilled"
        component={MonitoringFilled}
        options={{headerShown: false}}
      /> */}
      {/* PatientProfileWithoutparameter */}
      <Stack.Screen
        name="PatientProfile"
        component={PatientProfileWithoutparameter}
        options={{ headerShown: false }}

      />
      <Stack.Screen
        name="MonitoringPatient"
        component={MonitoringPatientHold}
        options={{ headerShown: false }}
      />
      {/* Health Condition screen Navigation start */}
      <Stack.Screen
        name='MedicalHistory'
        component={MedicalHistory}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='HealthCondition'
        component={HealthConditionHomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='HealthConditionDetails'
        component={HealthConditionDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='AddHealthCondition'
        component={AddHealthRecord}
        options={{ headerShown: false }}
      />
      {/* Health Condition screen Navigation end */}

    </Stack.Navigator>
  );
};

export default MainStack;
