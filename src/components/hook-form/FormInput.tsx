import React, {FC, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Controller, FieldError, useFormContext} from 'react-hook-form';
import {Colors} from '../../constants/Colors';
import {TextInput, TextInputProps} from 'react-native-paper';
import {FormInputType} from './types';
interface FormInputProps extends TextInputProps {
  name: string;
  rules?: object;
  label?: string;
  type?: FormInputType;
}

const FormInput: FC<FormInputProps> = ({
  name,
  label,
  rules = {},
  type = FormInputType.Default,
  ...inputProps
}) => {
  const {control} = useFormContext();
  const [showSecureValue, setShowSecureValue] = useState(
    type === FormInputType.Password,
  );
  const defaultRules = {
    [FormInputType.Default]: {},
    [FormInputType.Email]: {
      pattern: {
        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
        message: 'Invalid email address',
      },
    },
    [FormInputType.Password]: {},
  };
  return (
    <View style={styles.inputBox}>
      <Controller
        control={control}
        rules={{...rules, ...defaultRules[type]}}
        render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
          <View>
            {label && (
              <Text style={[styles.label, error && {color: Colors.Red}]}>
                {label}
              </Text>
            )}
            <TextInput
              style={[styles.input, error && styles.errorInput]}
              mode="outlined"
              outlineColor="transparent"
              activeOutlineColor="transparent"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={showSecureValue}
              outlineStyle={styles.outline}
              cursorColor={Colors.Black}
              selectionColor={Colors.Black}
              right={
                type === FormInputType.Password ? (
                  <TextInput.Icon
                    icon={!showSecureValue ? 'eye-off' : 'eye'}
                    onPress={() => setShowSecureValue(!showSecureValue)}
                    size={25}
                    color={Colors.Grey}
                  />
                ) : null
              }
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

export default FormInput;