/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
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

const AccountVerification = () => {
  const route = useRoute();
  //@ts-ignore
  const userType = route?.params?.userType;
  const mode = route.params?.mode;
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const {control, ...methods} = useForm();
  const {login, isPatient} = useContext(UserContext);

  const Options = [
    {
      key: 'Email',
      label: 'Email verification',
      description: `We will send you a 6-digit verification code to ${
        userType === 'Patient'
          ? 'patient.email@example.com'
          : 'provider.email@example.com'
      }`,
    },
    {
      key: 'Mobile',
      label: 'SMS verification',
      description: `We will send you a 6-digit verification code to \n+1234567890`,
    },
  ];

  const code: string = useWatch({control, name: 'code'}) || '';
  useEffect(() => {
    if (code && code.length === 6) {
      verifyCode(code);
    }
  }, [code]);

  const verifyCode = async (_code: string) => {
    if (code === '123456') {
      methods.clearErrors('code');
      if (userType == 'Patient') {
        setTimeout(() => {
          navigate(AuthScreen.Welcome);
        }, 1000);
      } else {
        login();
        navigate('tabs');
      }
    } else {
      methods.setError('code', {
        type: 'manual',
        message: 'Incorrect verification code',
      });
    }
  };

  const resendCode = () => {
    methods.resetField('code', {defaultValue: ''});
    methods.clearErrors('code');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Account Verification" />
      <View style={styles.body}>
        <Text style={styles.instructionText}>
          {mode === 'Verification' ? (
            <>
              Please enter the 6-digit verification code that was sent to{' '}
              <Text style={styles.boldText}>
                {userType === 'Patient' ? '0412-6808909' : '+1234567890'}
              </Text>
            </>
          ) : (
            "For your safety, we want to make sure it's \nreally you. Select a method to verify your \naccount."
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
          </View>
        ) : (
          Options.map(item => (
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
          ))
        )}
      </View>
      {mode === 'Verification' ? (
        <View style={styles.resendContainer}>
          <View style={styles.resendContent}>
            <Text style={styles.resendText}>
              Didn't you receive the text message?
            </Text>
            <Text style={styles.resendLink} onPress={resendCode}>
              Re-send code
            </Text>
          </View>
        </View>
      ) : (
        <FilledButton
          label="Send Code"
          type="blue"
          style={styles.sendButton}
          onPress={() =>
            navigate(AuthScreen.AccountVerification, {
              mode: 'Verification',
              userType,
            })
          }
        />
      )}
    </SafeAreaView>
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
    padding: 16,
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
  },
  resendContainer: {
    width: '100%',
    backgroundColor: Colors.GhostWhite,
  },
  resendContent: {
    width: '80%',
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
    width: '92%',
    alignSelf: 'center',
    marginTop: 20,
  },
});
