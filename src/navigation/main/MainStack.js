import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

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

import BloodPressureScreen from '../../screens/main/my-profile/measurement-tools/BloodPressureScreen';
import BloodOxygenScreen from '../../screens/main/my-profile/measurement-tools/BloodOxygen';
import BloodGlucoseTest from '../../screens/main/monitoring/measurements/BloodGlucose/BloodGlucoseTest';
import BloodGlucoseTestTime from '../../screens/main/monitoring/measurements/BloodGlucose/BloodGlucoseTestTime';
import BloodGlucoseSelectStrip from '../../screens/main/monitoring/measurements/BloodGlucose/BloodGlucoseSelectStrip';
import BloodGlucoseReading from '../../screens/main/monitoring/measurements/BloodGlucose/BloodGlucoseReading';
import BloodGlucoseStep3 from '../../screens/main/monitoring/measurements/BloodGlucose/BloodGlucoseStep3';
import BloodGlucoseStep2 from '../../screens/main/monitoring/measurements/BloodGlucose/BloodGlucoseStep2';
import BloodGlucoseStep1 from '../../screens/main/monitoring/measurements/BloodGlucose/BloodGlucoseStep1';
import BloodGlucoseResult from '../../screens/main/monitoring/measurements/BloodGlucose/BloodGlucoseResult';
import HeartRateMeasurement from '../../screens/main/my-profile/measurement-tools/HearRateMeasurement';
import BodyTemperatureMeasurement from '../../screens/main/my-profile/measurement-tools/BodyTemperatureMeasurement';
import EcgMeasurement from '../../screens/main/my-profile/measurement-tools/EcgMeasurement';
import PatientVideoCall from '../../screens/main/video-call/PatientVideoCall';
import UserContext from '../../contexts/UserContext';
import UserFamilyMembers from '../../screens/main/user-screen/user-family/UserFamilyMembers';
import ViewFamilyMemberDetails from '../../screens/main/user-screen/user-family/ViewFamilyMemberDetails';
import AddUserFamilyMember from '../../screens/main/user-screen/user-family/AddUserFamilyMember';
import EditUserFamilyMember from '../../screens/main/user-screen/user-family/EditUserFamilyMember';
import LoadingAfterSave from '../../screens/main/user-screen/user-family/LoadingAfterSave';
import HeartRateModal from '../../screens/main/video-call/HeartRateModal';
import BloodPressureModal from '../../screens/main/video-call/BloodPressureModal';
import BloodOxygenModal from '../../screens/main/video-call/BloodOxygen';
import BodyTemperatureModal from '../../screens/main/video-call/BodyTemperature';
import ECGModal from '../../screens/main/video-call/ECGModal';
import GlucoseLevelModal from '../../screens/main/video-call/GlucoseLevelModal';

import DeleteAllData from '../../screens/main/my-profile/settings/DeleteAllData';
import { Colors } from '../../constants/Colors';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

const PatientTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#76bc21',
        tabBarInactiveTintColor: Colors.Grey,
      }}>
      <Tab.Screen
        name="MyHealth"
        component={MyHealthHomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icons.MaterialIcons
              name="monitor-heart"
              size={size}
              color={color}
            />
          ),
          tabBarLabel: 'My Health',
        }}
      />
      <Tab.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icons.FontAwesome5 name="user-circle" size={size} color={color} />
          ),
          tabBarLabel: 'My Profile',
        }}
      />
    </Tab.Navigator>
  );
};

