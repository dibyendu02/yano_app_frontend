import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
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

const AddHealthRecord = ({navigation, route}: any) => {
  let data = null;
  if (route?.params) {
    data = route.params.data;
  }
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

  const handleChange = (id: string, e: string) => {
    setFormData({...formData, [id]: e});
    if (formData.name) setDisabled(false);
    else setDisabled(true);
  };

  const handleSubmit = () => {
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
              onchange={handleChange}
            />
            <CustomRadioSelect
              label="Status"
              value={formData.status}
              options={[
                {label: 'Chronic', value: 'Chronic'},
                {label: 'Overcome', value: 'Overcome'},
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
    </SafeAreaView>
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
