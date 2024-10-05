import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  ToastAndroid,
  Alert,
} from 'react-native';
import {FormProvider, useForm} from 'react-hook-form';
import FormInput from '../../../components/hook-form/FormInput';
import FilledButton from '../../../components/buttons/FilledButton';
import CustomCheckbox from '../../../components/formComp/CustomCheckbox';
import {Colors} from '../../../constants/Colors';
import BottomSheet from '../../../components/bottom-sheet/BottomSheet';
import {replace} from '../../../navigation/RootNavigation';
import {updatePatient} from '../../../api/PUT/auth'; // Ensure this path is correct
import moment from 'moment';
import {retrieveData} from '../../../utils/Storage';
import UserContext from '../../../contexts/UserContext';
import {DummyImage} from '../../../assets/dummy/images';
import Header from '../../../components/header/Header';
import {addGlucometerData} from '../../../api/POST/bloodGlucose';

const RegisterGlucometer = ({navigation}: any) => {
  // Access the user data from the context
  const {userData, login} = useContext(UserContext);
  const [token, setToken] = useState(''); // Ensure token is available
  const [userId, setUserId] = useState(''); // Ensure userId is available

  const methods = useForm({
    mode: 'onChange',
  });

  const {handleSubmit, control, watch} = methods;

  // State to control bottom sheet visibility
  const [showInfoSheet, setShowInfoSheet] = useState(false);

  useEffect(() => {
    // Fetch user data like token and userId from storage if necessary
    const getUserData = async () => {
      const retrievedToken = await retrieveData('token');
      const retrievedUserId = await retrieveData('userId');
      setToken(retrievedToken);
      setUserId(retrievedUserId);
    };
    getUserData();
  }, []);

  // Function to handle form submission and update profile
  const onSubmit = async (data: any) => {
    try {
      if (data.saveSerial) {
        // Prepare glucometer device data
        const glucometerData = {
          deviceName: 'Glucometer',
          deviceSerialNumber: data.serialNumber,
          deviceType: 'glucometer',
        };

        // Send the glucometer data to the backend
        const res = await addGlucometerData({
          data: glucometerData,
          userId,
          token,
        });

        console.log('Response of adding glucometer:', res);

        // Update user context with the new data
        login(res?.userData);

        // Redirect to SyncGlucometer screen with the serial number
        replace('SyncGlucometer', {Sn: data.serialNumber});
      } else {
        // If saveSerial is not checked, proceed to sync screen without saving device data
        replace('SyncGlucometer', {Sn: data.serialNumber});
      }
    } catch (error) {
      console.error('Error updating patient profile with device data:', error);
      showToast('Failed to register device. Please try again.');
    }
  };

  const showToast = message => {
    if (Platform.OS === 'android') {
      ToastAndroid.showWithGravity(
        message,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    } else {
      Alert.alert('Notification', message);
    }
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
              label="Keep the serial number of your device for future use."
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
            style={[{flexDirection: 'row', justifyContent: 'space-between'}]}>
            <FilledButton
              label={'Cancel'}
              type={'lightGrey'}
              style={{width: '48%'}}
              onPress={() => {
                navigation.goBack();
              }}
              activeOpacity={0.8}
            />
            <FilledButton
              label={'Continue'}
              type={'blue'}
              style={{width: '48%'}}
              onPress={handleSubmit(onSubmit)} // Handle form submission
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
              style={{width: 300, height: 400, resizeMode: 'contain'}}
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
    flex: 1,
    paddingVertical: 12,
    width: '94%',
    alignSelf: 'center',
    justifyContent: 'flex-start',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonContainer: {
    padding: 10,
    width: '100%',
    backgroundColor: Colors.White,
    position: 'absolute',
    bottom: 0,
  },
  bottomSheetContent: {
    padding: 20,
    alignItems: 'center',
  },
  bottomSheetText: {
    color: Colors.Blue,
    fontSize: 20,
    marginVertical: 20,
    fontWeight: '600',
  },
});
