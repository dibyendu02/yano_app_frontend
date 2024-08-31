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
import React, {useContext, useEffect, useState} from 'react';

import Header from '../../components/header/Header';
import {navigate} from '../../navigation/RootNavigation';
import {Colors} from '../../constants/Colors';
import {FormProvider, useForm} from 'react-hook-form';
import FilledButton from '../../components/buttons/FilledButton';
import FormSelectionInput from '../../components/hook-form/FormSelectionInput';
import UserContext from '../../contexts/UserContext';
import {AuthScreen} from '../../navigation/auth/AuthScreens';
import FormPickerInputInput from '../../components/hook-form/FormPickerInput';

const HeightOptions = Array.from({length: 100}, (_, i) => ({
  id: (i + 100).toString(),
  label: `${i + 100} cm`,
  enabled: true,
}));

const WeightOptions = Array.from({length: 150}, (_, i) => ({
  id: (i + 30).toString(),
  label: `${i + 30} kg`,
  enabled: true,
}));

const BloodTypes = [
  {id: 'A+', label: 'A Positive (A+)', enabled: true},
  {id: 'A-', label: 'A Negative (A-)', enabled: true},
  {id: 'B+', label: 'B Positive (B+)', enabled: true},
  {id: 'B-', label: 'B Negative (B-)', enabled: true},
  {id: 'AB+', label: 'AB Positive (AB+)', enabled: true},
  {id: 'AB-', label: 'AB Negative (AB-)', enabled: true},
  {id: 'O+', label: 'O Positive (O+)', enabled: true},
  {id: 'O-', label: 'O Negative (O-)', enabled: true},
];

const MoreDetails = () => {
  const {...methods} = useForm({mode: 'onBlur'});
  const [isFormValid, setIsFormValid] = useState(false);
  const {login, isPatient} = useContext(UserContext);

  useEffect(() => {
    const subscription = methods.watch((values, {name, type}) => {
      setIsFormValid(methods.formState.isValid);
    });
    return () => subscription.unsubscribe();
  }, [methods]);

  const onSubmit = (data: any) => {
    // navigate("MyHealth")
    navigate(AuthScreen.AskDevice);
    console.log(data);
  };

  return (
    <View style={{flex: 1}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <View style={{flex: 1}}>
          <Header
            title=""
            headerRightComponent={
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => {
                    navigate(AuthScreen.AskDevice);
                  }}>
                  <Text style={styles.skipButton}>Skip</Text>
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
              Tell us a bit about yourself
            </Text>
            <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
              <FormProvider {...methods}>
                {/* <FormSelectionInput
                  name="height"
                  placeholder="Select your height"
                  options={HeightOptions}
                  label="Height"
                  optionsListLabel="Select your height"
                  optionsListHeight={200}
                  rules={{
                    required: {
                      value: true,
                      message: 'Please select your height',
                    },
                  }}
                /> */}
                {/* <FormSelectionInput
                  name="weight"
                  placeholder="Select your weight"
                  options={WeightOptions}
                  label="Weight"
                  optionsListLabel="Select your weight"
                  optionsListHeight={200}
                  rules={{
                    required: {
                      value: true,
                      message: 'Please select your weight',
                    },
                  }}
                /> */}
                <FormPickerInputInput
                  name="height"
                  label="Height"
                  placeholder="Select your height"
                  optionsListLabel="Select your height"
                  optionsListHeight={500}
                />
                <FormPickerInputInput
                  name="weight"
                  label="Weight"
                  placeholder="Select your weight"
                  optionsListLabel="Select your weight"
                  optionsListHeight={500}
                />
                <FormSelectionInput
                  name="bloodType"
                  placeholder="Select your blood type"
                  options={BloodTypes}
                  label="Blood type"
                  optionsListLabel="Choose your blood type"
                  optionsListHeight={500}
                  showActionButtons={true}
                  rules={{
                    required: {
                      value: true,
                      message: 'Please select your blood type',
                    },
                  }}
                />
              </FormProvider>
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
      <FilledButton
        label="Next"
        type="blue"
        style={{width: '92%', alignSelf: 'center', marginVertical: 10}}
        // disabled={!isFormValid}
        onPress={methods.handleSubmit(onSubmit)}
      />
    </View>
  );
};

export default MoreDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  skipButton: {
    borderWidth: 1,
    borderColor: Colors.Blue,
    borderRadius: 8,
    fontSize: 14,
    color: '#00263E',
    fontWeight: 'bold',
    padding: 10,
    paddingHorizontal: 18,
    marginRight: 15,
  },
  body: {
    flex: 1,
    backgroundColor: Colors.GhostWhite,
    paddingHorizontal: 14,
  },
});
