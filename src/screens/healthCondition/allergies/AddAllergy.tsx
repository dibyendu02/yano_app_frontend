import {SafeAreaView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
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

const AddAndEditAllergy = ({navigation, route}: any) => {
  let data = null;
  if (route?.params) {
    data = route.params.data;
  }
  const [saved, setSaved] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [formData, setFormData] = useState({
    name: data?.name || '',
    date: data?.date || '',
    details: data?.details || '',
    moreDetails: data?.moreDetails || '',
    treatedBy: data?.treatedBy || '',
    medicine: data?.medicine || '',
    additionalNotes: data?.additionalNotes || '',
  });

  const handelChange = (id: string, e: string) => {
    setFormData({...formData, [id]: e});
    if (formData.name) setDisabled(false);
    else setDisabled(true);
  };

  const handelSubmit = () => {
    console.log(formData);
    if (data) {
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
      }, 2000);
    } else {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView
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
            onPress={handelSubmit}
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
              label="Allergy name"
              name="name"
              placeholder="Ej. Diabetes tipo II, Hypertension, etc... "
              value={formData.name}
              onchange={handelChange}
            />
            <InputField
              label="Triggered by"
              name="details"
              placeholder="Ej. Diabetes tipo II, Hypertension, etc... "
              value={formData.details}
              onchange={handelChange}
            />
            <InputField
              label="Reaction"
              name="moreDetails"
              placeholder="Ej. Diabetes tipo II, Hypertension, etc... "
              value={formData.moreDetails}
              onchange={handelChange}
            />
            <InputField
              label="How often does it occur"
              name="treatedBy"
              placeholder="Ej. Dr. House"
              value={formData.treatedBy}
              onchange={handelChange}
            />
            <DatePickerField
              label="Date of first diagnosis"
              name="date"
              onchange={handelChange}
            />
            <InputField
              label="Medicine"
              name="medicine"
              placeholder="Ej. Losartán Potásico,  metformina, etc."
              value={formData.medicine}
              onchange={handelChange}
            />
            <TextArea
              label="Additional notes"
              name="additionalNotes"
              placeholder="Additional notes"
              value={formData.additionalNotes}
              onchange={handelChange}
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
    </SafeAreaView>
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
