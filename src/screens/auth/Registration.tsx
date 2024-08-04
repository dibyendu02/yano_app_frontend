/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React from 'react';
import Header from '../../components/header/Header';
import {navigate} from '../../navigation/RootNavigation';
import {Colors} from '../../constants/Colors';
import {AuthScreen} from '../../navigation/auth/AuthScreens';
import {FormProvider, useForm} from 'react-hook-form';
import FormInput from '../../components/hook-form/FormInput';

const Registration = () => {
  const {...methods} = useForm();
  return (
    <SafeAreaView style={{flex: 1}}>
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <FormProvider {...methods}>
            <FormInput control={methods.control} name="Name" label="Name" />
            <FormInput
              control={methods.control}
              name="lastName"
              label="Last Name"
            />
            <FormInput control={methods.control} name="email" label="Email" />
            <FormInput
              control={methods.control}
              name="password"
              label="Password"
            />
            <FormInput
              control={methods.control}
              name="repeatPassword"
              label="Repeat Password"
            />
          </FormProvider>
        </ScrollView>
      </View>
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
    paddingVertical: 20,
    paddingHorizontal: 14,
  },
});
