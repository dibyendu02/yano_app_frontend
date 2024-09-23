import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from '../../constants/Colors';
import FilledButton from '../../components/buttons/FilledButton';
import {InputField} from '../../components/form/InputField';
import {DatePickerField} from '../../components/form/DatePicker';
import {TextArea} from '../../components/form/TextAreaField';
import CommonHeader from './components/CommonHeader';
import CustomRadioSelect from './components/CustomRadioButtonGroup';
import Modal from 'react-native-modal';
import {staticIcons} from '../../assets/image';
import {CloseIcon} from '../../assets/icon/IconNames';
import {postHealthConditionData} from '../../api/POST/medicalHistory';
import {retrieveData} from '../../utils/Storage';
import {editHealthConditionData} from '../../api/PUT/medicalHistory';

const AddHealthRecord = ({navigation, route}: any) => {
  let data = null;
  if (route?.params) {
    data = route.params.data;
  }
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [userType, setUserType] = useState('');
  const [requiredUserId, setRequiredUserId] = useState(
    data?.requiredUserId || route?.params?.requiredUserId || '',
  );
  const [saved, setSaved] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [formData, setFormData] = useState({
    name: data?.name || '',
    date: data?.date || '',
    status: data?.status || '',
    treatedBy: data?.treatedBy || '',
    medicine: data?.medicine || '',
    additionalNotes: data?.additionalNotes || '',
  });

  console.log(data?.id);
  const handleChange = (id: string, e: string) => {
    setFormData({...formData, [id]: e});
    if (formData.name) setDisabled(false);
    else setDisabled(true);
  };

  const handleSubmit = async () => {
    const structuredData = {
      userId: requiredUserId && userType == 'doctor' ? requiredUserId : userId,
      nameOfTheHealthCondition: formData.name,
      dateOfDiagnosis: formData.date,
      status: formData.status,
      treatedBy: formData.treatedBy,
      medicine: formData.medicine,
      additionalNotes: formData.additionalNotes,
    };
    console.log('userId in formData ', structuredData?.userId);
    if (data) {
      try {
        console.log('edit healthcondition');
        await editHealthConditionData({
          data: structuredData,
          token,
          id: data?.id,
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
        const res = await postHealthConditionData({
          token,
          data: structuredData,
        });
        console.log(res);
        navigation.goBack();
      } catch (error) {
        console.log(error);
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

  console.log('requiredUserId ', requiredUserId);
  console.log(userType);

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
            label="Add"
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
              label="Name of the health condition"
              name="name"
              placeholder="Ex. Diabetes tipo II, Hypertension, etc... "
              value={formData.name}
              onchange={handleChange}
            />
            <DatePickerField
              label="Date of diagnosis"
              name="date"
              value={formData.date}
              // onchange={handleChange}
              onchange={(name, value) =>
                setFormData({...formData, [name]: value})
              }
            />
            <CustomRadioSelect
              label="Status"
              value={formData.status}
              options={[
                {label: 'Chronic', value: 'chronic'},
                {label: 'Overcome', value: 'overcome'},
              ]}
              onChange={newValue => handleChange('status', newValue)}
            />
            <InputField
              label="Treated by"
              name="treatedBy"
              placeholder="Ex. Dr. House"
              value={formData.treatedBy}
              onchange={handleChange}
            />
            <InputField
              label="Medicine"
              name="medicine"
              placeholder="Ex. Losartán Potásico, metformina, etc."
              value={formData.medicine}
              onchange={handleChange}
            />
            <TextArea
              label="Additional notes"
              name="additionalNotes"
              placeholder=""
              value={formData.additionalNotes}
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

export default AddHealthRecord;

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
