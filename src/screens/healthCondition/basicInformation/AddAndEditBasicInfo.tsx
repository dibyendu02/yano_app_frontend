/* eslint-disable react-native/no-inline-styles */
// AddAndEditBasicInfo.tsx
import React, {useState} from 'react';
import {View, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {Colors} from '../../../constants/Colors';
import Header from '../../../components/header/Header';
import FilledButton from '../../../components/buttons/FilledButton';
import CustomInputField from '../../../components/formComp/CustomInputField';
import {useForm, Control, FieldValues, FormProvider} from 'react-hook-form';
import CustomSelect from '../../../components/formComp/SelectFiled';
import CommonHeader from '../components/CommonHeader';
import FormSelectionInput from '../../../components/hook-form/FormSelectionInput';
import FormPickerInputInput from '../../../components/hook-form/FormPickerInput';

interface FormValues {
  height: string;
  weight: string;
  bloodGroup: string;
}

const AddAndEditBasicInfo = ({navigation, route}: any) => {
  let data = null;
  if (route?.params) {
    data = route.params.data;
  }
  const [disabled, setDisabled] = useState(true);
  const [defaultValues, setDefaultValues] = useState<FieldValues>({
    height: data?.height || '',
    weight: data?.weight || '',
    bloodGroup: data?.bloodGroup || '',
  });

  const {control, handleSubmit, reset} = useForm<FormValues>({defaultValues});
  const {...methods} = useForm();

  const onSubmit = (_data: FormValues) => {
    console.log(_data);
    reset();
    navigation.goBack();
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.GhostWhite,
        position: 'relative',
      }}>
      <CommonHeader
        title={data ? 'Edit' : 'Add'}
        rightComp1={
          <FilledButton
            type="blue"
            label="Save"
            onPress={handleSubmit(onSubmit)}
            disabled={!disabled}
            style={{
              width: 70,
              paddingVertical: 10,
              borderRadius: 10,
            }}
          />
        }
      />
      <ScrollView style={{paddingVertical: 12, width: '94%', margin: 'auto'}}>
        <View>
          <View style={styles.inputBox}>
            <FormProvider {...methods}>
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
                name="bloodGroup"
                label="Blood Group"
                optionsListLabel="Choose your blood type"
                options={[
                  {label: 'A Positivo (A+)', id: 'A+'},
                  {label: 'A Negativo (A-)', id: 'A-'},
                  {label: 'B Positivo (B+)', id: 'B+'},
                  {label: 'B Negativo (B-)', id: 'B-'},
                  {label: 'AB Positivo (AB+)', id: 'AB+'},
                  {label: 'AB Negativo (AB-)', id: 'AB-'},
                  {label: 'O Positivo (O+)', id: 'O+'},
                  {label: 'O Negativo (O-)', id: 'O-'},
                ]}
                selectedId="O+"
                showActionButtons={true}
                optionsListHeight={500}
              />
            </FormProvider>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    // marginBottom: 20,
  },
});

export default AddAndEditBasicInfo;
