import React, {useContext, useEffect, useState} from 'react';
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
  Image,
} from 'react-native';
import {FormProvider, useForm, Controller} from 'react-hook-form';
import HeaderWithButton from '../../add-patient/component/HeaderWithButton';
import {navigate} from '../../../../navigation/RootNavigation';
import {Colors} from '../../../../constants/Colors';
import {AuthScreen} from '../../../../navigation/auth/AuthScreens';
import FormInput from '../../../../components/hook-form/FormInput';
import {FormInputType} from '../../../../components/hook-form/types';
import FormDateInput from '../../../../components/hook-form/FormDateInput';
import FormPhoneNumberInput from '../../../../components/hook-form/FormPhoneNumberInput';
import FormImageInput from '../../../../components/hook-form/FormImageInput';
import {AuthScreensProps} from '../../../../navigation/auth/types';
import {UserType} from '../../../../constants/enums';
import moment from 'moment';
import {registerDoctor, registerPatient} from '../../../../services/Endpoints';
import Gender from './Gender';
import UserContext from '../../../../contexts/UserContext';
import Modal from 'react-native-modal';
import {staticIcons} from '../../../../assets/image';
import {CloseIcon} from '../../../../assets/icon/IconNames';

const EditPatientProfile: React.FC<AuthScreensProps> = ({route}) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [saved, setSaved] = useState(false);
  const {userData} = useContext(UserContext);
  // const userType = route?.params?.userType;

  // Prefilled dummy data
  const initialData = {
    userImg: userData?.userImg,
    firstName: userData?.firstName,
    lastName: userData?.lastName,
    email: userData?.email,
    phoneNumber: userData?.phoneNumber,
    dateOfBirth: userData?.dateOfBirth,
    gender: userData?.gender,
    specialty: 'General medicine',
    contactname: userData?.contactname || '',
    contactphoneNumber: userData?.contactphoneNumber || '',
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

  const onSubmit = async (data: any) => {
    let requestData = new FormData();
    if (data?.file) {
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
      }, 2000);
    }
    // if (data?.file) {
    //   requestData.append('image', {
    //     uri:
    //       Platform.OS === 'ios'
    //         ? `file:///${data?.file?.path}`
    //         : data?.file.path,
    //     type: data?.file?.mime,
    //     name: `${moment()}.jpeg`,
    //   });
    // }

    // const payload = {
    //   firstName: data.firstName,
    //   lastName: data.lastName,
    //   email: data.email,
    //   phoneNumber: data.phoneNumber,
    //   gender: data.gender,
    //   dateOfBirth: data.dateOfBirth,
    //   specialty: data.specialty,
    //   contactname: data.contactname,
    //   contactphoneNumber: data.contactphoneNumber,
    // };

    // for (let key in payload) {
    //   requestData.append(key, payload[key]);
    // }

    // try {
    //   if (userType === UserType.Patient) {
    //     await registerPatient(requestData);
    //   } else {
    //     await registerDoctor(requestData);
    //   }

    //   showToast('The changes have been saved.');
    //   navigate(AuthScreen.AccountVerification);
    // } catch (e) {
    //   console.log('Error!', e?.response?.data?.message);
    //   showToast('An error occurred while saving.');
    // }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <View style={{flex: 1}}>
          <HeaderWithButton
            title="Edit profile"
            headerRightComponent={
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 3,
                }}>
                <TouchableOpacity
                  disabled={isDisabled}
                  onPress={isDisabled ? null : methods.handleSubmit(onSubmit)}>
                  <Text
                    style={
                      isDisabled
                        ? styles.loginButtonDisabled
                        : styles.loginButton
                    }>
                    Save
                  </Text>
                </TouchableOpacity>
              </View>
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
                  label="Name"
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
                    required: {
                      value: true,
                      message: 'Please enter your email',
                    },
                  }}
                />
                <FormPhoneNumberInput
                  name="phoneNumber"
                  label="Phone number"
                  defaultValue={initialData.phoneNumber}
                  rules={{
                    required: {
                      value: true,
                      message: 'Please enter your phone number',
                    },
                    pattern: {
                      value: /^\+\d{10,14}$/,
                      message: 'Enter valid mobile number!',
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
                  defaultValue={initialData.gender}
                  render={({field: {onChange, value}}) => (
                    <Gender selectedRole={value} setSelectedRole={onChange} />
                  )}
                />
                <FormInput
                  name="contactname"
                  label="Emergency contact name"
                  rules={{
                    required: {
                      value: true,
                      message: 'Please enter the emergency contact name',
                    },
                  }}
                />
                <FormPhoneNumberInput
                  name="contactphoneNumber"
                  label="Emergency contact phone number"
                  rules={{
                    required: {
                      value: true,
                      message: 'Please enter the emergency contact number',
                    },
                    pattern: {
                      value: /^\+\d{10,14}$/,
                      message: 'Enter valid mobile number!',
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
        onSwipeComplete={() => setSaved(false)}
        swipeDirection="down"
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={0} // Adjust the opacity of the background
        animationInTiming={1000}
        animationOutTiming={3000}
        style={styles.modal}>
        <View style={styles.modalContent}>
          <View style={{flexDirection: 'row', gap: 10}}>
            <Image
              source={staticIcons.checkcircle}
              style={{
                height: 20,
                width: 20,
                objectFit: 'contain',
                tintColor: 'white',
              }}
            />
            <Text style={styles.modalText}>The changes have been made.</Text>
          </View>
          <CloseIcon color="white" />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default EditPatientProfile;

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: Colors.Blue,
    marginRight: 8,
  },
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
    padding: 8,
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
});
