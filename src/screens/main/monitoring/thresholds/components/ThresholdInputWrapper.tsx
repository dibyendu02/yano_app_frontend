import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import CommonThresholdLayout from '../../components/CommonThresholdLayout';
import ThresholdPickerInputInput from './ThresholdPickerInputInput';
import {useNavigation} from '@react-navigation/native';

interface ThresholdInputWrapperProps {
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

const ThresholdInputWrapper: React.FC<ThresholdInputWrapperProps> = ({
  title,
  inputs,
}) => {
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
        onPress={
          // methods.handleSubmit(data => console.log(data))
          () => navigation.goBack()
        }
        handleSwitchChange={handleSwitchChange}
        isSwitchOn={isSwitchOn}>
        <View style={styles.container}>
          {inputs.map(input => (
            <View key={input.name} style={styles.inputWrapper}>
              <ThresholdPickerInputInput {...input} />
            </View>
          ))}
        </View>
      </CommonThresholdLayout>
    </FormProvider>
  );
};

export default ThresholdInputWrapper;

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
    // backgroundColor: 'red'
  },
});
