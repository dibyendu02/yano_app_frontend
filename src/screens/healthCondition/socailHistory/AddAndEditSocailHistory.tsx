import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, Image, Text} from 'react-native';
import {Colors} from '../../../constants/Colors';
import FilledButton from '../../../components/buttons/FilledButton';
import CustomInputField from '../../../components/formComp/CustomInputField';
import {useForm, Control, FormProvider} from 'react-hook-form';
import {DatePickerField} from '../../../components/form/DatePicker';
import CommonHeader from '../components/CommonHeader';
import FormSelectionInput from '../../../components/hook-form/FormSelectionInput';
import YesNoAnswer from '../components/YesNoAnswer';
import {retrieveData} from '../../../utils/Storage';
import {staticIcons} from '../../../assets/image';
import {CloseIcon} from '../../../assets/icon/IconNames';
import Modal from 'react-native-modal';
import {editSocialHistoryData} from '../../../api/PUT/medicalHistory';
import {AddSocialHistoryData} from '../../../api/POST/medicalHistory';

interface FormValues {
  occupation: string;
  education: string;
  date: Date;
  placeOfBirth: string;
  maritalStatus: string;
  children: string;
  religion: string;
  diet: string;
  sex: string;
  isSmoke: string;
  consumeAlcohol: string;
  substance: string;
  stressFactor: string;
  exercise: string;
  spokenLanguages: string;
}

