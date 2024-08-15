import React, {useContext, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';

import axios from 'axios';
import Header from '../../components/header/Header';
import {navigate} from '../../navigation/RootNavigation';
import {Colors} from '../../constants/Colors';
import {AuthScreen} from '../../navigation/auth/AuthScreens';
import FormInput from '../../components/hook-form/FormInput';
import {FormInputType} from '../../components/hook-form/types';
import {FormProvider, useForm} from 'react-hook-form';
import FilledButton from '../../components/buttons/FilledButton';
import {StaticImage} from '../../assets/images';
import UserContext from '../../contexts/UserContext';
import {BASE_URL} from '../../../App';
import {storeData} from '../../utils/Storage';

const Login = ({navigation}: any) => {
  const {login, PatientLogin, ProviderLogin} = useContext(UserContext);
  const [isClicked, setIsClicked] = useState(false);
  const methods = useForm({mode: 'onBlur'});

  const onSubmit = async (data: any) => {
    const {email, password} = data;

    setIsClicked(true);

    try {
      const response = await axios.post(`${BASE_URL}/api/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        // Store necessary data locally
        await storeData('token', response.data.token);
        await storeData('userId', response.data.userData._id);
        await storeData('isAuth', true);
        await storeData('userType', response.data.userData.userType);

        // Update global userData
        login(response.data.userData);

        if (response.data.userData.userType === 'patient') {
          PatientLogin();
          navigation.navigate(AuthScreen.LoadingScreen);
        } else {
          ProviderLogin();
          navigation.navigate(AuthScreen.LoadingScreen);
        }
      } else {
        Alert.alert(
          'Login Failed',
          response.data.message || 'An error occurred',
        );
        setIsClicked(false);
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert(
        'Login Failed',
        error.response?.data?.message || 'An unexpected error occurred.',
      );
      setIsClicked(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title=""
        headerRightComponent={
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.text}>Not registered?</Text>
            <TouchableOpacity
              onPress={() => navigate(AuthScreen.SelectUserType)}>
              <Text style={styles.loginButton}>Sign Up</Text>
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
            marginBottom: 20,
          }}>
          Log in
        </Text>
        <FormProvider {...methods}>
          <FormInput
            name="email"
            label="Email"
            type={FormInputType.Email}
            autoCapitalize="none"
            keyboardType="email-address"
            rules={{
              required: {
                value: true,
                message: 'Please enter email',
              },
            }}
          />
          <FormInput
            name="password"
            label="Password"
            type={FormInputType.Password}
            rules={{
              required: {
                value: true,
                message: 'Please enter password',
              },
            }}
          />
        </FormProvider>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginBottom: 20,
          }}>
          <TouchableOpacity onPress={() => navigate(AuthScreen.ForgotPass)}>
            <Text style={{color: Colors.Blue}}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>
        {isClicked ? (
          <ActivityIndicator size={'large'} color={Colors.Blue} />
        ) : (
          <FilledButton
            label="Log in"
            type="blue"
            disabled={!methods.formState.isValid}
            onPress={methods.handleSubmit(onSubmit)}
          />
        )}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 40,
          }}>
          <View
            style={{width: '45%', height: 2, backgroundColor: Colors.LightGray}}
          />
          <Text style={{fontSize: 16, color: Colors.Blue}}>or</Text>
          <View
            style={{width: '45%', height: 2, backgroundColor: Colors.LightGray}}
          />
        </View>
        <FilledButton
          type="white"
          icon={
            <Image source={StaticImage.GoogleLogo} style={styles.socialIcon} />
          }
          label="Log in with Google"
        />
        <FilledButton
          type="white"
          icon={
            <Image
              source={StaticImage.FacebookLogo}
              style={styles.socialIcon}
            />
          }
          label="Log in with Facebook"
        />
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  body: {
    flex: 1,
    backgroundColor: Colors.GhostWhite,
    paddingHorizontal: 14,
  },
  loginButton: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    fontSize: 14,
    color: '#00263E',
    fontWeight: 'bold',
    padding: 10,
    paddingHorizontal: 15,
  },
  loginBtnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 18,
    color: Colors.Blue,
    marginRight: 8,
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
});
