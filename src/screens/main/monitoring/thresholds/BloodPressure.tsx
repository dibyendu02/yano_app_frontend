import {StyleSheet, View} from 'react-native';
import React from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import CommonThresholdLayout from '../components/CommonThresholdLayout';
import ThresholdPickerInput from './components/ThresholdPickerInput';

const BloodPressure = () => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <CommonThresholdLayout
        title="Blood Pressure"
        onPress={methods.handleSubmit(data => {
          console.log('Form Data:', data);
          // Handle form submission here
        })}>
        <View style={styles.container}>
          <View style={styles.inputWrapper}>
            <ThresholdPickerInput
              name="systolicMinimum"
              unit="mmHg"
              minValue={100}
              maxValue={130}
              label="Systolic Minimum"
              //   placeholder="Select systolic minimum"
              optionsListLabel="Select systolic minimum"
              optionsListHeight={300}
            />
          </View>
          <View style={styles.inputWrapper}>
            <ThresholdPickerInput
              name="systolicMaximum"
              unit="mmHg"
              minValue={140}
              maxValue={170}
              label="Systolic Maximum"
              //   placeholder="Select systolic maximum"
              optionsListLabel="Select systolic maximum"
              optionsListHeight={300}
            />
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.inputWrapper}>
            <ThresholdPickerInput
              name="diastolicMinimum"
              unit="mmHg"
              minValue={60}
              maxValue={90}
              label="Diastolic Minimum"
              //   placeholder="Select diastolic minimum"
              optionsListLabel="Select diastolic minimum"
              optionsListHeight={300}
            />
          </View>
          <View style={styles.inputWrapper}>
            <ThresholdPickerInput
              name="diastolicMaximum"
              unit="mmHg"
              minValue={90}
              maxValue={120}
              label="Diastolic Maximum"
              //   placeholder="Select diastolic maximum"
              optionsListLabel="Select diastolic maximum"
              optionsListHeight={300}
            />
          </View>
        </View>
      </CommonThresholdLayout>
    </FormProvider>
  );
};

export default BloodPressure;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  inputWrapper: {
    width: '45%',
    borderRadius: 10,
    overflow: 'hidden',
  },
});
