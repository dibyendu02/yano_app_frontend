import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ToastAndroid,
  Alert,
  Image,
} from 'react-native';
import {FormProvider, useForm, Controller} from 'react-hook-form';
import Header from '../../../../../components/header/Header';
import {Colors} from '../../../../../constants/Colors';
import FormInput from '../../../../../components/hook-form/FormInput';
import {FormInputType} from '../../../../../components/hook-form/types';
import FormDateInput from '../../../../../components/hook-form/FormDateInput';
import FormPhoneNumberInput from '../../../../../components/hook-form/FormPhoneNumberInput';
import FormImageInput from '../../../../../components/hook-form/FormImageInput';
import FormSelectionInput from '../../../../../components/hook-form/FormSelectionInput'; // Import FormSelectionInput for specialty
import Gender from './Gender';
import UserContext from '../../../../../contexts/UserContext';
import Modal from 'react-native-modal';
import {staticIcons} from '../../../../../assets/image';
import {CloseIcon} from '../../../../../assets/icon/IconNames';
import {updateDoctor} from '../../../../../api/PUT/auth';
import {useNavigation} from '@react-navigation/native';
import {retrieveData} from '../../../../../utils/Storage';
import moment from 'moment';

const DoctorSpecialties = [
  {id: 'Cardiologist', label: 'Cardiologist', enabled: true},
  {id: 'Dermatologist', label: 'Dermatologist', enabled: true},
  {id: 'Neurologist', label: 'Neurologist', enabled: true},
  {id: 'Pediatrician', label: 'Pediatrician', enabled: true},
  {id: 'General Surgeon', label: 'General Surgeon', enabled: true},
  {id: 'Orthopedic Surgeon', label: 'Orthopedic Surgeon', enabled: true},
  {id: 'Gynecologist', label: 'Gynecologist', enabled: true},
  {id: 'Ophthalmologist', label: 'Ophthalmologist', enabled: true},
  {id: 'Psychiatrist', label: 'Psychiatrist', enabled: true},
  {id: 'Radiologist', label: 'Radiologist', enabled: true},
  {id: 'Urologist', label: 'Urologist', enabled: true},
  {id: 'Endocrinologist', label: 'Endocrinologist', enabled: true},
];

