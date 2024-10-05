/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Colors} from '../../constants/Colors';
import Header from '../../components/header/Header';
import FilledButton from '../../components/buttons/FilledButton';
import {RadioButton} from 'react-native-paper';
import {navigate} from '../../navigation/RootNavigation';
import {AuthScreen} from '../../navigation/auth/AuthScreens';
import {useRoute} from '@react-navigation/native';
import {FormProvider, useForm, useWatch} from 'react-hook-form';
import FormInput from '../../components/hook-form/FormInput';
import UserContext from '../../contexts/UserContext';
import axios from 'axios';
import {BASE_URL} from '../../../App';

const AccountVerification = () => {
  const route = useRoute();
  //@ts-ignore
  const userType = route?.params?.userType;
  const userData = route?.params?.userData;
  const mode = route.params?.mode;
  const [selectedKey, setSelectedKey] = useState<string | null>('Email');
  const {control, ...methods} = useForm();
  const {login} = useContext(UserContext);
  const [email, setEmail] = useState(userData?.email);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  //console.log(userData);

  const Options = [
    {
      key: 'Email',
      label: 'Email verification',
      description: `We will send you a 6-digit verification code to ${email}`,
    },
    {
      key: 'Mobile',
      label: 'SMS verification',
      description: `We will send you a 6-digit verification code to +1234567890`,
    },
  ];

  const code: string = useWatch({control, name: 'code'}) || '';

  useEffect(() => {
    if (code && code.length === 6) {
      verifyCode(code);
    }
  }, [code]);

  const sendOTP = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(
        `${BASE_URL}/api/userpatient/send-otp`,
        {
          email,
        },
      );
      console.log(response.data.message);
      // Navigate to the verification screen
      navigate(AuthScreen.AccountVerification, {
        mode: 'Verification',
        userType,
        userData,
      });
    } catch (err) {
      console.error(err);
      setError('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async (_code: string) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(
        `${BASE_URL}/api/userpatient/verify-otp`,
        {
          email,
          otp: _code,
        },
      );
      console.log(response.data.message);
      // Handle successful verification
      methods.clearErrors('code');
      if (userType == 'Patient') {
        setTimeout(() => {
          navigate(AuthScreen.Welcome);
        }, 1000);
      } else {
        login();
        navigate('tabs');
      }
    } catch (err) {
      console.error(err);
      methods.setError('code', {
        type: 'manual',
        message: 'Incorrect or expired verification code',
      });
    } finally {
      setLoading(false);
    }
  };

  const resendCode = () => {
    methods.resetField('code', {defaultValue: ''});
    methods.clearErrors('code');
    sendOTP();
  };

  return (
    <View style={styles.container}>
      <Header title="Account Verification" />
      <View style={styles.body}>
        <Text style={styles.instructionText}>
          {mode === 'Verification' ? (
            <>
              Please enter the 6-digit verification code that was sent to{' '}
              <Text style={styles.boldText}>{email}</Text>
            </>
          ) : (
            "For your safety, we want to make sure it's really you. Select a method to verify your account."
          )}
        </Text>
        {mode === 'Verification' ? (
          <View style={{marginTop: 24}}>
            <FormProvider control={control} {...methods}>
              <FormInput
                name="code"
                label="Verification code"
                maxLength={6}
                defaultValue=""
              />
            </FormProvider>
            {loading && <ActivityIndicator size="large" color={Colors.Blue} />}
            {error !== '' && <Text style={styles.errorText}>{error}</Text>}
          </View>
        ) : (
          <>
            {Options.map(item => (
              <TouchableOpacity
                key={item.key}
                activeOpacity={0.8}
                style={[
                  styles.optionContainer,
                  {
                    borderColor:
                      item.key === selectedKey
                        ? Colors.LightGreen
                        : Colors.Transparent,
                  },
                ]}
                onPress={() => setSelectedKey(item.key)}>
                <View style={styles.optionContent}>
                  <RadioButton.Android
                    value={item.key}
                    status={item.key === selectedKey ? 'checked' : 'unchecked'}
                    color={Colors.LightGreen}
                    uncheckedColor={Colors.Grey}
                    pointerEvents="none"
                  />
                  <Text style={styles.optionLabel}>{item.label}</Text>
                </View>
                <Text style={styles.optionDescription}>{item.description}</Text>
              </TouchableOpacity>
            ))}
          </>
        )}
      </View>
      {mode === 'Verification' ? (
        <View style={styles.resendContainer}>
          <View style={styles.resendContent}>
            <Text style={styles.resendText}>
              Didn't receive the verification code?
            </Text>
            <Text style={styles.resendLink} onPress={resendCode}>
              Resend Code
            </Text>
          </View>
        </View>
      ) : (
        <FilledButton
          label="Send Code"
          type="blue"
          style={styles.sendButton}
          onPress={sendOTP}
          disabled={loading}
        />
      )}
    </View>
  );
};

export default AccountVerification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  body: {
    flex: 1,
    backgroundColor: Colors.GhostWhite,
    padding: 16,
  },
  instructionText: {
    color: Colors.Blue,
    fontSize: 18,
    lineHeight: 21,
    width: '100%',
    marginBottom: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
  optionContainer: {
    width: '100%',
    backgroundColor: Colors.White,
    paddingTop: 10,
    paddingBottom: 14,
    paddingLeft: 8,
    paddingRight: 30,
    marginVertical: 6,
    borderRadius: 8,
    borderWidth: 2,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionLabel: {
    fontSize: 18,
    color: Colors.Blue,
  },
  optionDescription: {
    color: Colors.SteelBlue,
    fontWeight: '400',
    marginLeft: 35,
    fontSize: 14,
    fontFamily: 'Roboto',
    width: '80%',
  },
  resendContainer: {
    width: '100%',
    backgroundColor: Colors.GhostWhite,
  },
  resendContent: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: Colors.White,
    padding: 16,
  },
  resendText: {
    color: Colors.SteelBlue,
    fontSize: 16,
    lineHeight: 21,
    textAlign: 'center',
  },
  resendLink: {
    color: Colors.Blue,
    fontSize: 16,
    lineHeight: 21,
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontWeight: '400',
  },
  sendButton: {
    width: '94%',
    alignSelf: 'center',
    marginVertical: 12,
  },
  loadingText: {
    color: Colors.Blue,
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  errorText: {
    color: Colors.Red,
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
});
