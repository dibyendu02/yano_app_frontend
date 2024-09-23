// CustomCheckbox.tsx
import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Controller, Control, FieldValues, FieldError} from 'react-hook-form';
import {Checkbox, CheckboxOutline} from '../../assets/icon/IconNames';
import {Colors} from '../../constants/Colors';
import {Pressable} from 'react-native';
import {StaticImage} from '../../assets/images';
import {staticIcons} from '../../assets/image';

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
                  style={{width: 20, height: 20, objectFit: 'contain'}}
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
    height: 56,
    borderRadius: 8,
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
    marginLeft: 15,
    fontSize: 16,
    color: Colors.Blue,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});

export default CustomCheckbox;
