import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import Header from '../../../components/header/Header';
import {useForm, FormProvider} from 'react-hook-form';
import FormInput from '../../../components/hook-form/FormInput';
import FilledButton from '../../../components/buttons/FilledButton';
import CustomCheckbox from '../../../components/formComp/CustomCheckbox';
import {Colors} from '../../../constants/Colors';
import BottomSheet from '../../../components/bottom-sheet/BottomSheet';
import {navigate, replace} from '../../../navigation/RootNavigation';
import {DummyImage} from '../../../assets/dummy/images';

const RegisterGlucometer = ({navigation}: any) => {
  // Initializing useForm with the required options
  const methods = useForm({
    mode: 'onChange',
  });

  const {handleSubmit, control, watch} = methods;

  // State to control bottom sheet visibility
  const [showInfoSheet, setShowInfoSheet] = useState(false);

  // Function to handle form submission
  const onSubmit = (data: any) => {
    // Log the form data, including serial number and checkbox state
    console.log('Serial Number:', data.serialNumber);
    console.log('Save Serial State:', data.saveSerial);

    replace('SyncGlucometer', {Sn: data.serialNumber});
  };

  // Function to toggle the bottom sheet visibility
  const handleInfoPress = () => {
    setShowInfoSheet(true);
  };

  return (
    <FormProvider {...methods}>
      <View style={styles.container}>
        <Header title="Register YANO® Glucometer" />

        <View style={styles.formContainer}>
          {/* Input field for Serial Number */}
          <FormInput
            name="serialNumber"
            label="Enter the serial number of the device"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Please enter the serial number',
              },
            }}
            instruction="Look for the serial number on the back of your Yano® glucometer."
            error={
              watch('serialNumber')?.length < 1 &&
              'Please enter the serial number'
            }
            onInfoPress={handleInfoPress} // Pass the info press handler
          />

          {/* Checkbox for saving serial number */}
          <View style={styles.checkboxContainer}>
            <CustomCheckbox
              label="Keep the serial number of your device for future use"
              name="saveSerial"
              control={control}
              onChange={(value: boolean) =>
                methods.setValue('saveSerial', value)
              }
            />
          </View>
        </View>

        {/* Bottom-aligned Submit Button */}
        <View style={styles.buttonContainer}>
          <View
            style={[
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
              },
            ]}>
            <FilledButton
              label={'Cancel'}
              type={'lightGrey'}
              style={{
                width: '48%',
              }}
              onPress={() => {}}
              activeOpacity={0.8}
            />
            <FilledButton
              label={'Continue'}
              type={'blue'}
              style={{
                width: '48%',
              }}
              onPress={handleSubmit(onSubmit)} // Use handleSubmit here to capture form data
              activeOpacity={0.8}
            />
          </View>
        </View>

        {/* Bottom Sheet for Info */}
        <BottomSheet
          isVisible={showInfoSheet}
          onBackdropPress={() => setShowInfoSheet(false)}>
          <View style={styles.bottomSheetContent}>
            <Image
              source={DummyImage.glucometerBack}
              style={{width: 300, height: 400, objectFit: 'contain'}}
            />
            <Text style={styles.bottomSheetText}>
              The device serial number is located under the barcode.
            </Text>
            <FilledButton
              label="Close"
              type="blueGrey"
              onPress={() => setShowInfoSheet(false)}
            />
          </View>
        </BottomSheet>
      </View>
    </FormProvider>
  );
};

export default RegisterGlucometer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.GhostWhite,
  },
  formContainer: {
    flex: 1, // Takes remaining space
    paddingVertical: 12,
    width: '94%',
    alignSelf: 'center',
    justifyContent: 'flex-start', // Align content to the top
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  checkbox: {
    backgroundColor: Colors.White,
    borderWidth: 0,
    padding: 0,
    margin: 0,
  },
  checkboxText: {
    color: Colors.SteelBlue,
  },
  buttonContainer: {
    padding: 10,
    width: '100%',
    backgroundColor: Colors.White,
    position: 'absolute', // Fix position at bottom
    bottom: 0,
  },
  bottomSheetContent: {
    padding: 20,
    paddingBottom: 0,
    alignItems: 'center',
  },
  bottomSheetText: {
    color: Colors.Blue,
    fontSize: 20,
    marginVertical: 20,
    fontWeight: '600',
  },
});
