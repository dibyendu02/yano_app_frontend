/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React from 'react';
import Header from '../../components/header/Header';
import {navigate} from '../../navigation/RootNavigation';
import {Colors} from '../../constants/Colors';
import {AuthScreen} from '../../navigation/auth/AuthScreens';
import {FormProvider, useForm} from 'react-hook-form';
import FormInput from '../../components/hook-form/FormInput';
import {FormInputType} from '../../components/hook-form/types';
import FormDateInput from '../../components/hook-form/FormDateInput';
import FormSelectionInput from '../../components/hook-form/FormSelectionInput';
import FilledButton from '../../components/buttons/FilledButton';
import FormPhoneNumberInput from '../../components/hook-form/FormPhoneNumberInput';
import FormImageInput from '../../components/hook-form/FormImageInput';
import {AuthScreensProps} from '../../navigation/auth/types';
import {UserType} from '../../constants/enums';
import moment from 'moment';
import {registerDoctor, registerPatient} from '../../services/Endpoints';

const Gender = [
  {
    id: 'Male',
    label: 'Male',
    enabled: true,
  },
  {
    id: 'Female',
    label: 'Female',
    enabled: true,
  },
];

const DoctorSpecialties = [
  {
    id: 'Cardiologist',
    label: 'Cardiologist',
    enabled: true,
  },
  {
    id: 'Dermatologist',
    label: 'Dermatologist',
    enabled: true,
  },
  {
    id: 'Neurologist',
    label: 'Neurologist',
    enabled: true,
  },
  {
    id: 'Pediatrician',
    label: 'Pediatrician',
    enabled: true,
  },
  {
    id: 'GeneralSurgeon',
    label: 'General Surgeon',
    enabled: true,
  },
  {
    id: 'OrthopedicSurgeon',
    label: 'Orthopedic Surgeon',
    enabled: true,
  },
  {
    id: 'Gynecologist',
    label: 'Gynecologist',
    enabled: true,
  },
  {
    id: 'Ophthalmologist',
    label: 'Ophthalmologist',
    enabled: true,
  },
  {
    id: 'Psychiatrist',
    label: 'Psychiatrist',
    enabled: true,
  },
  {
    id: 'Radiologist',
    label: 'Radiologist',
    enabled: true,
  },
  {
    id: 'Urologist',
    label: 'Urologist',
    enabled: true,
  },
  {
    id: 'Endocrinologist',
    label: 'Endocrinologist',
    enabled: true,
  },
];

