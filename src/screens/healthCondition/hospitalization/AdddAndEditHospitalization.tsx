import React, {useEffect, useState} from 'react';
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
import CustomInputField from '../../../components/formComp/CustomInputField';
import {useForm, Control, FieldValues} from 'react-hook-form';
import {DatePickerField} from '../../../components/form/DatePicker';
import CommonHeader from '../components/CommonHeader';
import Modal from 'react-native-modal';
import {staticIcons} from '../../../assets/image';
import {CloseIcon} from '../../../assets/icon/IconNames';
import {retrieveData} from '../../../utils/Storage';
import {AddHospitalizationData} from '../../../api/POST/medicalHistory';
import {editHospitalizationData} from '../../../api/PUT/medicalHistory';
import moment from 'moment';

interface FormValues {
  name: string;
  reason: string;
  dischargeDate: Date;
  admissionDate: Date;
  doctorName: string;
}

const AddAndEditHospitalization = ({navigation, route}: any) => {
  let data = null;
  if (route?.params) {
    data = route.params.data;
  }
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [userType, setUserType] = useState('');
  const [saved, setSaved] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [defaultValues, setDefaultValues] = useState<FormValues>({
    name: data?.name || '',
    reason: data?.reason || '',
    dischargeDate: data?.dischargeDate || new Date().toISOString(),
    admissionDate: data?.admissionDate || new Date().toISOString(),
    doctorName: data?.doctorName || '',
  });
  const [requiredUserId, setRequiredUserId] = useState(
    data?.requiredUserId || route?.params?.requiredUserId || '',
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<FormValues>({defaultValues});

  const onSubmit = async (formdata: FormValues) => {
    console.log(formdata);

    const formatDischargeDate = moment(formdata?.dischargeDate).toISOString();
    const formatAdmissionDate = moment(formdata?.admissionDate).toISOString();

    const StructuredData = {
      userId: requiredUserId ? requiredUserId : userId,
      hospitalName: formdata?.name,
      reasonOfHospitalization: formdata?.reason,
      dischargeDate: formatDischargeDate,
      admissionDate: formatAdmissionDate,
      nameOfAttendingPhysician: formdata?.doctorName,
    };

    if (data) {
      try {
        console.log('edit surgery');
        await editHospitalizationData({
          data: StructuredData,
          token,
          id: data.id,
          userId: requiredUserId ? requiredUserId : userId,
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
        await AddHospitalizationData({data: StructuredData, token});
        navigation.goBack();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleChange = (id: string, value: string) => {
    setDefaultValues({...defaultValues, [id]: value});
    if (defaultValues.name) setDisabled(false);
    else setDisabled(true);
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
              label="Hospital name"
              name="name"
              control={control as unknown as Control<FieldValues, object>}
              placeholder="Ex. St. John Medical College"
              rules={{required: 'required'}}
            />
            <CustomInputField
              label="Reason"
              name="reason"
              control={control as unknown as Control<FieldValues, object>}
              placeholder="Ex. chest pain, asthma, etc..."
            />
            <DatePickerField
              label="Admission date"
              name="admissionDate"
              value={defaultValues.admissionDate}
              onchange={(name, value) =>
                setDefaultValues({...defaultValues, [name]: value})
              }
            />
            <DatePickerField
              label="Discharge date"
              name="dischargeDate"
              value={defaultValues.dischargeDate}
              onchange={(name, value) =>
                setDefaultValues({...defaultValues, [name]: value})
              }
            />
            <CustomInputField
              label="Name of the attending physician"
              name="doctorName"
              control={control as unknown as Control<FieldValues, object>}
              placeholder="Ex. Dr. House"
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

export default AddAndEditHospitalization;
