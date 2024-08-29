import React, {useState} from 'react';
import {View, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {Colors} from '../../../constants/Colors';
import FilledButton from '../../../components/buttons/FilledButton';
import CustomInputField from '../../../components/formComp/CustomInputField';
import {useForm, Control, FieldValues} from 'react-hook-form';
import CustomTextarea from '../../../components/formComp/TextAreaField';
import {DatePickerField} from '../../../components/form/DatePicker';
import CommonHeader from '../components/CommonHeader';
import Modal from 'react-native-modal';
import {Image} from 'react-native';
import {Text} from 'react-native';
import {CloseIcon} from '../../../assets/icon/IconNames';
import {staticIcons} from '../../../assets/image';

interface FormValues {
  name: string;
  field1: string;
  field2: string;
  field3: string;
  field4: string;
  field5: string;
}

const AddAndEditVaccine = ({navigation, route}: any) => {
  let data = null;
  if (route?.params) {
    data = route.params.data;
  }
  const [saved, setSaved] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [defaultValues, setDefaultValues] = useState<any>({
    name: data?.name || '',
    field1: data?.field1 || '',
    field2: data?.field2 || '',
    field3: data?.field3 || '',
    field4: data?.field4 || '',
    field5: data?.field5 || '',
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<FormValues>({defaultValues});

  const onSubmit = (data: FormValues) => {
    console.log(data);
    if (data) {
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
      }, 2000);
    } else {
      navigation.goBack();
    }
  };

  const handleChange = (id: string, value: string) => {
    setDefaultValues({...defaultValues, [id]: value});
    if (defaultValues.name) setDisabled(false);
    else setDisabled(true);
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
              label="Vaccination for"
              name="name"
              control={control as unknown as Control<FieldValues, object>}
              placeholder="Ex. Covid 19, VPH, etc... "
              rules={{required: 'name is required'}}
            />
            <DatePickerField
              label="Shot date"
              name="field1"
              value={defaultValues.field1}
              onchange={handleChange}
            />
            <CustomInputField
              label="Vaccine name"
              name="field2"
              control={control as unknown as Control<FieldValues, object>}
              placeholder="Ex. Verocell"
            />
            <CustomInputField
              label="Vaccine details"
              name="field3"
              control={control as unknown as Control<FieldValues, object>}
              placeholder="Ex. First dose"
            />
            <CustomInputField
              label="Lot number"
              name="field4"
              control={control as unknown as Control<FieldValues, object>}
              placeholder="Ex. #U45RT5"
            />
            <CustomTextarea
              label="Additional notes"
              name="field5"
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
    </SafeAreaView>
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
