import React, {useEffect, useState} from 'react';
import {View, StyleSheet, SafeAreaView, ScrollView, Text} from 'react-native';
import {Colors} from '../../../constants/Colors';
import CommonHeader from '../components/CommonHeader';
import FilledButton from '../../../components/buttons/FilledButton';
import {useForm, FormProvider} from 'react-hook-form';
import CustomInputField from '../../../components/formComp/CustomInputField';
import CustomTextarea from '../../../components/formComp/TextAreaField';
import CustomCheckbox from '../../../components/formComp/CustomCheckbox';
import {DatePickerField} from '../../../components/form/DatePicker';
import FormSelectionInput from '../../../components/hook-form/FormSelectionInput';
import Modal from 'react-native-modal';
import {Image} from 'react-native';
import {staticIcons} from '../../../assets/image';
import {CloseIcon} from '../../../assets/icon/IconNames';
import {retrieveData} from '../../../utils/Storage';
import {postMedicineData} from '../../../api/POST/medicalHistory';
import {editMedicineData} from '../../../api/PUT/medicalHistory';

interface FormValues {
  name: string;
  volume: string;
  unit: string;
  formOfMedicine: string;
  ingestionMethod: string;
  amount: number;
  frequency: string;
  when: string;
  otherInstructions: string;
  whenItBegins: Date;
  whenItEnds: Date;
  longDuration: boolean;
  medicineTakenFor: string;
  prescribedBy: string;
  sideEffects: string;
}

