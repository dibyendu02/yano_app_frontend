import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CommonLayout from '../../../../components/CommonLayout';
import Header from '../../../../components/header/Header';
import FilledButton from '../../../../components/buttons/FilledButton';
import CustomInputField from '../../../../components/formComp/CustomInputField';
import {Control, FieldValues, useForm, FormProvider} from 'react-hook-form';
import {RepeatIcon} from '../../../../assets/icon/IconNames';
import {Colors} from '../../../../constants/Colors';
import {navigate} from '../../../../navigation/RootNavigation';
import FormDateInput from '../../../../components/hook-form/FormDateInput';
import FormTimePicker from '../../../../components/hook-form/FormTimeInput';

const AddReminder = ({route}: any) => {
  let data = null;
  if (route.params) {
    data = route.params.data;
  }

  const methods = useForm({
    defaultValues: {
      name: data?.name || '',
      date: data?.date ? new Date(data.date) : new Date(), // Ensure the date is valid
      frequency: data?.frequency || '1',
      time: data?.time ? new Date(data.time) : new Date(), // Ensure the time is valid
    },
  });

  const onSubmit = (values: any) => {
    console.log('Form Data:', values);
    // Handle form submission logic here
  };

  return (
    <FormProvider {...methods}>
      <CommonLayout>
        <Header
          title="Add reminder"
          headerRightComponent={
            <FilledButton
              type="blue"
              label="Save"
              onPress={methods.handleSubmit(onSubmit)}
              style={{
                width: 70,
                paddingVertical: 10,
                borderRadius: 10,
              }}
            />
          }
          customStyle={{paddingVertical: 2}}
        />
        <ScrollView>
          <View style={{padding: 20}}>
            <CustomInputField
              label="What do you need to remind the patient?"
              name="name"
              control={
                methods.control as unknown as Control<FieldValues, object>
              }
              rules={{required: 'This field is required'}}
            />

            <FormDateInput
              name="date"
              label="Date"
              placeholder="Select a date"
              placeholderTextColor={Colors.SteelBlue}
              rules={{
                required: {
                  value: true,
                  message: 'Please select a date',
                },
              }}
              buttonColor={Colors.Blue}
            />

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                marginVertical: 10,
              }}>
              <View style={{width: 100}}>
                <CustomInputField
                  label="Frequency"
                  name="frequency"
                  control={
                    methods.control as unknown as Control<FieldValues, object>
                  }
                  rules={{required: 'This field is required'}}
                />
              </View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: Colors.Blue,
                }}>
                a day
              </Text>
            </View>

            <View style={{width: '50%', marginVertical: 10}}>
              <FormTimePicker
                name="time"
                label="At"
                rules={{required: 'This field is required'}}
              />
            </View>

            <View
              style={{
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderColor: Colors.LightGray,
                paddingVertical: 10,
                marginVertical: 10,
              }}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  paddingVertical: 10,
                }}
                onPress={() => navigate('SetRepetition')}>
                <RepeatIcon />
                <Text
                  style={{
                    fontSize: 18,
                    color: Colors.Blue,
                  }}>
                  Set repetition
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </CommonLayout>
    </FormProvider>
  );
};

export default AddReminder;

const styles = StyleSheet.create({});
