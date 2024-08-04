// CustomCheckbox.tsx
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Controller, Control, FieldValues, FieldError} from 'react-hook-form';
import {Checkbox, CheckboxOutline} from '../../assets/icon/IconNames';
import {Colors} from '../../constants/Colors';
import {Pressable} from 'react-native';

interface CustomCheckboxProps {
  name: string;
  control: Control<FieldValues, object>;
  rules?: object;
  label: string;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  name,
  control,
  rules = {},
  label,
}) => {
  return (
    <Controller
      control={control}
      rules={rules}
      render={({field: {onChange, value}, fieldState: {error}}) => (
        <View style={[styles.container, value && {borderColor: Colors.Green}]}>
          <Pressable
            style={styles.checkboxContainer}
            onPress={() => onChange(!value)}>
            <>{value ? <Checkbox /> : <CheckboxOutline />}</>
            <Text style={styles.label}>{label}</Text>
          </Pressable>
          {error && (
            <Text style={styles.errorText}>
              {(error as FieldError).message}
            </Text>
          )}
        </View>
      )}
      name={name}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    backgroundColor: Colors.White,
    height: 56,
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: Colors.LightGray,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginLeft: 8,
    fontSize: 18,
    color: Colors.Blue,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});

export default CustomCheckbox;
