/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext, useEffect } from 'react';

import Header from '../../components/header/Header';
import { navigate } from '../../navigation/RootNavigation';
import { Colors } from '../../constants/Colors';
import { AuthScreen } from '../../navigation/auth/AuthScreens';
import FormInput from '../../components/hook-form/FormInput';
import { FormInputType } from '../../components/hook-form/types';
import { FormProvider, useForm } from 'react-hook-form';
import FilledButton from '../../components/buttons/FilledButton';
import { StaticImage } from '../../assets/images';
import UserContext from '../../contexts/UserContext';

const Login = () => {
  const { login } = useContext(UserContext);
  const { ...methods } = useForm({ mode: 'onBlur' });

  const onSubmit = () => {
    login();
    // navigate('tabs');
  };
  useEffect(() => {
    console.log();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title=""
        headerRightComponent={
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.text}>Not Registered?</Text>
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
            placeholder="Enter your email"
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
            placeholder="Enter your password"
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
          <TouchableOpacity>
            <Text style={{ color: Colors.Blue }}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>
        <FilledButton
          label="Log in"
          type="blue"
          disabled={!methods.formState.isValid}
          onPress={methods.handleSubmit(onSubmit)}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 40,
          }}>
          <View
            style={{ width: '45%', height: 2, backgroundColor: Colors.LightGray }}
          />
          <Text style={{ fontSize: 18, color: Colors.Blue }}>o</Text>
          <View
            style={{ width: '45%', height: 2, backgroundColor: Colors.LightGray }}
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
