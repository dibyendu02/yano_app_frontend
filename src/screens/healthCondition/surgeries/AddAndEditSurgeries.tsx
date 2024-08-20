import React, {useState} from 'react';
import {View, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {Colors} from '../../../constants/Colors';
import FilledButton from '../../../components/buttons/FilledButton';
import CustomInputField from '../../../components/formComp/CustomInputField';
import {useForm, Control, FieldValues} from 'react-hook-form';
import CustomTextarea from '../../../components/formComp/TextAreaField';
import {DatePickerField} from '../../../components/form/DatePicker';
import CommonHeader from '../components/CommonHeader';

interface FormValues {
  name: string;
  devices: string;
  date: string;
  doctorName: string;
  additionalNotes: string;
}

const AddAndEditSurgeries = ({navigation, route}: any) => {
  let data = null;
  if (route?.params) {
    data = route.params.data;
  }
  const [disabled, setDisabled] = useState(true);
  const [defaultValues, setDefaultValues] = useState<FieldValues>({
    name: data?.name || '',
    devices: data?.devices || '',
    date: data?.date || '',
    doctorName: data?.doctorName || '',
    additionalNotes: data?.additionalNotes || '',
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<FormValues>({defaultValues});

  const onSubmit = (data: FormValues) => {
    console.log(data);
    reset();
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
      <ScrollView>
        <View style={{padding: 20}}>
          <View style={styles.inputBox}>
            <CustomInputField
              label="Surgery name"
              name="name"
              control={control as unknown as Control<FieldValues, object>}
              placeholder="Surgery name"
              rules={{required: 'name is required'}}
            />
            <CustomInputField
              label="Implants / Support Devices"
              name="devices"
              control={control as unknown as Control<FieldValues, object>}
              placeholder="Ej. 2 days, 3 weeks, etc..."
            />
            <DatePickerField
              label="Surgery date"
              name="date"
              value={defaultValues.date}
              onchange={(name, value) =>
                setDefaultValues({...defaultValues, [name]: value})
              }
            />
            <CustomInputField
              label="Physician in charge"
              name="doctorName"
              control={control as unknown as Control<FieldValues, object>}
              placeholder="Ej. 2 times a day, after meal, etc..."
            />
            <CustomTextarea
              label="Additional notes"
              name="additionalNotes"
              control={control as unknown as Control<FieldValues, object>}
              placeholder="Text"
            />
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

export default AddAndEditSurgeries;
