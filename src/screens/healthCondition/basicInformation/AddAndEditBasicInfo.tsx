import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Text,
} from 'react-native';
import {Colors} from '../../../constants/Colors';
import FilledButton from '../../../components/buttons/FilledButton';
import {useForm, FormProvider} from 'react-hook-form';
import CommonHeader from '../components/CommonHeader';
import FormSelectionInput from '../../../components/hook-form/FormSelectionInput';
import FormPickerInputInput from '../../../components/hook-form/FormPickerInput';
import {retrieveData} from '../../../utils/Storage';
import Modal from 'react-native-modal';
import {updatePatient} from '../../../api/PUT/auth';
import {staticIcons} from '../../../assets/image';
import {CloseIcon} from '../../../assets/icon/IconNames';
import {userData} from '../../../test/Data';
import UserContext from '../../../contexts/UserContext';

interface FormValues {
  height: string;
  weight: string;
  bloodGroup: string;
}

const AddAndEditBasicInfo = ({navigation, route}: any) => {
  let data = null;
  if (route?.params) {
    data = route.params.data;
  }

  // State for form management
  const [requiredUserId, setRequiredUserId] = useState('');
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [userType, setUserType] = useState('');
  const [saved, setSaved] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const {login} = useContext(UserContext);

  // Initialize form with useForm and set defaultValues correctly
  const methods = useForm<FormValues>({
    defaultValues: {
      height: data?.height || '',
      weight: data?.weight || '',
      bloodGroup: data?.bloodGroup || '',
    },
  });

  // Watch form values to detect changes
  const watchedValues = methods.watch();

  // Function to check if the form values have changed
  const checkIfFormChanged = () => {
    if (!data) return true; // If no initial data, consider form changed
    return (
      watchedValues.height !== data?.height ||
      watchedValues.weight !== data?.weight ||
      watchedValues.bloodGroup !== data?.bloodGroup
    );
  };

  // Enable/Disable save button based on form changes
  useEffect(() => {
    const isFormChanged = checkIfFormChanged();
    setDisabled(!isFormChanged);
  }, [watchedValues, data]);

  // Update requiredUserId only once when component mounts or params change
  useEffect(() => {
    if (route?.params?.requiredUserId) {
      setRequiredUserId(route?.params?.requiredUserId);
    }
  }, [route?.params?.requiredUserId]);

  // Reset form values whenever the `data` changes
  useEffect(() => {
    if (data) {
      methods.reset({
        height: data?.height || '',
        weight: data?.weight || '',
        bloodGroup: data?.bloodGroup || '',
      });
    }
  }, [data, methods]);

  // Fetch user data (token, userId, userType) when component mounts
  useEffect(() => {
    getUserData();
  }, []);

  // Function to retrieve user data from local storage
  const getUserData = async () => {
    const retrievedToken = await retrieveData('token');
    const retrievedUserId = await retrieveData('userId');
    const retrievedUserType = await retrieveData('userType');

    setToken(retrievedToken);
    setUserId(retrievedUserId);
    setUserType(retrievedUserType);
  };

  // Submit handler for the form
  const onSubmit = async (formData: FormValues) => {
    console.log(formData);
    const structuredData = {
      height: formData?.height,
      weight: formData?.weight,
      bloodType: formData.bloodGroup,
    };
    if (data) {
      try {
        console.log('edit user');
        const res = await updatePatient({
          data: structuredData,
          token,
          userId: requiredUserId ? requiredUserId : userId,
          type: 'json',
        });
        console.log('user dataaaaa ', res);
        login(res?.userData);
        setSaved(true);
        setTimeout(() => {
          setSaved(false);
        }, 2000);
        setTimeout(() => {
          navigation.goBack();
        }, 3000);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        // await AddHospitalizationData({data: StructuredData, token});
        navigation.goBack();
      } catch (error) {
        console.error(error);
      }
    }
  };

  console.log(requiredUserId);
  console.log(userId);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.GhostWhite,
        position: 'relative',
      }}>
      <CommonHeader
        title={data ? 'Edit' : 'Add'}
        rightComp1={
          <FilledButton
            type="blue"
            label="Save"
            onPress={methods.handleSubmit(onSubmit)}
            disabled={disabled}
            style={{
              width: 70,
              paddingVertical: 10,
              borderRadius: 10,
            }}
          />
        }
      />
      <ScrollView style={{paddingVertical: 12, width: '94%', margin: 'auto'}}>
        <View>
          <View style={styles.inputBox}>
            <FormProvider {...methods}>
              <FormPickerInputInput
                name="height"
                label="Height"
                placeholder="Select your height"
                optionsListLabel="Select your height"
                optionsListHeight={500}
              />
              <FormPickerInputInput
                name="weight"
                label="Weight"
                placeholder="Select your weight"
                optionsListLabel="Select your weight"
                optionsListHeight={500}
              />
              <FormSelectionInput
                name="bloodGroup"
                label="Blood Group"
                optionsListLabel="Choose your blood type"
                options={[
                  {label: 'A Positivo (A+)', id: 'A+'},
                  {label: 'A Negativo (A-)', id: 'A-'},
                  {label: 'B Positivo (B+)', id: 'B+'},
                  {label: 'B Negativo (B-)', id: 'B-'},
                  {label: 'AB Positivo (AB+)', id: 'AB+'},
                  {label: 'AB Negativo (AB-)', id: 'AB-'},
                  {label: 'O Positivo (O+)', id: 'O+'},
                  {label: 'O Negativo (O-)', id: 'O-'},
                ]}
                selectedId={data?.bloodGroup || 'O+'}
                showActionButtons={true}
                optionsListHeight={500}
              />
            </FormProvider>
          </View>
        </View>
      </ScrollView>
      <Modal
        isVisible={saved}
        onBackdropPress={() => setSaved(false)}
        onSwipeComplete={() => setSaved(false)}
        swipeDirection="down"
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={0} // Adjust the opacity of the background
        animationInTiming={1000}
        animationOutTiming={3000}
        style={styles.modal}>
        <View style={styles.modalContent}>
          <View style={{flexDirection: 'row', gap: 10}}>
            <Image
              source={staticIcons.checkcircle}
              style={{
                height: 20,
                width: 20,
                objectFit: 'contain',
                tintColor: 'white',
              }}
            />
            <Text style={styles.modalText}>The changes have been made.</Text>
          </View>
          <CloseIcon color="white" />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    // marginBottom: 20,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: Colors.Green,
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
    marginBottom: 20,
    marginLeft: 60,
  },
  modalText: {
    color: Colors.White,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default AddAndEditBasicInfo;
