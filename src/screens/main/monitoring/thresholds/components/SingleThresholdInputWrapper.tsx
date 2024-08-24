import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import CommonThresholdLayout from '../../components/CommonThresholdLayout';
import ThresholdPickerInput from './ThresholdPickerInput';
import { useNavigation } from '@react-navigation/native';
import SaveConfirmationModal from '../../../../../components/SaveConfirmationModal';

interface SingleThresholdInputWrapperProps {
  title: string;
  inputs: {
    name: string;
    unit: string;
    minValue: number;
    maxValue: number;
    label: string;
    placeholder: string;
    optionsListLabel: string;
    optionsListHeight: number;
  }[];
}

const SingleThresholdInputWrapper: React.FC<
  SingleThresholdInputWrapperProps
> = ({ title, inputs }) => {
  const methods = useForm();
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const navigation = useNavigation();

  const handleSwitchChange = (value: boolean) => {
    setIsSwitchOn(value);
  };

  return (
    <FormProvider {...methods}>
      <CommonThresholdLayout
        title={title}
        onPress={methods.handleSubmit(data => {
          console.log('Form Data:', data);
          navigation.goBack();
        })}
        handleSwitchChange={handleSwitchChange}
        isSwitchOn={isSwitchOn}>
        <View style={styles.container}>
          {inputs.map((input, index) => (
            <View key={input.name} style={styles.inputWrapper}>
              <ThresholdPickerInput {...input} />
            </View>
          ))}
        </View>
        <SaveConfirmationModal
          isVisible={false}
          // onClose={() => {
          //   console.log('Modal closed');
          // }}
          text="Updated health threshold."
        />
      </CommonThresholdLayout>
    </FormProvider>
  );
};

export default SingleThresholdInputWrapper;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  inputWrapper: {
    width: '45%', // Adjusted width for single column layout
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15, // Added margin between inputs
  },
});