const EditDoctorProfile: React.FC = ({route}) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [saved, setSaved] = useState(false);
  const {userData, login} = useContext(UserContext);
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const navigation = useNavigation();

  // Initial data including specialty
  const initialData = {
    userImg: userData?.userImg,
    firstName: userData?.firstName,
    lastName: userData?.lastName,
    email: userData?.email,
    phoneNumber: userData?.phoneNumber,
    dateOfBirth: userData?.dateOfBirth,
    gender: userData?.gender,
    specialty: userData?.speciality, // Set the default specialty from userData
  };

  const methods = useForm({
    mode: 'onChange',
    defaultValues: initialData,
  });

  useEffect(() => {
    const subscription = methods.watch(value => {
      const isFormChanged =
        JSON.stringify(value) !== JSON.stringify(initialData);
      setIsDisabled(!isFormChanged);
    });
    return () => subscription.unsubscribe();
  }, [methods.watch]);

  const showToast = message => {
    if (Platform.OS === 'android') {
      ToastAndroid.showWithGravity(
        message,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    } else {
      Alert.alert('Notification', message);
    }
  };

  const onSubmit = async data => {
    try {
      let requestData = new FormData();

      // Append image if updated
      if (data?.file) {
        requestData.append('file', {
          uri:
            Platform.OS === 'ios'
              ? `file:///${data?.file?.path}`
              : data?.file.path,
          type: data?.file?.mime,
          name: `${moment().format('YYYYMMDD_HHmmss')}.jpeg`,
        });
      }
      // Format the date to ISO string for MongoDB
      const formattedDOB = moment(data.dateOfBirth).toISOString();

      const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        gender: data.gender,
        dateOfBirth: formattedDOB, // Ensure the correct date format is passed
        speciality: data.specialty,
      };

      for (let key in payload) {
        requestData.append(key, payload[key]);
      }

      console.log('Request data:', requestData);

      const res = await updateDoctor({
        data: requestData,
        token,
        userId,
        type: 'media',
      });

      login(res?.userData);
      setSaved(true);

      setTimeout(() => setSaved(false), 2000);
      setTimeout(() => navigation.goBack(), 3000);
    } catch (error) {
      console.error('Error updating doctor:', error);
    }
  };

  const getUserData = async () => {
    const retrievedToken = await retrieveData('token');
    const retrievedUserId = await retrieveData('userId');
    setToken(retrievedToken);
    setUserId(retrievedUserId);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <View style={{flex: 1}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <View style={{flex: 1}}>
          <Header
            title="Edit Profile"
            headerRightComponent={
              <TouchableOpacity
                disabled={isDisabled}
                onPress={methods.handleSubmit(onSubmit)}>
                <Text
                  style={
                    isDisabled ? styles.loginButtonDisabled : styles.loginButton
                  }>
                  Save
                </Text>
              </TouchableOpacity>
            }
          />
          <View style={styles.body}>
            <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
              <FormProvider {...methods}>
                <FormImageInput
                  imageUri={initialData.userImg?.secure_url}
                  name="file"
                />
                <FormInput
                  name="firstName"
                  label="First Name"
                  rules={{
                    required: {
                      value: true,
                      message: 'Please enter your first name',
                    },
                  }}
                />
                <FormInput
                  name="lastName"
                  label="Last Name"
                  rules={{
                    required: {
                      value: true,
                      message: 'Please enter your last name',
                    },
                  }}
                />
                <FormInput
                  name="email"
                  label="Email"
                  type={FormInputType.Email}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  rules={{
                    required: {value: true, message: 'Please enter your email'},
                  }}
                />
                <FormPhoneNumberInput
                  name="phoneNumber"
                  label="Phone Number"
                  defaultValue={initialData.phoneNumber}
                  rules={{
                    required: {
                      value: true,
                      message: 'Please enter your phone number',
                    },
                  }}
                />
                <FormDateInput
                  name="dateOfBirth"
                  label="Date of Birth"
                  placeholder="Select a date"
                  placeholderTextColor={Colors.Grey}
                  rules={{
                    required: {
                      value: true,
                      message: 'Please select your date of birth',
                    },
                  }}
                />
                <Controller
                  name="gender"
                  control={methods.control}
                  defaultValue="Male"
                  render={({field: {onChange, value}}) => (
                    <Gender selectedRole={value} setSelectedRole={onChange} />
                  )}
                />
                {/* Specialty Selection */}
                <FormSelectionInput
                  name="specialty"
                  placeholder="Select your specialty"
                  label="Specialty"
                  options={DoctorSpecialties}
                  optionsListLabel="Select your specialty"
                  optionsListHeight={400}
                  selectedId={initialData.specialty} // Set the selected specialty
                  rules={{
                    required: {
                      value: true,
                      message: 'Please select your specialty',
                    },
                  }}
                />
              </FormProvider>
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
      <Modal
        isVisible={saved}
        onBackdropPress={() => setSaved(false)}
        swipeDirection="down"
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={0}
        animationInTiming={1000}
        animationOutTiming={3000}
        style={styles.modal}>
        <View style={styles.modalContent}>
          <Image source={staticIcons.checkcircle} style={styles.icon} />
          <Text style={styles.modalText}>The changes have been saved.</Text>
          <CloseIcon color="white" />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  loginButton: {
    borderWidth: 1,
    borderColor: Colors.Blue,
    backgroundColor: Colors.Blue,
    borderRadius: 8,
    color: Colors.White,
    fontWeight: 'bold',
    padding: 10,
    paddingHorizontal: 15,
  },
  loginButtonDisabled: {
    borderWidth: 1,
    borderColor: Colors.Grey,
    backgroundColor: Colors.Grey,
    borderRadius: 8,
    color: Colors.White,
    fontWeight: 'bold',
    padding: 10,
    paddingHorizontal: 15,
  },
  body: {
    flex: 1,
    backgroundColor: Colors.GhostWhite,
    paddingHorizontal: 14,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: Colors.Green,
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
    marginBottom: 20,
    marginLeft: 60,
  },
  modalText: {
    color: Colors.White,
    fontSize: 14,
    fontWeight: 'bold',
  },
  icon: {
    height: 20,
    width: 20,
    tintColor: 'white',
  },
});

export default EditDoctorProfile;
