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

const Registration = () => {
  const {...methods} = useForm({mode: 'onBlur'});
  const onSubmit = (data: any) => {
    console.log(data);
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
                <Text style={styles.text}>Already Registered?</Text>
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
                <FormImageInput name="profileImage" />
                <FormInput
                  name="firstName"
                  label="First Name"
                  placeholder="Enter your first name"
                />
                <FormInput
                  name="lastName"
                  label="Last Name"
                  placeholder="Enter your last name"
                />
                <FormInput
                  name="email"
                  label="Email"
                  type={FormInputType.Email}
                  placeholder="Enter your email"
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
                <FormPhoneNumberInput name="phone" label="Phone number" />
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
                  name="dob"
                  label="Date of birth"
                  placeholder="Select your DOB"
                />
                <FormSelectionInput
                  name="specialty"
                  placeholder="Select your specialty"
                  label="Specialty"
                  options={DoctorSpecialties}
                  optionsListLabel="Select your specialty"
                  optionsListHeight={400}
                />
                <FormInput
                  name="password"
                  label="Password"
                  type={FormInputType.Password}
                  placeholder="Enter your password"
                />
                <FormInput
                  name="repeatPassword"
                  label="Repeat Password"
                  type={FormInputType.Password}
                  placeholder="Confirm password"
                />
              </FormProvider>
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
      <FilledButton
        label="Continue"
        type="blue"
        style={{width: '90%', alignSelf: 'center', marginVertical: 10}}
        disabled={!methods.formState.isValid}
        onPress={methods.handleSubmit(onSubmit)}
      />
    </SafeAreaView>
  );
};

export default Registration;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
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
  },
  body: {
    flex: 1,
    backgroundColor: Colors.GhostWhite,
    paddingHorizontal: 14,
  },
});
