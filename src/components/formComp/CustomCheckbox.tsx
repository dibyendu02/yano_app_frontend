import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Controller, Control, FieldValues, FieldError} from 'react-hook-form';
import {Pressable} from 'react-native';
import {staticIcons} from '../../assets/image';
import {Colors} from '../../constants/Colors';

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
        <View
          style={[
            styles.container,
            value && {borderColor: Colors.LightGreen, borderWidth: 2},
          ]}>
          <Pressable
            style={styles.checkboxContainer}
            onPress={() => onChange(!value)}>
            <>
              {value ? (
                <Image
                  source={staticIcons.CheckBoxIcon}
                  style={{width: 20, height: 20, objectFit: 'contain'}}
                />
              ) : (
                <Image
                  source={staticIcons.BlankCheckBoxIcon}
                  style={{
                    width: 20,
                    height: 20,
                    objectFit: 'contain',
                    tintColor: Colors.Grey,
                  }}
                />
              )}
            </>

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
    marginBottom: 10,
    backgroundColor: Colors.White,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.LightGray,
    width: '100%', // Full width
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Align items at the top to allow text wrapping
  },
  label: {
    flex: 1, // Take up remaining space and allow for text wrapping
    marginLeft: 15, // Maintain gap between checkbox and label
    fontSize: 14,
    color: Colors.Blue,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});

export default CustomCheckbox;
