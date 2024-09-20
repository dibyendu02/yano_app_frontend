import {SafeAreaView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../../../constants/Colors';
import Header from '../../../components/header/Header';
import FilledButton from '../../../components/buttons/FilledButton';
import {ScrollView} from 'react-native';
import {InputField} from '../../../components/form/InputField';
import {DatePickerField} from '../../../components/form/DatePicker';
import {TextArea} from '../../../components/form/TextAreaField';
import CommonHeader from '../components/CommonHeader';
import Modal from 'react-native-modal';
import {Image} from 'react-native';
import {CloseIcon} from '../../../assets/icon/IconNames';
import {Text} from 'react-native';
import {staticIcons} from '../../../assets/image';
import {AddAllergyData} from '../../../api/POST/medicalHistory';
import {retrieveData} from '../../../utils/Storage';
import {editAllergyData} from '../../../api/PUT/medicalHistory';

const AddAndEditAllergy = ({navigation, route}: any) => {
  let data = null;
  if (route?.params) {
    data = route.params.data;
  }
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [userType, setUserType] = useState('');
  const [saved, setSaved] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [requiredUserId, setRequiredUserId] = useState(
    data?.requiredUserId || route?.params?.requiredUserId || '',
  );
  const [formData, setFormData] = useState({
    nameOfTheAllergy: data?.name || '',
    triggeredBy: data?.triggeredBy || '',
    reaction: data?.reaction || '',
    howOften: data?.howOften || '',
    dateOfFirstDiagnosis: data?.date || '',
    medicine: data?.medicine || '',
    notes: data?.additionalNotes || '',
  });
  console.log(formData.dateOfFirstDiagnosis);

  const handleChange = (id: string, e: string) => {
    setFormData({...formData, [id]: e});
    // Enable save button only when nameOfTheAllergy field is not empty
    setDisabled(!formData.nameOfTheAllergy);
  };

  const handleSubmit = async () => {
    const structuredData = {
      userId: requiredUserId && userType == 'doctor' ? requiredUserId : userId, // Add the userId to the data structure
      nameOfTheAllergy: formData.nameOfTheAllergy,
      triggeredBy: formData.triggeredBy,
      reaction: formData.reaction,
      howOftenDoesItOccur: formData.howOften,
      dateOfFirstDiagnosis: formData.dateOfFirstDiagnosis,
      medicine: formData.medicine,
      additionalNotes: formData.notes,
    };

    if (data) {
      try {
        await editAllergyData({
          data: structuredData,
          id: data.id,
          userId:
            requiredUserId && userType == 'doctor' ? requiredUserId : userId,
          token,
        });
      } catch (error) {}
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
      }, 2000);
      setTimeout(() => {
        navigation.goBack();
      }, 4000);
    } else {
      try {
        const response = await AddAllergyData({data: structuredData, token});
        console.log('response', response);
        navigation.goBack();
      } catch (error) {
        console.log('error', error);
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
            onPress={handleSubmit}
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
            <InputField
              label="Allergy Name"
              name="nameOfTheAllergy"
              placeholder="E.g. Peanuts, Gluten, etc."
              value={formData.nameOfTheAllergy}
              onchange={handleChange}
            />
            <InputField
              label="Triggered By"
              name="triggeredBy"
              placeholder="E.g. Ingestion, Contact, etc."
              value={formData.triggeredBy}
              onchange={handleChange}
            />
            <InputField
              label="Reaction"
              name="reaction"
              placeholder="E.g. Hives, Swelling, etc."
              value={formData.reaction}
              onchange={handleChange}
            />
            <InputField
              label="How Often"
              name="howOften"
              placeholder="E.g. Every time, Occasionally, etc."
              value={formData.howOften}
              onchange={handleChange}
            />
            <DatePickerField
              label="Date of First Diagnosis"
              name="dateOfFirstDiagnosis"
              value={formData.dateOfFirstDiagnosis}
              onchange={handleChange}
            />
            <InputField
              label="Medicine"
              name="medicine"
              placeholder="E.g. Epinephrine, Antihistamines, etc."
              value={formData.medicine}
              onchange={handleChange}
            />
            <TextArea
              label="Additional Notes"
              name="notes"
              placeholder="Additional notes"
              value={formData.notes}
              onchange={handleChange}
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

export default AddAndEditAllergy;

const styles = StyleSheet.create({
  inputBox: {
    marginBottom: 12,
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
    // marginLeft: 60,
  },
  modalText: {
    color: Colors.White,
    fontSize: 14,
    fontWeight: 'bold',
  },
});
