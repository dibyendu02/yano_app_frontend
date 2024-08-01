
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MonitoringPatientHold from '../../screens/MonitoringPatientHold';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import MyProfile from '../../screens/main/profile/MyProfile';
import Icons from '../../assets/icon/Icon';
import EmailNotFoundPatient from '../../screens/EmailNotFoundPatient';
import HealthConditionHomeScreen from '../../screens/healthCondition/HealthConditionHomeScreen';
import HealthConditionDetails from '../../screens/healthCondition/HealthConditionDetails';
import AddHealthRecord from '../../screens/healthCondition/AddHealthRecord';
import MedicalHistory from '../../screens/healthCondition/MedicalHistory';
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
import ConsultancyNotes from '../../screens/healthCondition/consultancyNotes/ConsultancyNotes';
import ConsultancyNotesDetails from '../../screens/healthCondition/consultancyNotes/ConsultancyNoteDetails';
import PatientMonitoringList from '../../screens/main/monitoring/patient-monitoring/PatientMonitoringList';
import PatientMonitoringProfile from '../../screens/main/monitoring/patient-monitoring/PatientMonitoringProfile';
import MyProfile from '../../screens/main/my-profile/MyProfile';
import MeasurementToolsHomeScreen from '../../screens/main/my-profile/measurement-tools/MeasurementToolsHomeScreen';
import ChooseDevice from '../../screens/main/my-profile/measurement-tools/ChooseDevice';
import SettingHomeScreen from '../../screens/main/my-profile/settings/SettingHomeScreen';
import SupportHomeScreen from '../../screens/main/my-profile/support/SupportHomeScreen';
import HealthParametersList from '../../screens/main/monitoring/health-parameters/HealthParametersList';
import HealthParameterDetail from '../../screens/main/monitoring/health-parameters/HealthParameterDetail';
import AddPatient from '../../screens/main/add-patient/AddPatient';
import HealthStats from '../../screens/main/monitoring/health-stats/HealthStats';
import DeviceInfo from '../../screens/main/my-profile/measurement-tools/DeviceInfo';
import WhatToMeasure from '../../screens/main/my-profile/measurement-tools/WhatToMeasure';
import TurnOnDevice from '../../screens/main/my-profile/measurement-tools/TurnOnDevice';
import DeviceConnected from '../../screens/main/my-profile/measurement-tools/DeviceConnected';
import MeasurementMonitoring from '../../screens/main/my-profile/measurement-tools/MeasurementMonitoring';
import DeviceSettingsScreen from '../../screens/main/my-profile/measurement-tools/DeviceSettings';
import DeviceInnerSettings from '../../screens/main/my-profile/measurement-tools/DeviceInnerSettings';
import DeviceAndAccessories from '../../screens/main/my-profile/measurement-tools/DeviceAndAcceories';
import ChangePassword from '../../screens/main/my-profile/settings/ChangePassword';
import ManageYourData from '../../screens/main/my-profile/settings/ManageYourData';
import DownloadData from '../../screens/main/my-profile/settings/DownloadData';
import DeleteAccount from '../../screens/main/my-profile/settings/DeleteAccount';
import Notification from '../../screens/main/my-profile/settings/Notification';
import MeasurementUnitSettings from '../../screens/main/my-profile/settings/MeasurementUnitSettings';
import HealthThresholdHomeScreen from '../../screens/main/monitoring/thresholds/HealthThresholdHomeScreen';
import EditHeartRate from '../../screens/main/monitoring/thresholds/EditHeartRate';
import BloodOxygen from '../../screens/main/monitoring/thresholds/BloodOxygen';
import BloodPressure from '../../screens/main/monitoring/thresholds/BloodPressure';
import BodyTemperature from '../../screens/main/monitoring/thresholds/BodyTemparature';
import GlucoseLevel from '../../screens/main/monitoring/thresholds/GlucoseLevel';
import NotificationAlerts from '../../screens/main/monitoring/notification/NotificationAlerts';
import RemainderScreen from '../../screens/main/monitoring/remainder/RemainderScreen';
import AddRemainder from '../../screens/main/monitoring/remainder/AddRemainder';
import SetRepetition from '../../screens/main/monitoring/remainder/SetRepetition';
import UserProfile from '../../screens/main/user-screen/user-profile/UserProfile';
import MyHealthHomeScreen from '../../screens/main/user-screen/user-health/MyHealthHomeScreen';
import Subscription from '../../screens/main/user-screen/user-health/Subscription';

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
      <Tab.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icons.FontAwesome5 name="user-circle" size={size} color={color} />
          ),
          tabBarLabel: 'My Profile'
        }}
      />
      <Tab.Screen
        name="MyHealth"
        component={MyHealthHomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icons.MaterialIcons name="monitor-heart" size={size} color={color} />
          ),
          tabBarLabel: 'My Health'
        }}
      />
    </Tab.Navigator>
  );
};

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName='userProfile' >
      <Stack.Screen
        name="tabs"
        component={Tabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddPatient"
        component={AddPatient}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EmailNotFoundPatient"
        component={EmailNotFoundPatient}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PatientMonitoringProfile"
        component={PatientMonitoringProfile}
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
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MedicineDetails"
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
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="VaccineDetails"
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
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SurgeriesDetails"
        component={SurgeriesDetails}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddAndEditSurgeries"
        component={AddAndEditSurgeries}
        options={{
          headerShown: false,
        }}
      />
      {/* Surgeries screen Navigation end */}
      {/* Family History screen Navigation start */}
      <Stack.Screen
        name="FamilyHistory"
        component={FamilyHistoryHomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FamilyHistoryDetails"
        component={FamilyHistoryDetails}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddAndEditFamilyHistory"
        component={AddAndEditFamilyHistory}
        options={{
          headerShown: false,
        }}
      />
      {/* Family History screen Navigation end */}
      {/* Basic Info screen Navigation start */}
      <Stack.Screen
        name={'BasicInformation'}
        component={BasicInfo}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'AddAndEditBasicInfo'}
        component={AddAndEditBasicInfo}
        options={{
          headerShown: false,
        }}
      />
      {/* Basic Info screen Navigation end */}
      {/* Hospitalization screen Navigation end */}
      <Stack.Screen
        name={'Hospitalization'}
        component={HospitalizationHomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'HospitalizationDetails'}
        component={HospitalizationDetails}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'AddAndEditHospitalization'}
        component={AddAndEditHospitalization}
        options={{
          headerShown: false,
        }}
      />
      {/* Hospitalization screen Navigation end */}
      {/* Social History screen Navigation start */}
      <Stack.Screen
        name={'SocialHistory'}
        component={SocialHistoryHomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'AddAndEditSocialHistory'}
        component={AddAndEditSocialHistory}
        options={{
          headerShown: false,
        }}
      />
      {/* Social History screen Navigation end */}
      {/* Consultation Notes screen Navigation start */}
      <Stack.Screen
        name="ConsultationNotes"
        component={ConsultancyNotes}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ConsultationNotesDetails"
        component={ConsultancyNotesDetails}
        options={{
          headerShown: false,
        }}
      />
      {/* Consultation Notes screen Navigation end */}

      {/* User profile section start */}
      <Stack.Screen
        name="MeasurementTools"
        component={MeasurementToolsHomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChooseDevice"
        component={ChooseDevice}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='DeviceInfo'
        component={DeviceInfo}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name='WhatToMeasure'
        component={WhatToMeasure}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name='DeviceConnected'
        component={DeviceConnected}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name='TurnOnDevice'
        component={TurnOnDevice}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name='MeasurementMonitoring'
        component={MeasurementMonitoring}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name='DeviceSettings'
        component={DeviceSettingsScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name='DeviceInnerSettings'
        component={DeviceInnerSettings}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name='DeviceAndAccessories'
        component={DeviceAndAccessories}
        options={{
          headerShown: false
        }}
      />

      {/* User profile section end */}

      {/* Settings section end */}
      <Stack.Screen
        name="Settings"
        component={SettingHomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='ManageYourData'
        component={ManageYourData}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name='DownloadData'
        component={DownloadData}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name='DeleteAccount'
        component={DeleteAccount}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name='ChangePassword'
        component={ChangePassword}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name='Notifications'
        component={Notification}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name='MeasurementUnitSettings'
        component={MeasurementUnitSettings}
        options={{
          headerShown: false
        }}
      />

      {/* Settings section end */}

      {/* Support  section start */}
      <Stack.Screen
        name="YanoSupport"
        component={SupportHomeScreen}
        options={{
          headerShown: false,
        }}
      />
      {/* Support section end */}

      {/* Medical History screen Navigation end */}
      <Stack.Screen
        name="HealthParametersList"
        component={HealthParametersList}
        options={{ headerShown: false }}
      />
      {/* HealthParameterDetail */}
      <Stack.Screen
        name="HealthParameterDetail"
        component={HealthParameterDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HealthStats"
        component={HealthStats}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HealthThresholdHomeScreen"
        component={HealthThresholdHomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HeartRate"
        component={EditHeartRate}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BloodOxygen"
        component={BloodOxygen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BloodPressure"
        component={BloodPressure}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BodyTemperature"
        component={BodyTemperature}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GlucoseLevel"
        component={GlucoseLevel}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="NotificationAlerts"
        component={NotificationAlerts}
        options={{ headerShown: false }}
      />
      {/* Remainders screen start*/}
      <Stack.Screen
        name="RemainderScreen"
        component={RemainderScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddRemainder"
        component={AddRemainder}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SetRepetition"
        component={SetRepetition}
        options={{ headerShown: false }}
      />
      {/* Remainders screen end*/}


      {/* user section start */}
      {/* user Profile start */}
      <Stack.Screen
        name="Subscription"
        component={Subscription}
        options={{ headerShown: false }}
      />
      {/* user Profile end */}
      {/* user section end */}
    </Stack.Navigator>
  );
};

export default MainStack;
