import React, {useEffect, useState} from 'react';
import {View, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {Colors} from '../../../constants/Colors';
import FilledButton from '../../../components/buttons/FilledButton';
import CustomInputField from '../../../components/formComp/CustomInputField';
import {useForm, Control, FieldValues} from 'react-hook-form';
import CustomTextarea from '../../../components/formComp/TextAreaField';
import {DatePickerField} from '../../../components/form/DatePicker';
import CommonHeader from '../components/CommonHeader';
import {Image} from 'react-native';
import {staticIcons} from '../../../assets/image';
import Modal from 'react-native-modal';
import {Text} from 'react-native';
import {CloseIcon} from '../../../assets/icon/IconNames';
import {retrieveData} from '../../../utils/Storage';
import {postSurgeryData} from '../../../api/POST/medicalHistory';
import {editSurgeryData} from '../../../api/PUT/medicalHistory';

interface FormValues {
  name: string;
  devices: string;
  date: string;
  doctorName: string;
  additionalNotes: string;
}

const AddAndEditSurgeries = ({navigation, route}: any) => {
  let data = null;
  if (route?.params) {
    data = route.params.data;
  }
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [userType, setUserType] = useState('');
  const [saved, setSaved] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [defaultValues, setDefaultValues] = useState<FieldValues>({
    name: data?.name || '',
    devices: data?.devices || '',
    date: data?.date || new Date(),
    doctorName: data?.doctorName || '',
    additionalNotes: data?.additionalNotes || '',
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<FormValues>({defaultValues});

  const onSubmit = async (formdata: FormValues) => {
    const StructuredData = {
      userId,
      surgeryName: formdata.name,
      dateOfSurgery: formdata?.date,
      physicianInCharge: formdata?.doctorName,
      additionalNotes: formdata?.additionalNotes,
      supportDevices: formdata?.devices,
    };

    if (data) {
      try {
        console.log('edit surgery');
        await editSurgeryData({
          data: StructuredData,
          token,
          id: data.id,
          userId,
        });
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
        await postSurgeryData({data: StructuredData, token});
        navigation.goBack();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getUserData = async () => {
    const retrievedToken = await retrieveData('token');
    const retrievedUserId = await retrieveData('userId');
    const retrievedUserType = await retrieveData('userType');

    setToken(retrievedToken);
    setUserId(retrievedUserId);
    setUserType(retrievedUserType);
  };

  useEffect(() => {
    getUserData();
  }, []);

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
            onPress={handleSubmit(onSubmit)}
            disabled={!disabled}
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
            <CustomInputField
              label="Surgery name"
              name="name"
              control={control as unknown as Control<FieldValues, object>}
              placeholder="Ex. Open heart surgery, etc..."
              rules={{required: 'name is required'}}
            />
            <CustomInputField
              label="Implants / Support Devices"
              name="devices"
              control={control as unknown as Control<FieldValues, object>}
              placeholder="Ex. Cardiac pacemaker, etc..."
            />
            <DatePickerField
              label="Surgery date"
              name="date"
              value={defaultValues.date}
              onchange={(name, value) =>
                setDefaultValues({...defaultValues, [name]: value})
              }
            />
            <CustomInputField
              label="Physician in charge"
              name="doctorName"
              control={control as unknown as Control<FieldValues, object>}
              placeholder="Ex. Dr. House"
            />
            <CustomTextarea
              label="Additional notes"
              name="additionalNotes"
              control={control as unknown as Control<FieldValues, object>}
              // placeholder="Text"
            />
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
    marginBottom: 20,
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

export default AddAndEditSurgeries;
