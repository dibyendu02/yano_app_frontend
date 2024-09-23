import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ToastAndroid,
  Alert,
} from 'react-native';
import Header from '../../../../components/header/Header';
import {navigate} from '../../../../navigation/RootNavigation';
import {Colors} from '../../../../constants/Colors';
import {AuthScreen} from '../../../../navigation/auth/AuthScreens';
import {FormProvider, useForm, Controller} from 'react-hook-form';
import FormInput from '../../../../components/hook-form/FormInput';
import {FormInputType} from '../../../../components/hook-form/types';
import FormDateInput from '../../../../components/hook-form/FormDateInput';
import FormSelectionInput from '../../../../components/hook-form/FormSelectionInput';
import FormImageInput from '../../../../components/hook-form/FormImageInput';
import {AuthScreensProps} from '../../../../navigation/auth/types';
import moment from 'moment';
import Gender from '../../my-profile/components/EditProfile/Gender';
import FilledButton from '../../../../components/buttons/FilledButton';
import {useNavigation} from '@react-navigation/native';
import {postFamilyLinkData} from '../../../../api/POST/familyLink';
import {retrieveData} from '../../../../utils/Storage';

const DoctorSpecialties = [
  {id: 'mother', label: 'Mother', enabled: true},
  {id: 'father', label: 'Father', enabled: true},
  {id: 'husband/wife', label: 'Husband/Wife', enabled: true},
  {id: 'sibling', label: 'Sibling', enabled: true},
  {id: 'grandparent', label: 'Grandparent', enabled: true},
  {id: 'child', label: 'Child', enabled: true},
  {id: 'other', label: 'Other', enabled: true},
];

const Create: React.FC<AuthScreensProps> = ({route}) => {
  const [isDisabled, setIsDisabled] = React.useState(true);
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [userType, setUserType] = useState('');
  const navigation = useNavigation();

  const getUserData = async () => {
    const retrievedToken = await retrieveData('token');
    const retrievedUserId = await retrieveData('userId');
    const retrievedUserType = await retrieveData('userType');

    setToken(retrievedToken);
    setUserId(retrievedUserId);
    setUserType(retrievedUserType);
  };

  useEffect(() => {
    getUserData();
  }, []);

  const initialData = {
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    gender: '',
    familyrelationship: '',
  };

  const {...methods} = useForm({
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

    const formattedDateOfBirth = moment(data.dateOfBirth).format('YYYY-MM-DD');

    // Append other form fields
    requestData.append('firstName', data.firstName);
    requestData.append('lastName', data.lastName);
    requestData.append('email', data.email);
    requestData.append('gender', data.gender);
    requestData.append('dateOfBirth', formattedDateOfBirth); // Make sure dateOfBirth is a string
    requestData.append('relation', data.familyrelationship);
    requestData.append('patientId', userId);

    try {
      // Call the API to post family member data
      const res = await postFamilyLinkData({data: requestData, token});
      console.log(res);
      navigation.goBack();
      // navigate(AuthScreen.AccountVerification);
    } catch (e) {
      console.log('Error!', e?.response?.data?.message);
    }
  };

  return (
    <View style={{flex: 1}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <View style={{flex: 1}}>
          <Header title="Create family member account" />
          <View style={styles.body}>
            <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
              <FormProvider {...methods}>
                <FormImageInput name="file" />
                <FormInput
                  name="firstName"
                  label="First Name"
                  rules={{
                    required: {
                      value: true,
                      message: 'Please enter the first name',
                    },
                  }}
                />
                <FormInput
                  name="lastName"
                  label="Last Name"
                  rules={{
                    required: {
                      value: true,
                      message: 'Please enter the last name',
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
                    required: {
                      value: true,
                      message: 'Please enter the email',
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
                  defaultValue="Male"
                  render={({field: {onChange, value}}) => (
                    <Gender selectedRole={value} setSelectedRole={onChange} />
                  )}
                />
                <FormSelectionInput
                  name="familyrelationship"
                  placeholder="Family relationship"
                  label="Family relationship"
                  options={DoctorSpecialties}
                  optionsListLabel="Family relationship"
                  optionsListHeight={400}
                  rules={{
                    required: {
                      value: true,
                      message: 'Please select the family relationship',
                    },
                  }}
                />
              </FormProvider>
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
      <FilledButton
        label="Create account"
        type="blue"
        style={{
          width: '92%',
          alignSelf: 'center',
          marginVertical: 10,
          marginBottom: Platform.OS === 'ios' ? 20 : 10,
        }}
        onPress={methods.handleSubmit(onSubmit)}
      />
    </View>
  );
};

export default Create;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: Colors.GhostWhite,
    paddingHorizontal: 14,
  },
});
