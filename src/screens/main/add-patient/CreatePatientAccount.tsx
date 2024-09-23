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
import Header from '../../../components/header/Header';
import {navigate} from '../../../navigation/RootNavigation';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {AuthScreen} from '../../../navigation/auth/AuthScreens';
import {FormProvider, useForm, Controller} from 'react-hook-form';
import FormInput from '../../../components/hook-form/FormInput';
import {FormInputType} from '../../../components/hook-form/types';
import FormDateInput from '../../../components/hook-form/FormDateInput';
import FormSelectionInput from '../../../components/hook-form/FormSelectionInput';
import FilledButton from '../../../components/buttons/FilledButton';
import FormPhoneNumberInput from '../../../components/hook-form/FormPhoneNumberInput';
import FormImageInput from '../../../components/hook-form/FormImageInput';
import {AuthScreensProps} from '../../../navigation/auth/types';
import {UserType} from '../../../constants/enums';
import moment from 'moment';
import {registerDoctor, registerPatient} from '../../../services/Endpoints';
import Gender from '../my-profile/components/EditProfile/Gender';
import Sex from './Sex';
import {createPatientAccount} from '../../../api/POST/addPatient';
import {retrieveData} from '../../../utils/Storage';
import {useNavigation} from '@react-navigation/native';

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

const CreatePatientAccount: React.FC<AuthScreensProps> = ({route}) => {
  const [isDisabled, setIsDisabled] = React.useState(true);
  const navigation = useNavigation();
  //@ts-ignore
  const userType = route?.params?.userType;

  console.log(userType);

  const {...methods} = useForm({
    mode: 'onChange',
  });

  const onSubmit = async (data: any) => {
    let requestData = new FormData();

    // Appending image file
    if (data?.file) {
      const uri =
        Platform.OS === 'ios' ? data?.file?.path : `file://${data?.file?.path}`;
      requestData.append('file', {
        uri: uri,
        type: data?.file?.mime,
        name: `${moment().format('YYYYMMDD_HHmmss')}.jpeg`, // Using a timestamp to make the name unique
      });
    }

    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: null,
      gender: data.gender,
      dateOfBirth: data.dateOfBirth,
    };

    const formattedDateOfBirth = moment(data.dateOfBirth).format('YYYY-MM-DD');

    requestData.append('firstName', data.firstName);
    requestData.append('lastName', data.lastName);
    requestData.append('email', data.email);
    requestData.append('gender', data.gender);
    requestData.append('dateOfBirth', formattedDateOfBirth); // Ensure it's a string

    const userId = await retrieveData('userId');
    const token = await retrieveData('token');
    console.log(requestData);
    const res = await createPatientAccount({
      data: requestData,
      id: userId,
      token,
    });
    navigation.goBack();
  };

  return (
    <View style={{flex: 1}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <View style={{flex: 1}}>
          <Header title="Create patient account" />
          <View style={styles.body}>
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

                <Controller
                  name="gender"
                  control={methods.control}
                  defaultValue="1"
                  render={({field: {onChange, value}}) => (
                    <Sex
                      selectedRole={value}
                      setSelectedRole={onChange}
                      isSelected={false}
                    />
                  )}
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
        label="Create patient account"
        type="blue"
        style={{width: '92%', alignSelf: 'center', marginVertical: 10}}
        // disabled={!methods.formState.isDirty}
        onPress={methods.handleSubmit(onSubmit)}
      />
    </View>
  );
};

export default CreatePatientAccount;

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: Colors.Blue,
    marginRight: 8,
  },
  loginButton: {
    borderWidth: 1,
    borderColor: Colors.White,
    backgroundColor: Colors.Blue,
    borderRadius: 8,
    color: Colors.White,
    fontWeight: 'bold',
    padding: 10,
    paddingHorizontal: 15,
  },
  loginButtonDisabled: {
    borderWidth: 1,
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
});
