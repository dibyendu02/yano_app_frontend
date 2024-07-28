import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MonitoringPatientHold from '../../screens/MonitoringPatientHold';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MyProfile from '../../screens/MyProfile';
import Icons from '../../assets/icon/Icon';
import EmailNotFoundPatient from '../../screens/EmailNotFoundPatient';
import HealthConditionHomeScreen from '../../screens/healthCondition/HealthConditionHomeScreen';
import HealthConditionDetails from '../../screens/healthCondition/HealthConditionDetails';
import AddHealthRecord from '../../screens/healthCondition/AddHealthRecord';
import MedicalHistory from '../../screens/healthCondition/MedicalHistory';
import PatientMonitoringList from '../../screens/main/monitoring/patient-monitoring/PatientMonitoringList';
import AddPatient from '../../screens/main/add-patient/AddPatient';
import PatientMonitoringProfile from '../../screens/main/monitoring/patient-monitoring/PatientMonitoringProfile';
import HealthParametersList from '../../screens/main/monitoring/health-parameters/HealthParametersList';
import HealthParameterDetail from '../../screens/main/monitoring/health-parameters/HealthParameterDetail';

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
        name="PatientMonitoringProfile"
        component={PatientMonitoringProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MonitoringPatient"
        component={MonitoringPatientHold}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HealthParametersList"
        component={HealthParametersList}
        options={{headerShown: false}}
      />
      {/* HealthParameterDetail */}
      <Stack.Screen
        name="HealthParameterDetail"
        component={HealthParameterDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MedicalHistory"
        component={MedicalHistory}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HealthCondition"
        component={HealthConditionHomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HealthConditionDetails"
        component={HealthConditionDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddHealthCondition"
        component={AddHealthRecord}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