const AddAndEditMedicine = ({navigation, route}: any) => {
  let data = null;
  if (route?.params) {
    data = route.params.data;
  }
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [userType, setUserType] = useState('');
  const [saved, setSaved] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [isUntilDisabled, setIsUntilDisabled] = useState(false);
  const [requiredUserId, setRequiredUserId] = useState(
    data?.requiredUserId || route?.params?.requiredUserId || '',
  );
  console.log(requiredUserId);

  // Initialize useForm with defaultValues
  const methods = useForm<FormValues>({
    defaultValues: {
      name: data?.name || '',
      volume: data?.volume || '',
      unit: data?.unit || '',
      formOfMedicine: data?.formOfMedicine || '',
      ingestionMethod: data?.ingestionMethod || '',
      amount: data?.amount || 0,
      frequency: data?.frequency || '',
      when: data?.when || '',
      otherInstructions: data?.otherInstructions || '',
      whenItBegins: data?.whenItBegins || new Date(),
      whenItEnds: data?.whenItEnds || new Date(),
      longDuration: data?.longDuration || false,
      medicineTakenFor: data?.medicineTakenFor || '',
      prescribedBy: data?.prescribedBy || '',
      sideEffects: data?.sideEffects || '',
    },
  });

  const {control, handleSubmit, watch, setValue} = methods;

  const onSubmit = async (formdata: FormValues) => {
    const structuredData = {
      userId: requiredUserId && userType == 'doctor' ? requiredUserId : userId,
      medicineName: formdata.name,
      formOfMedication: {
        formOfMedicine: formdata.formOfMedicine,
        medicineStrength: formdata.volume,
        medicineStrengthUnit: formdata.unit,
        ingestionMethod: formdata.ingestionMethod,
      },
      doses: {
        amount: formdata.amount,
        frequency: formdata.frequency,
        when: formdata.when,
        otherInstructions: formdata.otherInstructions,
      },
      duration: {
        whenItBegins: formdata.whenItBegins,
        whenItEnds: formdata.whenItEnds,
        longDuration: formdata.longDuration,
      },
      additionalInformation: {
        medicineTakenFor: formdata.medicineTakenFor,
        prescribedBy: formdata.prescribedBy,
        sideEffects: formdata.sideEffects,
      },
    };

    if (data) {
      try {
        await editMedicineData({
          data: structuredData,
          token,
          id: data.id,
          userId:
            requiredUserId && userType == 'doctor' ? requiredUserId : userId,
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
        const res = await postMedicineData({data: structuredData, token});
        console.log(res);
        // navigation.goBack();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleChange = (id: keyof FormValues, value: any) => {
    setValue(id, value);
    if (id === 'longDuration') {
      setIsUntilDisabled(value);
    }
  };

  useEffect(() => {
    const subscription = watch(values => {
      const isFormValid = values.name.trim() !== '';
      setDisabled(!isFormValid);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

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
            disabled={disabled}
            style={styles.saveButton}
          />
        }
      />
      <ScrollView style={styles.scrollView}>
        <FormProvider {...methods}>
          <View>
            <View style={styles.inputBox}>
              <CustomInputField
                label="Medicine name"
                name="name"
                control={control}
                placeholder="Enter the name of the medicine"
                rules={{required: 'Name is required'}}
              />
              <Text style={styles.heading}>Medicine form</Text>
              <FormSelectionInput
                name="formOfMedicine"
                placeholder="Select a form"
                label="Medicine form"
                options={[
                  {label: 'Tablet', id: 'Tablet'},
                  {label: 'Capsule', id: 'Capsule'},
                  {label: 'Syrup', id: 'Syrup'},
                  {label: 'Injection', id: 'Injection'},
                  {label: 'Other', id: 'Other'},
                ]}
                selectedId={watch('formOfMedicine')}
                showActionButtons={true}
                optionsListHeight={320}
              />
              <View style={styles.row}>
                <View style={styles.inputWrapper}>
                  <CustomInputField
                    label="Medicine strength"
                    name="volume"
                    control={control}
                    placeholder="Ex. 100"
                    rules={{required: 'Details are required'}}
                  />
                </View>
                <View style={styles.unitWrapper}>
                  <FormSelectionInput
                    name="unit"
                    placeholder="mg"
                    options={[
                      {label: 'mg', id: 'mg'},
                      {label: 'ml', id: 'ml'},
                      {label: 'g', id: 'g'},
                      {label: 'IU', id: 'IU'},
                      {label: 'Other', id: 'Other'},
                    ]}
                    selectedId={watch('unit')}
                    showActionButtons={true}
                    optionsListHeight={320}
                  />
                </View>
              </View>
              <CustomInputField
                label="Intake method"
                name="ingestionMethod"
                control={control}
                placeholder="Ex. oral, intravenous, intramuscular, etc."
                rules={{required: 'Ingestion method is required'}}
              />
              <Text style={styles.heading}>Dose</Text>
              <CustomInputField
                label="Quantity"
                name="amount"
                control={control}
                placeholder="#"
                keyboardType="numeric"
                rules={{
                  required: 'Quantity is required',
                  valueAsNumber: true,
                }}
                value={watch('amount').toString()}
                onChangeText={text =>
                  handleChange('amount', text === '' ? 0 : parseInt(text))
                }
              />
              <CustomInputField
                label="Frequency"
                name="frequency"
                control={control}
                placeholder="Select the frequency"
                rules={{required: 'Frequency is required'}}
              />
              <CustomInputField
                label="When"
                name="when"
                control={control}
                placeholder="Ex. Morning, Afternoon, etc."
                rules={{required: 'When is required'}}
              />
              <CustomTextarea
                label="Other instructions"
                name="otherInstructions"
                control={control}
                placeholder="Text"
              />
              <Text style={styles.heading}>Duration</Text>
              <DatePickerField
                label="It begins at"
                name="whenItBegins"
                value={watch('whenItBegins')}
                onchange={(name, date) => handleChange('whenItBegins', date)}
              />
              <DatePickerField
                label="Until"
                name="whenItEnds"
                value={watch('whenItEnds')}
                onchange={(name, date) => handleChange('whenItEnds', date)}
                disabled={isUntilDisabled}
              />
              <CustomCheckbox
                label="Long duration"
                name="longDuration"
                control={control}
                onChange={value => handleChange('longDuration', value)}
              />
              <Text style={styles.heading}>Additional Information</Text>
              <CustomInputField
                label="Medicine taken for"
                name="medicineTakenFor"
                control={control}
                placeholder="Ex. diabetes, hypertension, etc."
                rules={{required: 'This field is required'}}
              />
              <CustomInputField
                label="Prescribed by"
                name="prescribedBy"
                control={control}
                placeholder="Ex. Dr. House"
                rules={{required: 'This field is required'}}
              />
              <CustomInputField
                label="Side effects"
                name="sideEffects"
                control={control}
                placeholder="Ex. redness, swelling, etc."
              />
            </View>
          </View>
        </FormProvider>
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
            <Image source={staticIcons.checkcircle} style={styles.modalIcon} />
            <Text style={styles.modalText}>The changes have been made.</Text>
          </View>
          <CloseIcon color="white" />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.GhostWhite,
    position: 'relative',
  },
  scrollView: {
    paddingVertical: 12,
    width: '94%',
    margin: 'auto',
  },
  inputBox: {
    marginBottom: 12,
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.Blue,
    marginBottom: 10,
    marginTop: 5,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  inputWrapper: {
    width: '60%',
  },
  unitWrapper: {
    width: '38%',
    marginTop: 26,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  saveButton: {
    width: 70,
    paddingVertical: 10,
    borderRadius: 10,
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
  modalIcon: {
    height: 20,
    width: 20,
    objectFit: 'contain',
    tintColor: 'white',
  },
});

export default AddAndEditMedicine;