const AddAndEditSocialHistory = ({navigation, route}: any) => {
  let data = route?.params?.data || null;

  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [saved, setSaved] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [requiredUserId, setRequiredUserId] = useState(
    data?.requiredUserId || route?.params?.requiredUserId || '',
  );

  const methods = useForm<FormValues>({
    defaultValues: {
      occupation: data?.occupation || '',
      education: data?.education || '',
      date: data?.date || new Date(),
      placeOfBirth: data?.placeOfBirth || '',
      maritalStatus: data?.maritalStatus || 'single',
      children: data?.children?.toString() || '0',
      religion: data?.religion || '',
      diet: data?.diet || '',
      sex: data?.sex || 'heterosexual',
      isSmoke: data?.isSmoke || 'No',
      consumeAlcohol: data?.consumeAlcohol || 'No',
      substance: data?.substance || '',
      stressFactor: data?.stressFactor || '',
      exercise: data?.exercise || '',
      spokenLanguages: data?.spokenLanguages || '',
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: {errors},
  } = methods;

  const getUserData = async () => {
    const retrievedToken = await retrieveData('token');
    const retrievedUserId = await retrieveData('userId');
    setToken(retrievedToken);
    setUserId(retrievedUserId);
  };

  useEffect(() => {
    getUserData();
    if (data) {
      reset({
        occupation: data?.occupation || '',
        education: data?.education || '',
        date: data?.date || '',
        placeOfBirth: data?.placeOfBirth || '',
        maritalStatus: data?.maritalStatus || '',
        children: data?.children?.toString() || '',
        religion: data?.religion || '',
        diet: data?.diet || '',
        sex: data?.sex || '',
        isSmoke: data?.doYouSmoke || '',
        consumeAlcohol: data?.doYouConsumeAlcohol || '',
        substance: data?.substance || '',
        stressFactor: data?.stressFactor || '',
        exercise: data?.exercise || '',
        spokenLanguages: data?.spokenLanguages || '',
      });
    }
  }, [data]);

  // Watch for changes in the form fields
  const currentFormValues = watch();

  useEffect(() => {
    const isFormValid = currentFormValues.occupation?.trim() !== '';
    setDisabled(!isFormValid); // Enable Save button only if form is valid
  }, [currentFormValues]);

  const onSubmit = async (formdata: FormValues) => {
    const StructuredData = {
      userId: requiredUserId ? requiredUserId : userId,
      occupation: formdata?.occupation,
      education: {field: formdata?.education, date: formdata?.date},
      placeOfBirth: formdata?.placeOfBirth,
      maritalStatus: formdata?.maritalStatus,
      numberOfChildren: formdata?.children,
      religion: formdata?.religion,
      diet: formdata?.diet,
      sexualOrientation: formdata?.sex,
      doYouSmoke: formdata?.isSmoke,
      doYouConsumeAlcohol: formdata?.consumeAlcohol,
      useOfOtherSubstances: formdata?.substance,
      doYouExercise: formdata?.exercise,
      stressFactor: formdata?.stressFactor,
      spokenLanguage: formdata?.spokenLanguages,
    };

    try {
      console.log(StructuredData);
      if (data) {
        await editSocialHistoryData({
          data: StructuredData,
          token,
          id: data.id,
          userId: requiredUserId ? requiredUserId : userId,
        });
      } else {
        await AddSocialHistoryData({data: StructuredData, token});
      }
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
        navigation.goBack();
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

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
            style={{width: 70, paddingVertical: 10, borderRadius: 10}}
          />
        }
      />
      <ScrollView style={{paddingVertical: 12, width: '94%', margin: 'auto'}}>
        <FormProvider {...methods}>
          <View style={styles.inputBox}>
            <CustomInputField
              label="Occupation"
              name="occupation"
              control={control}
              placeholder="Ex. engineer, doctor, architect, etc."
              rules={{required: 'required'}}
            />
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{width: '50%'}}>
                <CustomInputField
                  label="Education"
                  name="education"
                  control={control}
                  placeholder="Ex. MSc, Ms, etc..."
                />
              </View>
              <View style={{width: '45%', marginTop: 5}}>
                <DatePickerField
                  label="Date"
                  name="date"
                  value={watch('date')}
                  onchange={(name, value) => setValue('date', value)}
                />
              </View>
            </View>
            <CustomInputField
              label="Place of birth"
              name="placeOfBirth"
              control={control}
              placeholder="Ex. New York, Paris, etc..."
            />
            <FormSelectionInput
              name="maritalStatus"
              label="Marital Status"
              options={[
                {label: 'Single', id: 'single'},
                {label: 'Married', id: 'married'},
                {label: 'Divorced', id: 'divorced'},
                {label: 'Widowed', id: 'widowed'},
              ]}
              selectedId={watch('maritalStatus')}
              showActionButtons={true}
              optionsListHeight={300}
              onSelect={value => setValue('maritalStatus', value)}
              placeholder="Select a marital status"
            />
            <CustomInputField
              label="No of children"
              name="children"
              control={control}
              placeholder="Ex. 2"
            />
            <CustomInputField
              label="Religion"
              name="religion"
              control={control}
              placeholder="Ex, Cathic, Muslim, etc.."
            />
            <CustomInputField
              label="Diet"
              name="diet"
              control={control}
              placeholder="Ex. Vegan, Vegetarian, etc.."
            />
            <FormSelectionInput
              name="sex"
              label="Sexual Orientation"
              options={[
                {label: 'Heterosexual', id: 'heterosexual'},
                {label: 'Homosexual', id: 'homosexual'},
                {label: 'Bisexual', id: 'bisexual'},
                {label: 'Asexual', id: 'asexual'},
              ]}
              selectedId={watch('sex')}
              showActionButtons={true}
              optionsListHeight={300}
            />
            <YesNoAnswer
              selectedRole={watch('isSmoke')}
              setSelectedRole={(val: string) => setValue('isSmoke', val)}
              title="Do you smoke?"
            />
            <YesNoAnswer
              selectedRole={watch('consumeAlcohol')}
              setSelectedRole={(val: string) => setValue('consumeAlcohol', val)}
              title="Do you consume alcohol?"
            />
            <CustomInputField
              label="Use of other substances"
              name="substance"
              control={control}
              placeholder="Ex. none, marijuana, cocaine, etc..."
            />
            <CustomInputField
              label="Exercise"
              name="exercise"
              control={control}
              placeholder="Ex. sedentary, jogging, gym, etc..."
            />
            <CustomInputField
              label="Stress factor"
              name="stressFactor"
              control={control}
              placeholder="Ex. relaxed, very stressed, etc..."
            />
            <CustomInputField
              label="Spoken languages"
              name="spokenLanguages"
              control={control}
              placeholder="Ex. English, French, Spanish, etc..."
            />
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

export default AddAndEditSocialHistory;
