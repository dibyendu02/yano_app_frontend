/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {FC, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Controller, FieldError, useFormContext} from 'react-hook-form';
import {TextInput, TextInputProps} from 'react-native-paper';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Colors} from '../../../../../constants/Colors';
import {StaticImage} from '../../../../../assets/images';

interface FormTimeInputProps extends TextInputProps {
  name: string;
  rules?: object;
  label?: string;
  placeholder?: string;
}

const FormTimeInput: FC<FormTimeInputProps> = ({
  name,
  label,
  rules = {},
  placeholder,
  ...inputProps
}) => {
  const {control} = useFormContext();
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirm = (time: Date) => {
    setSelectedTime(time);
    hideTimePicker();
  };

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
              value={value ? moment(value).format('HH:mm') : ''}
              outlineStyle={styles.outline}
              cursorColor={Colors.Black}
              selectionColor={Colors.Black}
              editable={false}
              placeholder={placeholder}
              right={
                <TextInput.Icon
                  icon={() => (
                    <Image
                      source={StaticImage.ClockIcon}
                      style={{width: 30, height: 30}}
                    />
                  )}
                  onPress={showTimePicker}
                  size={25}
                  color={Colors.Grey}
                  forceTextInputFocus={false}
                />
              }
              {...inputProps}
            />
            <DateTimePickerModal
              isVisible={isTimePickerVisible}
              mode="time"
              onConfirm={time => {
                handleConfirm(time);
                onChange(time);
              }}
              onCancel={hideTimePicker}
            />
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
});

export default FormTimeInput;
