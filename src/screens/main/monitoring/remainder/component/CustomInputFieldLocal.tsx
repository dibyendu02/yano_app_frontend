import React, {FC} from 'react';
import {View, Text, TextInput, StyleSheet, TextInputProps} from 'react-native';
import {Controller, Control, FieldValues, FieldError} from 'react-hook-form';
import {Colors} from '../../../../../constants/Colors';
import {DateIcon} from '../../../../../assets/icon/IconNames';

interface CustomInputProps extends TextInputProps {
  name: string;
  control?: Control<FieldValues, object>;
  rules?: object;
  label?: string;
  icon?: React.ReactNode;
}

const CustomInputFieldLocal: FC<CustomInputProps> = ({
  name,
  control,
  label,
  icon,
  rules = {},
  ...inputProps
}) => {
  return (
    <View style={styles.inputBox}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Controller
        control={control}
        rules={rules}
        render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
          <View style={{position: 'relative'}}>
            <TextInput
              style={[styles.input, error && styles.errorInput]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholderTextColor={Colors.SteelBlue}
              {...inputProps}
            />
            {icon && (
              <View
                style={{
                  position: 'absolute',
                  top: 20,
                  right: 15,
                  zIndex: 1,
                  backgroundColor: Colors.White,
                }}>
                {icon}
              </View>
            )}
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
    marginBottom: 5,
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
    paddingLeft: 22,
    paddingRight: 10,
    fontSize: 16,
    // paddingRight: 40,
    // height: 56,
    paddingVertical: 12,
    color: Colors.Blue,
  },
  padRight: {
    paddingRight: 40,
  },
});

export default CustomInputFieldLocal;
