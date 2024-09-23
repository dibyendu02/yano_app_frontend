import React from 'react';
import {StyleSheet, View} from 'react-native';
import {FormProvider, useForm} from 'react-hook-form';
import CommonThresholdLayout from '../components/CommonThresholdLayout';
import ThresholdPickerInput from './components/ThresholdPickerInput';

const BloodOxygen = () => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <CommonThresholdLayout
        title="Blood oxygen"
        onPress={methods.handleSubmit(data => {
          console.log('Form Data:', data);
          // Handle form submission here
        })}>
        <View style={styles.container}>
          <View style={styles.inputWrapper}>
            <ThresholdPickerInput
              name="minimum"
              unit="SpO2"
              minValue={85}
              maxValue={99}
              label="Minimum"
              placeholder="Select minimum value"
              optionsListLabel="Select minimum value"
              optionsListHeight={300}
            />
          </View>
        </View>
      </CommonThresholdLayout>
    </FormProvider>
  );
};

export default BloodOxygen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: 10,
  },
  inputWrapper: {
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
});
