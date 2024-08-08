import React, {FC, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Controller, FieldError, useFormContext} from 'react-hook-form';
import {Colors} from '../../constants/Colors';
import {TextInput, TextInputProps} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import {StaticImage} from '../../assets/images';
interface FormDateInputProps extends TextInputProps {
  name: string;
  rules?: object;
  label?: string;
  placeholder?: string;
}

const FormDateInput: FC<FormDateInputProps> = ({
  name,
  label,
  rules = {},
  placeholder,
  ...inputProps
}) => {
  const {control} = useFormContext();
  const [showDatePicker, setShowDatePicker] = useState(false);
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
              value={value ? moment(value).format('DD/MM/YYYY') : ''}
              outlineStyle={styles.outline}
              cursorColor={Colors.Black}
              selectionColor={Colors.Black}
              editable={false}
              placeholder={placeholder}
              right={
                <TextInput.Icon
                  // icon="calendar-range"
                  icon={() => (
                    <Image
                      source={StaticImage.CalenderIcon}
                      style={{width: 30, height: 30}}
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
            <DatePicker
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

export default FormDateInput;
