/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {FC, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Controller, FieldError, useFormContext} from 'react-hook-form';
import {Colors} from '../../constants/Colors';
import {TextInput, TextInputProps} from 'react-native-paper';
import moment from 'moment';
import {StaticImage} from '../../assets/images';
import DateTimePicker from 'react-native-ui-datepicker';
import DialogBase from '../dialog/DialogBase';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
interface FormDateInputProps extends TextInputProps {
  name: string;
  rules?: object;
  label?: string;
  placeholder?: string;
  buttonColor?: string;
}

const FormDateInput: FC<FormDateInputProps> = ({
  name,
  label,
  rules = {},
  placeholder,
  buttonColor,
  ...inputProps
}) => {
  const {control} = useFormContext();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <View style={styles.inputBox}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Controller
        control={control}
        rules={{...rules}}
        render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
          <View>
            <TextInput
              style={[styles.input, error && styles.errorInput]}
              mode="outlined"
              outlineColor="transparent"
              activeOutlineColor="transparent"
              onBlur={onBlur}
              value={value ? moment(value).format('DD-MM-YYYY') : ''}
              outlineStyle={styles.outline}
              cursorColor={Colors.Black}
              selectionColor={Colors.Black}
              editable={false}
              placeholder={placeholder}
              right={
                <TextInput.Icon
                  icon={() => (
                    <Image
                      source={StaticImage.CalenderIcon}
                      style={{width: 30, height: 30, tintColor: buttonColor}}
                    />
                  )}
                  onPress={() => setShowDatePicker(true)}
                  size={25}
                  color={Colors.Grey}
                  forceTextInputFocus={false}
                />
              }
              {...inputProps}
            />
            {/* <DatePicker
              mode="date"
              modal
              open={showDatePicker}
              date={value ? new Date(value) : new Date()}
              onConfirm={date => {
                onChange(date);
                setShowDatePicker(false);
              }}
              onCancel={() => {
                setShowDatePicker(false);
              }}
            /> */}
            <DialogBase
              isVisible={showDatePicker}
              onBackdropPress={() => setShowDatePicker(false)}>
              <View
                style={{
                  backgroundColor: Colors.White,
                  width: '92%',
                  borderRadius: 10,
                  overflow: 'hidden',
                }}>
                <View
                  style={{
                    backgroundColor: Colors.Blue,
                    height: 100,
                    padding: 20,
                  }}>
                  <Text style={{color: Colors.GreyText}}>
                    {moment(selectedDate).format('YYYY')}
                  </Text>
                  <Text style={{color: Colors.White, fontSize: 36}}>
                    {moment(selectedDate).format('ddd, MMMM D')}
                  </Text>
                </View>
                <View style={{paddingHorizontal: 10}}>
                  <DateTimePicker
                    mode="single"
                    initialView={'day'}
                    date={selectedDate}
                    onChange={({date}) => {
                      //@ts-ignore
                      let _date = new Date(date);
                      setSelectedDate(_date);
                    }}
                    headerTextStyle={{color: Colors.Blue}}
                    headerButtonColor={Colors.Blue}
                    headerContainerStyle={{paddingVertical: 10}}
                    weekDaysContainerStyle={{borderBottomWidth: 0}}
                    weekDaysTextStyle={{color: Colors.GreyText}}
                    locale={{
                      ...dayjs.Ls.en,
                      weekdays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                    }}
                    yearContainerStyle={{
                      backgroundColor: Colors.Transparent,
                      borderWidth: 0,
                    }}
                    calendarTextStyle={{color: Colors.Blue, fontWeight: '400'}}
                    selectedItemColor={Colors.Blue}
                    todayContainerStyle={{
                      borderRadius: 20,
                      height: 40,
                      width: 40,
                      borderColor: Colors.Transparent,
                      backgroundColor: Colors.White,
                    }}
                    todayTextStyle={{
                      color: Colors.Blue,
                    }}
                    dayContainerStyle={{
                      borderRadius: 20,
                      height: 40,
                      width: 40,
                    }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    padding: 20,
                  }}>
                  <Text
                    style={styles.dialogBtn}
                    onPress={() => setShowDatePicker(false)}>
                    Cancel
                  </Text>
                  <Text
                    style={styles.dialogBtn}
                    onPress={() => {
                      onChange(selectedDate);
                      setShowDatePicker(false);
                    }}>
                    Ok
                  </Text>
                </View>
              </View>
            </DialogBase>

            {error && (
              <Text style={styles.errorText}>
                {(error as FieldError).message}
              </Text>
            )}
          </View>
        )}
        name={name}
        defaultValue={undefined}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  errorInput: {
    borderColor: Colors.Red,
    borderRadius: 10,
  },
  errorText: {
    color: Colors.Red,
    marginTop: 2,
  },
  inputBox: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.Blue,
  },
  input: {
    backgroundColor: Colors.White,
    marginTop: 5,
    borderWidth: 1,
    borderColor: Colors.LightGray,
    fontSize: 16,
    height: 56,
    color: Colors.Blue,
  },
  outline: {
    borderRadius: 10,
  },
  dialogBtn: {
    color: Colors.Blue,
    width: 60,
    textAlign: 'right',
    fontWeight: '500',
  },
});

export default FormDateInput;
