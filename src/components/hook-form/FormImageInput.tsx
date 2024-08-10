/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { StaticImage } from '../../assets/images';
import { Colors } from '../../constants/Colors';
import Icons from '../../assets/icon/Icon';
import ImagePicker from 'react-native-image-crop-picker';
import BottomSheet from '../bottom-sheet/BottomSheet';
import FilledButton from '../buttons/FilledButton';
import { staticIcons } from '../../assets/image';

interface FormImageProps {
  name: string;
}

const FormImageInput: React.FC<FormImageProps> = ({ name }) => {
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const { control, setValue } = useFormContext();
  const [imagePath, setImagePath] = useState(null);
  const handleImageCapture = (mode: string) => {
    setShowOptionsModal(false);
    setTimeout(() => {
      if (mode === 'Camera') {
        ImagePicker.openCamera({
          width: 300,
          height: 400,
          cropping: true,
        })
          .then(image => {
            setImagePath(
              //@ts-ignore
              Platform.OS === 'ios' ? `file:///${image.path}` : image?.path,
            );
            setValue(name, image);
          })
          .catch(handleError);
      } else {
        ImagePicker.openPicker({
          width: 300,
          height: 400,
          cropping: true,
        })
          .then(image => {
            setImagePath(
              //@ts-ignore
              Platform.OS === 'ios' ? `file:///${image.path}` : image?.path,
            );
            setValue(name, image);
          })
          .catch(handleError);
      }
    }, 1000);
  };
  const handleError = (e: any) => {
    console.log(e);
  };
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { }, fieldState: { } }) => (
        <View style={styles.container}>
          <Image
            source={
              imagePath ? { uri: imagePath } : StaticImage.PersonPlaceholder
            }
            style={{
              height: 100,
              width: 100,
              resizeMode: 'stretch',
              borderRadius: 50,
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
            {/* <Icons.Feather
              name={'edit-2'}
              color={Colors.White}
              size={18}
              onPress={() => setShowOptionsModal(true)}
            /> */}
            <Image source={staticIcons.EditPencil} style={{ width: 14, height: 14, tintColor: '#FFFFFF' }} />
          </View>
          <BottomSheet
            isVisible={showOptionsModal}
            onBackdropPress={() => setShowOptionsModal(false)}>
            <Text
              style={{
                color: Colors.Blue,
                fontWeight: 'bold',
                fontSize: 24,
                marginTop: 10,
                textAlign: 'center',
                marginBottom: 30,
              }}>
              Select a method
            </Text>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-around',
                paddingHorizontal: 10,
              }}>
              <TouchableOpacity
                style={styles.optionContainer}
                onPress={() => handleImageCapture('Camera')}>
                {/* <Icons.Entypo name="camera" size={30} color={Colors.Blue} /> */}
                <Image
                  source={StaticImage.CameraIcon}
                  style={{ width: 30, height: 30 }}
                />
                <Text style={{ color: Colors.Blue, fontSize: 16 }}>Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionContainer}
                onPress={() => handleImageCapture('Gallery')}>
                {/* <Icons.MaterialCommunityIcons
                  name="image-outline"
                  size={30}
                  color={Colors.Blue}
                /> */}
                <Image
                  source={StaticImage.GalleryIcon}
                  style={{ width: 30, height: 30 }}
                />
                <Text style={{ color: Colors.Blue, fontSize: 16 }}>Gallery</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 30,
              }}>
              <FilledButton
                type="lightGrey"
                label="Cancel"
                style={{ width: '92%' }}
                onPress={() => setShowOptionsModal(false)}
              />
            </View>
          </BottomSheet>
        </View>
      )}
    />
  );
};

// Select a method
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
    borderColor: Colors.LightGray,
    borderWidth: 3,
  },
  optionContainer: {
    height: 100,
    width: '45%',
    borderWidth: 1,
    borderColor: Colors.LightGray,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
});