const Registration: React.FC<AuthScreensProps> = ({route}) => {
  //@ts-ignore
  const userType = route?.params?.userType;

  console.log(userType);

  const {...methods} = useForm({
    mode: 'onChange',
  });
  const onSubmit = async (data: any) => {
    let requestData = new FormData();
    if (data?.file) {
      requestData.append('image', {
        uri:
          Platform.OS === 'ios'
            ? `file:///${data?.file?.path}`
            : data?.file.path,
        type: data?.file?.mime,
        name: `${moment()}.jpeg`,
      });
    }

    let payload: any = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      gender: '',
      dateOfBirth: '',
      password: '',
      specialty: '',
    };
    for (let key in payload) {
      requestData.append(key, data[key]);
    }
    if (userType === UserType.Patient) {
      registerPatient(requestData)
        .then(res => {
          console.log(res, '<--------->');
        })
        .catch(e => console.log('Error!', e?.response?.data?.message));
    } else {
      registerDoctor(requestData)
        .then(res => {
          console.log(res, '<--------->');
        })
        .catch(e => console.log('Error!', e?.response?.data?.message));
    }
    navigate(AuthScreen.AccountVerification);
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <View style={{flex: 1}}>
          <Header
            title=""
            headerRightComponent={
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.text}>Already registered?</Text>
                <TouchableOpacity onPress={() => navigate(AuthScreen.Login)}>
                  <Text style={styles.loginButton}>Log in</Text>
                </TouchableOpacity>
              </View>
            }
          />
          <View style={styles.body}>
            <Text
              style={{
                color: Colors.Blue,
                fontWeight: 'bold',
                fontSize: 24,
                marginTop: 10,
              }}>
              Sign up
            </Text>
            <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
              <FormProvider {...methods}>
                <FormImageInput name="file" />
                <FormInput
                  name="firstName"
                  label="Name"
                  // placeholder="Enter your first name"
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
                  // placeholder="Enter your last name"
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
                  // placeholder="Enter your email"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  rules={{
                    required: {
                      value: true,
                      message: 'Please enter your email',
                    },
                  }}
                />
                <FormPhoneNumberInput
                  name="phoneNumber"
                  label="Phone number"
                  rules={{
                    required: {
                      value: true,
                      message: 'Please enter your phone number',
                    },
                  }}
                />
                <FormSelectionInput
                  name="gender"
                  placeholder="Select your gender"
                  options={Gender}
                  label="Gender"
                  optionsListLabel="Select your gender"
                  optionsListHeight={200}
                  rules={{
                    required: {
                      value: true,
                      message: 'Please select your gender',
                    },
                  }}
                />
                <FormDateInput
                  name="dateOfBirth"
                  label="Date of birth"
                  placeholder="Select a date"
                  placeholderTextColor={Colors.Grey}
                  rules={{
                    required: {
                      value: true,
                      message: 'Please select your DOB',
                    },
                  }}
                />
                {userType === UserType.Doctor && (
                  <FormSelectionInput
                    name="specialty"
                    placeholder="Select your specialty"
                    label="Specialty"
                    options={DoctorSpecialties}
                    optionsListLabel="Select your specialty"
                    optionsListHeight={400}
                    rules={{
                      required: {
                        value: true,
                        message: 'Please select your specialty',
                      },
                    }}
                  />
                )}
                <FormInput
                  name="password"
                  label="Password"
                  instruction="Must be at least 8 characters"
                  type={FormInputType.Password}
                  // placeholder="Enter your password"
                  rules={{
                    required: {
                      value: true,
                      message: 'Password is required',
                    },
                  }}
                />
                <FormInput
                  name="repeatPassword"
                  label="Repeat Password"
                  type={FormInputType.Password}
                  // placeholder="Confirm password"
                  rules={{
                    validate: value => {
                      if (value !== methods.getValues('password')) {
                        return "Password doesn't match";
                      }
                      return true;
                    },
                  }}
                />
              </FormProvider>
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
      <Text
        style={{
          width: '92%',
          marginHorizontal: 'auto',
          textAlign: 'center',
          paddingTop: 10,
          color: '#3D5A6C',
        }}>
        When registering you are accepting our{' '}
        <Text style={{color: Colors.Blue, textDecorationLine: 'underline'}}>
          Terms and conditions
        </Text>{' '}
        and
        <Text style={{color: Colors.Blue, textDecorationLine: 'underline'}}>
          {' '}
          Privacy policies
        </Text>
      </Text>
      <FilledButton
        label="Continue"
        type="blue"
        style={{width: '92%', alignSelf: 'center', marginVertical: 10}}
        // disabled={!methods.formState.isDirty}
        // onPress={methods.handleSubmit(onSubmit)}
        onPress={() =>
          navigate(AuthScreen.AccountVerification, {userType: userType})
        }
      />
    </SafeAreaView>
  );
};

export default Registration;

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: Colors.Blue,
    marginRight: 8,
  },
  loginButton: {
    borderWidth: 1,
    borderColor: Colors.Black,
    borderRadius: 8,
    color: Colors.Blue,
    fontWeight: 'bold',
    padding: 10,
    paddingHorizontal: 15,
  },
  body: {
    flex: 1,
    backgroundColor: Colors.GhostWhite,
    paddingHorizontal: 14,
  },
});
