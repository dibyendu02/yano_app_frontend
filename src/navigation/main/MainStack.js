import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MonitoringPatientHold from '../../screens/MonitoringPatientHold';
import PatientProfileWithoutparameter from '../../screens/PatientProfileWithoutparameter';
import MonitoringFilled from '../../screens/MonitoringFilled';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyProfile from '../../screens/MyProfile';
import Icons from '../../assets/icon/Icon';
import EmailNotFoundPatient from '../../screens/EmailNotFoundPatient';
import HealthConditionHomeScreen from '../../screens/healthCondition/HealthConditionHomeScreen';
import HealthConditionDetails from '../../screens/healthCondition/HealthConditionDetails';
import AddHealthRecord from '../../screens/healthCondition/AddHealthRecord';
import MedicalHistory from '../../screens/healthCondition/MedicalHistory';
import PatientMonitoringList from '../../screens/main/monitoring/PatientMonitoringList';
import AddPatients from '../../screens/AddPatients';
import AllergiesHomeScreen from '../../screens/healthCondition/allergies/AllergiesHomeScreen';
import AddAndEditAllergy from '../../screens/healthCondition/allergies/AddAllergy';
import AllergyDetails from '../../screens/healthCondition/allergies/AllergyDetails';
import AddAndEditMedicine from '../../screens/healthCondition/medicine/AddAndEditMedicine';
import MedicineHomeScreen from '../../screens/healthCondition/medicine/MedicineHomeScreen';
import MedicineDetails from '../../screens/healthCondition/medicine/MedicineDetails';
import VaccinesHomeScreen from '../../screens/healthCondition/vaccination/VaccinesHomeScreen';
import VaccineDetails from '../../screens/healthCondition/vaccination/VaccineDetails';
import AddAndEditVaccine from '../../screens/healthCondition/vaccination/AddAndEditVaccine';
import SurgeriesHomeScreen from '../../screens/healthCondition/surgeries/SurgeriesHomeScreen';
import SurgeriesDetails from '../../screens/healthCondition/surgeries/SurgeriesDetails';
import AddAndEditSurgeries from '../../screens/healthCondition/surgeries/AddAndEditSurgeries';
import FamilyHistoryHomeScreen from '../../screens/healthCondition/FamilyHistory/FamilyHistoryHomeScreen';
import FamilyHistoryDetails from '../../screens/healthCondition/FamilyHistory/FamilyHistoryDetails';
import AddAndEditFamilyHistory from '../../screens/healthCondition/FamilyHistory/AddAndEditFamilyHistory';
import BasicInfo from '../../screens/healthCondition/basicInformation/BasicInfo';
import AddAndEditBasicInfo from '../../screens/healthCondition/basicInformation/AddAndEditBasicInfo';
import HospitalizationHomeScreen from '../../screens/healthCondition/hospitalization/HospitalizationHomeScreen';
import HospitalizationDetails from '../../screens/healthCondition/hospitalization/HospitalizationDetails';
import AddAndEditHospitalization from '../../screens/healthCondition/hospitalization/AdddAndEditHospitalization';
import SocialHistoryHomeScreen from '../../screens/healthCondition/socailHistory/SocialHistoryHomeScreen';
import AddAndEditSocialHistory from '../../screens/healthCondition/socailHistory/AddAndEditSocailHistory';

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
    <Stack.Navigator>
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
      {/* Medical History screen Navigation start */}
      <Stack.Screen
        name="MedicalHistory"
        component={MedicalHistory}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HealthCondition"
        component={HealthConditionHomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HealthConditionDetails"
        component={HealthConditionDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddHealthCondition"
        component={AddHealthRecord}
        options={{ headerShown: false }}
      />
      {/* allergies screen start */}
      <Stack.Screen
        name="Allergies"
        component={AllergiesHomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddAndEditAllergies"
        component={AddAndEditAllergy}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AllergyDetails"
        component={AllergyDetails}
        options={{ headerShown: false }}
      />
      {/* allergies screen end */}

      {/* Medical History screen Navigation start */}
      <Stack.Screen
        name="Medicine"
        component={MedicineHomeScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name='MedicineDetails'
        component={MedicineDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddAndEditMedicine"
        component={AddAndEditMedicine}
        options={{ headerShown: false }}
      />
      {/* Medical History screen Navigation end */}

      {/* Vaccines screen Navigation start */}
      <Stack.Screen
        name="Vaccines"
        component={VaccinesHomeScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name='VaccineDetails'
        component={VaccineDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddAndEditVaccine"
        component={AddAndEditVaccine}
        options={{ headerShown: false }}
      />
      {/* Vaccines screen Navigation end */}

      {/* Surgeries screen Navigation start */}
      <Stack.Screen
        name="Surgeries"
        component={SurgeriesHomeScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="SurgeriesDetails"
        component={SurgeriesDetails}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="AddAndEditSurgeries"
        component={AddAndEditSurgeries}
        options={{
          headerShown: false
        }}
      />
      {/* Surgeries screen Navigation end */}
      {/* Family History screen Navigation start */}
      <Stack.Screen
        name="FamilyHistory"
        component={FamilyHistoryHomeScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="FamilyHistoryDetails"
        component={FamilyHistoryDetails}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="AddAndEditFamilyHistory"
        component={AddAndEditFamilyHistory}
        options={{
          headerShown: false
        }}
      />
      {/* Family History screen Navigation end */}
      {/* Basic Info screen Navigation start */}
      <Stack.Screen
        name={"BasicInformation"}
        component={BasicInfo}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name={"AddAndEditBasicInfo"}
        component={AddAndEditBasicInfo}
        options={{
          headerShown: false
        }}
      />
      {/* Basic Info screen Navigation end */}
      {/* Hospitalization screen Navigation end */}
      <Stack.Screen
        name={"Hospitalization"}
        component={HospitalizationHomeScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name={"HospitalizationDetails"}
        component={HospitalizationDetails}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name={"AddAndEditHospitalization"}
        component={AddAndEditHospitalization}
        options={{
          headerShown: false
        }}
      />
      {/* Hospitalization screen Navigation end */}
      {/* Social History screen Navigation start */}
      <Stack.Screen
        name={"SocialHistory"}
        component={SocialHistoryHomeScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name={"AddAndEditSocialHistory"}
        component={AddAndEditSocialHistory}
        options={{
          headerShown: false
        }}
      />
      {/* Social History screen Navigation end */}


      {/* Medical History screen Navigation end */}
    </Stack.Navigator>
  );
};

export default MainStack;
