import React, {useEffect, useState} from 'react';
import {View, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {Colors} from '../../../constants/Colors';
import FilledButton from '../../../components/buttons/FilledButton';
import CustomInputField from '../../../components/formComp/CustomInputField';
import {useForm, Control, FieldValues, useWatch} from 'react-hook-form';
import CustomTextarea from '../../../components/formComp/TextAreaField';
import {DatePickerField} from '../../../components/form/DatePicker';
import CommonHeader from '../components/CommonHeader';
import Modal from 'react-native-modal';
import {Image} from 'react-native';
import {Text} from 'react-native';
import {CloseIcon} from '../../../assets/icon/IconNames';
import {staticIcons} from '../../../assets/image';
import {retrieveData} from '../../../utils/Storage';
import {AddVaccineData} from '../../../api/POST/medicalHistory';
import {editVaccineData} from '../../../api/PUT/medicalHistory';

interface FormValues {
  vaccineName: string;
  vaccineFor: string;
  shotDate: Date;
  vaccineDetails: string;
  lotNumber: string;
  additionalNotes: string;
}

const AddAndEditVaccine = ({navigation, route}: any) => {
  let data = null;
  if (route?.params) {
    data = route.params.data;
  }

  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [userType, setUserType] = useState('');
  const [saved, setSaved] = useState(false);
  const [disabled, setDisabled] = useState(true);

  // Initialize useForm and set default values directly in reset
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: {errors},
  } = useForm<FormValues>();

  // Use effect to reset form with new data
  useEffect(() => {
    if (data) {
      reset({
        vaccineName: data?.name || '',
        vaccineFor: data?.vaccineFor || '',
        shotDate: data?.shotDate || null,
        vaccineDetails: data?.vaccineDetails || '',
        lotNumber: data?.lotNumber || '',
        additionalNotes: data?.additionalNotes || '',
      });
    }
  }, [data, reset]);

  const onSubmit = async (formdata: FormValues) => {
    const StructuredData = {
      userId,
      vaccineName: formdata?.vaccineName,
      vaccineFor: formdata?.vaccineFor,
      shotDate: formdata?.shotDate,
      vaccineDetails: formdata?.vaccineDetails,
      lotNumber: formdata?.lotNumber,
      additionalNotes: formdata?.additionalNotes,
    };

    if (data) {
      try {
        await editVaccineData({
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
        await AddVaccineData({data: StructuredData, token});
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

  // Watch for changes in form values
  const currentFormValues = watch();

  // Compare current form values with the initial data to enable the Save button if any changes occur
  useEffect(() => {
    const hasChanges =
      currentFormValues.vaccineName !== data?.name ||
      currentFormValues.vaccineFor !== data?.vaccineFor ||
      currentFormValues.shotDate?.toString() !== data?.shotDate?.toString() ||
      currentFormValues.vaccineDetails !== data?.vaccineDetails ||
      currentFormValues.lotNumber !== data?.lotNumber ||
      currentFormValues.additionalNotes !== data?.additionalNotes;

    setDisabled(!hasChanges);
  }, [currentFormValues, data]);

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
            <CustomInputField
              label="Vaccination for"
              name="vaccineFor"
              control={control as unknown as Control<FieldValues, object>}
              placeholder="Ex. Covid 19, VPH, etc..."
              rules={{required: 'This field is required'}}
            />
            <DatePickerField
              label="Shot date"
              name="shotDate"
              value={watch('shotDate')}
              onchange={(name, value) => reset({...watch(), [name]: value})}
            />
            <CustomInputField
              label="Vaccine name"
              name="vaccineName"
              control={control as unknown as Control<FieldValues, object>}
              placeholder="Ex. Verocell"
            />
            <CustomInputField
              label="Vaccine details"
              name="vaccineDetails"
              control={control as unknown as Control<FieldValues, object>}
              placeholder="Ex. First dose"
            />
            <CustomInputField
              label="Lot number"
              name="lotNumber"
              control={control as unknown as Control<FieldValues, object>}
              placeholder="Ex. #U45RT5"
            />
            <CustomTextarea
              label="Additional notes"
              name="additionalNotes"
              control={control as unknown as Control<FieldValues, object>}
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
        backdropOpacity={0}
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

export default AddAndEditVaccine;
