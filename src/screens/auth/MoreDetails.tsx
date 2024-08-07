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
import {FormProvider, useForm} from 'react-hook-form';
import FilledButton from '../../components/buttons/FilledButton';
import FormSelectionInput from '../../components/hook-form/FormSelectionInput';

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
  {id: 'A+', label: 'A+', enabled: true},
  {id: 'A-', label: 'A-', enabled: true},
  {id: 'B+', label: 'B+', enabled: true},
  {id: 'B-', label: 'B-', enabled: true},
  {id: 'AB+', label: 'AB+', enabled: true},
  {id: 'AB-', label: 'AB-', enabled: true},
  {id: 'O+', label: 'O+', enabled: true},
  {id: 'O-', label: 'O-', enabled: true},
];

const MoreDetails = () => {
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
                <TouchableOpacity onPress={() => navigate(AuthScreen.Login)}>
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
              }}>
              Tell us a bit about yourself
            </Text>
            <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
              <FormProvider {...methods}>
                <FormSelectionInput
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
                />
                <FormSelectionInput
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
                />
                <FormSelectionInput
                  name="bloodType"
                  placeholder="Select your blood type"
                  options={BloodTypes}
                  label="Blood Type"
                  optionsListLabel="Select your blood type"
                  optionsListHeight={200}
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
        label="Continue"
        type="blue"
        style={{width: '90%', alignSelf: 'center', marginVertical: 10}}
        disabled={!methods.formState.isValid}
        onPress={methods.handleSubmit(onSubmit)}
      />
    </SafeAreaView>
  );
};

export default MoreDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  skipButton: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    fontSize: 14,
    color: '#00263E',
    fontWeight: 'bold',
    padding: 10,
    paddingHorizontal: 15,
    marginRight: 15,
  },
  body: {
    flex: 1,
    backgroundColor: Colors.GhostWhite,
    paddingHorizontal: 14,
  },
});
