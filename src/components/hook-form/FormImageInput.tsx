/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import {StaticImage} from '../../assets/images';
import {Colors} from '../../constants/Colors';
import Icons from '../../assets/icon/Icon';

interface FormImageProps {
  name: string;
}

const FormImageInput: React.FC<FormImageProps> = ({name}) => {
  const {control} = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({field: {}, fieldState: {}}) => (
        <View style={styles.container}>
          <Image
            source={StaticImage.PersonPlaceholder}
            style={{
              height: 100,
              width: 100,
              resizeMode: 'stretch',
            }}
          />
          <View
            style={{
              position: 'absolute',
              right: 0,
              top: '5%',
              backgroundColor: Colors.Blue,
              padding: 6,
              borderRadius: 50,
            }}>
            <Icons.Feather name={'edit-2'} color={Colors.White} size={18} />
          </View>
        </View>
      )}
    />
  );
};

export default FormImageInput;

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    backgroundColor: Colors.White,
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
});