const ProviderTabs = () => {
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
  const {isPatient} = useContext(UserContext);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="tabs"
        // component={ProviderTabs}
        component={isPatient ? PatientTabs : ProviderTabs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PatientVideoCall"
        component={PatientVideoCall}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HeartRateModal"
        component={HeartRateModal}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BloodPressureModal"
        component={BloodPressureModal}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BloodOxygenModal"
        component={BloodOxygenModal}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BodyTemperatureModal"
        component={BodyTemperatureModal}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GlucoseLevelModal"
        component={GlucoseLevelModal}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ECGModal"
        component={ECGModal}
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
      {/* Medical History screen Navigation start */}
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
      {/* allergies screen start */}
      <Stack.Screen
        name="Allergies"
        component={AllergiesHomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddAndEditAllergies"
        component={AddAndEditAllergy}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AllergyDetails"
        component={AllergyDetails}
        options={{headerShown: false}}
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
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddAndEditMedicine"
        component={AddAndEditMedicine}
        options={{headerShown: false}}
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
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddAndEditVaccine"
        component={AddAndEditVaccine}
        options={{headerShown: false}}
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
        name="BloodPressureScreen"
        component={BloodPressureScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="BloodOxygenMeasurement"
        component={BloodOxygenScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="HeartRateMeasurement"
        component={HeartRateMeasurement}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="BodyTemperatureMeasurement"
        component={BodyTemperatureMeasurement}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EcgMeasurement"
        component={EcgMeasurement}
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
        name="DeviceInfo"
        component={DeviceInfo}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="WhatToMeasure"
        component={WhatToMeasure}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DeviceConnected"
        component={DeviceConnected}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TurnOnDevice"
        component={TurnOnDevice}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MeasurementMonitoring"
        component={MeasurementMonitoring}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DeviceSettings"
        component={DeviceSettingsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DeviceInnerSettings"
        component={DeviceInnerSettings}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DeviceAndAccessories"
        component={DeviceAndAccessories}
        options={{
          headerShown: false,
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
        name="ManageYourData"
        component={ManageYourData}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DownloadData"
        component={DownloadData}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="DeleteAllData"
        component={DeleteAllData}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DeleteAccount"
        component={DeleteAccount}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Notifications"
        component={Notification}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MeasurementUnitSettings"
        component={MeasurementUnitSettings}
        options={{
          headerShown: false,
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
        options={{headerShown: false}}
      />
      {/* HealthParameterDetail */}
      <Stack.Screen
        name="HealthParameterDetail"
        component={HealthParameterDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HealthStats"
        component={HealthStats}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HealthThresholdHomeScreen"
        component={HealthThresholdHomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HeartRate"
        component={EditHeartRate}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BloodOxygen"
        component={BloodOxygen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BloodPressure"
        component={BloodPressure}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BodyTemperature"
        component={BodyTemperature}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GlucoseLevel"
        component={GlucoseLevel}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="NotificationAlerts"
        component={NotificationAlerts}
        options={{headerShown: false}}
      />
      {/* Remainders screen start*/}
      <Stack.Screen
        name="RemainderScreen"
        component={RemainderScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddRemainder"
        component={AddRemainder}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SetRepetition"
        component={SetRepetition}
        options={{headerShown: false}}
      />
      {/* Remainders screen end*/}

      {/* user section start */}
      {/* user Profile start */}
      <Stack.Screen
        name="Subscription"
        component={Subscription}
        options={{headerShown: false}}
      />
      {/* user Profile end */}
      {/* user section end */}

      {/* measurement screens  */}
      <Stack.Screen
        name="BloodGlucoseTest"
        component={BloodGlucoseTest}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BloodGlucoseTestTime"
        component={BloodGlucoseTestTime}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BloodGlucoseSelectStrip"
        component={BloodGlucoseSelectStrip}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BloodGlucoseStep1"
        component={BloodGlucoseStep1}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BloodGlucoseStep2"
        component={BloodGlucoseStep2}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BloodGlucoseStep3"
        component={BloodGlucoseStep3}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BloodGlucoseReading"
        component={BloodGlucoseReading}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BloodGlucoseResult"
        component={BloodGlucoseResult}
        options={{headerShown: false}}
      />
      {/* user family */}
      <Stack.Screen
        name="UserFamilyMembers"
        component={UserFamilyMembers}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UserFamilyMemberDetails"
        component={ViewFamilyMemberDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddUserFamilyMember"
        component={AddUserFamilyMember}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditFamilyMembers"
        component={EditUserFamilyMember}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FamilyMemberSaved"
        component={LoadingAfterSave}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
