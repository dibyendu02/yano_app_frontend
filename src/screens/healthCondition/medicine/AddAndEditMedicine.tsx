import React, {useEffect, useState} from 'react';
import {View, StyleSheet, SafeAreaView, ScrollView, Text} from 'react-native';
import {Colors} from '../../../constants/Colors';
import CommonHeader from '../components/CommonHeader';
import FilledButton from '../../../components/buttons/FilledButton';
import {useForm, Control, FieldValues, FormProvider} from 'react-hook-form';
import CustomInputField from '../../../components/formComp/CustomInputField';
import CustomTextarea from '../../../components/formComp/TextAreaField';
import CustomCheckbox from '../../../components/formComp/CustomCheckbox';
import {DatePickerField} from '../../../components/form/DatePicker';
import FormSelectionInput from '../../../components/hook-form/FormSelectionInput';
import Modal from 'react-native-modal';
import {Image} from 'react-native';
import {staticIcons} from '../../../assets/image';
import {CloseIcon} from '../../../assets/icon/IconNames';

interface FormValues {
  name: string;
  volume: string;
  unit: string;
  medicine: string;
  field4: string;
  field5: string;
  field6: string;
  field7: string;
  field8: string;
  field9: string;
  field10: string;
  field11: boolean;
  field12: string;
  field13: string;
  field14: string;
}

const AddAndEditMedicine = ({navigation, route}: any) => {
  let data = null;
  if (route?.params) {
    data = route.params.data;
  }
  const [saved, setSaved] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [defaultValues, setDefaultValues] = useState<any>({
    name: data?.name || '',
    volume: data?.volume || '',
    unit: data?.unit || '',
    medicine: data?.medicine || '',
    field4: data?.field4 || '',
    field5: data?.field5 || '',
    field6: data?.field6 || '',
    field7: data?.field7 || '',
    field8: data?.field8 || '',
    field9: data?.field9 || '',
    field10: data?.field10 || '',
    field11: data?.field11 || false,
    field12: data?.field12 || '',
    field13: data?.field13 || '',
    field14: data?.field14 || '',
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<FormValues>({defaultValues});
  const methods = useForm();

  const onSubmit = (formdata: FormValues) => {
    console.log(formdata);
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

  useEffect(() => {
    // Check if both the "Medicine name" and "Medicine form" fields are filled out
    if (defaultValues.name != '') {
      setDisabled(false);
    } else {
      setDisabled(true);
    }

    console.log(defaultValues.name);
  }, [defaultValues.name]);

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
            disabled={disabled}
            style={{
              width: 70,
              paddingVertical: 10,
              borderRadius: 10,
            }}
          />
        }
      />
      <ScrollView>
        <View style={{padding: 20}}>
          <View style={styles.inputBox}>
            <CustomInputField
              label="Medicine name"
              name="name"
              control={control as unknown as Control<FieldValues, object>}
              placeholder="Enter the name of the medicine"
              rules={{required: 'name is required'}}
            />
            <Text style={styles.heading}>Medicine form</Text>
            <FormProvider {...methods}>
              <FormSelectionInput
                name="medicine"
                placeholder="Select a form"
                label="Medicine form"
                options={[
                  {label: 'Tablet', id: 'Tablet'},
                  {label: 'Capsule', id: 'Capsule'},
                  {label: 'Syrup', id: 'Syrup'},
                  {label: 'Injection', id: 'Injection'},
                  {label: 'Other', id: 'Other'},
                ]}
                selectedId={defaultValues.medicine}
                showActionButtons={true}
                optionsListHeight={320}
              />
            </FormProvider>
            <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
              <View style={{width: '60%'}}>
                <CustomInputField
                  label="Medicine strength"
                  name="volume"
                  control={control as unknown as Control<FieldValues, object>}
                  placeholder="Ex. 100"
                  rules={{required: 'Details is required'}}
                />
              </View>
              <View style={{width: '38%', marginTop: 22}}>
                <FormProvider {...methods}>
                  <FormSelectionInput
                    name="unit"
                    // label="Unit of volume"
                    placeholder="mg"
                    options={[
                      {label: 'mg', id: 'mg'},
                      {label: 'ml', id: 'ml'},
                      {label: 'g', id: 'g'},
                      {label: 'IU', id: 'IU'},
                      {label: 'Other', id: 'Other'},
                    ]}
                    selectedId={defaultValues.unit}
                    showActionButtons={true}
                    optionsListHeight={320}
                  />
                </FormProvider>
              </View>
            </View>
            <CustomInputField
              label="Intake method"
              name="field4"
              control={control as unknown as Control<FieldValues, object>}
              placeholder="Ex. oral, intravenous, intramuscular, etc."
              rules={{required: 'required'}}
            />
            <Text style={styles.heading}>Dose</Text>
            <CustomInputField
              label="Quantity"
              name="field5"
              control={control as unknown as Control<FieldValues, object>}
              placeholder="#"
            />
            <CustomInputField
              label="Frequency"
              name="field6"
              control={control as unknown as Control<FieldValues, object>}
              placeholder="Select the frequency"
            />
            <CustomInputField
              label="When"
              name="field7"
              control={control as unknown as Control<FieldValues, object>}
              // placeholder="Ej. 2 days, 3 weeks, etc..."
            />
            <CustomTextarea
              label="Other instructions"
              name="field8"
              control={control as unknown as Control<FieldValues, object>}
              placeholder="Text"
            />
            <Text style={styles.heading}>Duration</Text>
            <DatePickerField
              label="It begins at"
              name="field9"
              value={defaultValues.field9}
              onchange={handleChange}
            />
            <DatePickerField
              label="Until"
              name="field10"
              value={defaultValues.field10}
              onchange={handleChange}
            />
            <CustomCheckbox
              label="Long duration"
              name="field11"
              control={control as unknown as Control<FieldValues, object>}
            />
            <Text style={styles.heading}>Additional Information</Text>
            <CustomInputField
              label="Medicine taken for"
              name="field12"
              control={control as unknown as Control<FieldValues, object>}
              placeholder="Ex. diabetes, hypertension, etc..."
            />
            <CustomInputField
              label="Prescribed by"
              name="field13"
              control={control as unknown as Control<FieldValues, object>}
              placeholder="Ex. Dr. House"
            />
            <CustomInputField
              label="Side effects"
              name="field14"
              control={control as unknown as Control<FieldValues, object>}
              placeholder="Ex. redness, swelling, etc..."
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
  heading: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.Blue,
    marginBottom: 10,
    marginTop: 5,
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

export default AddAndEditMedicine;
