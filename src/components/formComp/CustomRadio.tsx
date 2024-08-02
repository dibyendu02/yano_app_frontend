// CustomRadioButton.tsx
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Controller, Control, FieldValues, FieldError} from 'react-hook-form';
import {CheckCircleIcon, CheckIcon} from '../../assets/icon/IconNames';
import {Colors} from '../../constants/Colors';

interface Option {
  label: string;
  value: string;
}

interface CustomRadioButtonProps {
  name: string;
  label?: string;
  control: Control<FieldValues, object>;
  rules?: object;
  options: Option[];
}

const CustomRadioButton: React.FC<CustomRadioButtonProps> = ({
  name,
  control,
  rules = {},
  options,
  label,
}) => {
  return (
    <View style={styles.inputBox}>
      {label && <Text style={styles.textLabel}>{label}</Text>}
      <Controller
        control={control}
        rules={rules}
        render={({field: {onChange, value}, fieldState: {error}}) => (
          <View style={styles.container}>
            {options.map(option => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.optionContainer,
                  {
                    borderColor:
                      value === option.value ? Colors.Green : Colors.LightGray,
                  },
                ]}
                onPress={() => onChange(option.value)}>
                {value === option.value ? <CheckCircleIcon /> : <CheckIcon />}
                <Text style={styles.label}>{option.label}</Text>
              </TouchableOpacity>
            ))}
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
  container: {
    marginVertical: 10,
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
  optionContainer: {
    width: '48%',
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: Colors.White,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.LightGray,
  },
  label: {
    marginLeft: 8,
    fontSize: 16,
    color: Colors.Blue,
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  inputBox: {
    marginBottom: 0,
  },
  textLabel: {
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
    height: 56,
    paddingHorizontal: 15,
    fontSize: 16,
  },
});

export default CustomRadioButton;
