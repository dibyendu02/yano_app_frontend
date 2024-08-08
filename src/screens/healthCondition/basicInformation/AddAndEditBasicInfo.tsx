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
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.LightGray,
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
      <ScrollView>
        <View style={{padding: 20}}>
          <View style={styles.inputBox}>
            <CustomInputField
              label="Height"
              name="height"
              control={control as unknown as Control<FieldValues, object>}
              placeholder="Enter height"
              rules={{required: 'required*'}}
            />
            <CustomInputField
              label="Weight"
              name="weight"
              control={control as unknown as Control<FieldValues, object>}
              placeholder="Enter weight"
            />
            {/* <CustomSelect
              label="Blood Group"
              name="bloodGroup"
              control={control as unknown as Control<FieldValues, object>}
              options={[
                {label: 'A+', value: 'A+'},
                {label: 'b+', value: 'b+'},
                {label: 'AB+', value: 'AB+'},
                {label: 'O+', value: 'O+'},
                {label: 'A-', value: 'A-'},
                {label: 'B-', value: 'B-'},
                {label: 'O-', value: 'O-'},
                {label: 'AB-', value: 'AB-'},
              ]}
            /> */}
            <FormProvider {...methods}>
              {/* <FormPickerInputInput
                name="weight"
                label="Weight"
                optionsListHeight={500}
              /> */}
              <FormSelectionInput
                name="bloodGroup"
                label="Blood Group"
                options={[
                  {label: 'A Positive(A+)', id: 'A+'},
                  {label: 'B Positive(b+)', id: 'b+'},
                  {label: 'AB Positive(AB+)', id: 'AB+'},
                  {label: 'O Positive(O+)', id: 'O+'},
                  {label: 'A Negative(A-)', id: 'A-'},
                  {label: 'B Negative(B-)', id: 'B-'},
                  {label: 'O Negative(O-)', id: 'O-'},
                  {label: 'AB Negative(AB-)', id: 'AB-'},
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
    marginBottom: 20,
  },
});

export default AddAndEditBasicInfo;
