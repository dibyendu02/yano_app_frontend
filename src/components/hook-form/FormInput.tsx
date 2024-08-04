import React, {FC} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {Controller, Control, FieldValues, FieldError} from 'react-hook-form';
import {Colors} from '../../constants/Colors';
import {TextInputProps} from 'react-native-paper';
import {FormInputType} from './types';

interface FormInputProps extends TextInputProps {
  name: string;
  control: Control<FieldValues, object>;
  rules?: object;
  label?: string;
  type?: FormInputType;
}

const FormInput: FC<FormInputProps> = ({
  name,
  control,
  label,
  rules = {},
  type = FormInputType.Default,
  ...inputProps
}) => {
  const defaultRules = {};
  return (
    <View style={styles.inputBox}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Controller
        control={control}
        rules={{...defaultRules, ...rules}}
        render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
          <View>
            <TextInput
              style={[styles.input, error && styles.errorInput]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              {...inputProps}
            />
            {error && (
              <Text style={styles.errorText}>
                {(error as FieldError).message}
              </Text>
            )}
          </View>
        )}
        name={name}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
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
    borderRadius: 8,
    marginTop: 5,
    borderWidth: 1,
    borderColor: Colors.LightGray,
    paddingHorizontal: 15,
    fontSize: 16,
    paddingRight: 40,
    height: 56,
    color: Colors.Blue,
  },
  padRight: {
    paddingRight: 40,
  },
});

export default FormInput;
