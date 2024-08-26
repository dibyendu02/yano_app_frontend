import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {Controller, Control, FieldValues, FieldError} from 'react-hook-form';
import {Colors} from '../../../../constants/Colors';
import ExpandMore from '../../../../assets/icon/expand_more.svg';
interface Option {
  label: string;
  value: string | number;
}

interface CustomSelectProps {
  name: string;
  control: Control<FieldValues, object>;
  rules?: object;
  options?: Option[];
  placeholder?: string;
  label?: string;
  onClick?: () => void;
  text?: string;
}

const CustomSelectLocal: React.FC<CustomSelectProps> = ({
  name,
  label,
  text,
  control,
  rules = {},
  options,
  placeholder,
  onClick = () => {},
}) => {
  return (
    <View style={styles.inputBox}>
      {label && <Text style={styles.label}>{label}</Text>}
      {/* <Controller
        control={control}
        rules={rules}
        render={({field: {onChange, value}, fieldState: {error}}) => (
          <>
            <RNPickerSelect
              onValueChange={onChange}
              items={options}
              value={value}
              placeholder={{
                label: placeholder || 'Select an option',
                value: null,
              }}
              style={pickerSelectStyles}
            />
            {error && (
              <Text style={styles.errorText}>
                {(error as FieldError).message}
              </Text>
            )}
          </>
        )}
        name={name}
      /> */}
      <TouchableOpacity onPress={onClick}>
        <View
          style={{
            backgroundColor: Colors.White,
            borderRadius: 8,
            marginTop: 5,
            borderWidth: 1,
            borderColor: Colors.LightGray,
            height: 56,
            paddingHorizontal: 15,
            justifyContent: 'center',
            flexDirection: 'row', // Align items in a row
            alignItems: 'center', // Center items vertically
          }}>
          <Text
            style={{
              fontSize: 16,
              color: Colors.SteelBlue,
              flex: 1, // Allow text to take up available space
            }}>
            {text ? text : 'Selecciona la relación'}
          </Text>

          <ExpandMore fill={Colors.Blue} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  inputBox: {
    marginBottom: 15,
    color: Colors.Blue,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.Blue,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
  },
  inputAndroid: {
    backgroundColor: Colors.White,
    borderRadius: 8,
    marginTop: 5,
    borderWidth: 1,
    borderColor: Colors.LightGray,
    height: 56,
    paddingHorizontal: 15,
    fontSize: 16,
    paddingRight: 30,
    color: Colors.Blue,
  },
});

export default CustomSelectLocal;
