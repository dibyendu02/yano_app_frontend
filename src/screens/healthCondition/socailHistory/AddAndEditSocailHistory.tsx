import React, {useState} from 'react';
import {View, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {Colors} from '../../../constants/Colors';
import FilledButton from '../../../components/buttons/FilledButton';
import CustomInputField from '../../../components/formComp/CustomInputField';
import {useForm, Control, FieldValues, FormProvider} from 'react-hook-form';
import {DatePickerField} from '../../../components/form/DatePicker';
import CommonHeader from '../components/CommonHeader';
import FormSelectionInput from '../../../components/hook-form/FormSelectionInput';
import YesNoAnswer from '../components/YesNoAnswer';

interface FormValues {
  occupation: string;
  education: string;
  date: string;
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
  let data = null;
  if (route?.params) {
    data = route.params.data;
  }
  const [disabled, setDisabled] = useState(true);
  const [defaultValues, setDefaultValues] = useState<FormValues>({
    occupation: data?.occupation || '',
    education: data?.education || '',
    date: data?.date || '',
    placeOfBirth: data?.placeOfBirth || '',
    maritalStatus: data?.maritalStatus || '',
    children: data?.children || '',
    religion: data?.religion || '',
    diet: data?.diet || '',
    sex: data?.sex || '',
    isSmoke: data?.isSmoke || '',
    consumeAlcohol: data?.consumeAlcohol || '',
    substance: data?.substance || '',
    stressFactor: data?.stressFactor || '',
    exercise: data?.exercise || '',
    spokenLanguages: data?.spokenLanguages || '',
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<FormValues>({defaultValues});

  const methods = useForm();

  const onSubmit = (data: FormValues) => {
    console.log(data);
    reset();
  };

  const handleChange = (id: string, value: string) => {
    setDefaultValues({...defaultValues, [id]: value});
    if (defaultValues.occupation) setDisabled(false);
    else setDisabled(true);
  };

  const [value, setvalue] = useState('No');
  const [valuesecond, setvaluesecond] = useState('No');

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
              label="Occupation"
              name="occupation"
              control={control as unknown as Control<FieldValues, object>}
              placeholder="Occupation"
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
                  control={control as unknown as Control<FieldValues, object>}
                  placeholder="Education"
                />
              </View>
              <View style={{width: '45%', marginTop: 5}}>
                <DatePickerField
                  label="Date"
                  name="date"
                  value={defaultValues.date}
                  onchange={handleChange}
                />
              </View>
            </View>
            <CustomInputField
              label="Place of birth"
              name="placeOfBirth"
              control={control as unknown as Control<FieldValues, object>}
              placeholder="Place of birth"
            />
            <FormProvider {...methods}>
              <FormSelectionInput
                name="maritalStatus"
                label="Marital Status"
                options={[
                  {label: 'Single', id: 'single'},
                  {label: 'Married', id: 'married'},
                  {label: 'Divorced', id: 'divorced'},
                  {label: 'Widowed', id: 'widowed'},
                ]}
                selectedId={defaultValues.maritalStatus}
                showActionButtons={true}
                optionsListHeight={300}
              />
              <CustomInputField
                label="No of children"
                name="children"
                control={control as unknown as Control<FieldValues, object>}
                placeholder="Ex. 2"
              />
              <CustomInputField
                label="Religion"
                name="religion"
                control={control as unknown as Control<FieldValues, object>}
                placeholder="Religion"
              />
              <CustomInputField
                label="Diet"
                name="diet"
                control={control as unknown as Control<FieldValues, object>}
                placeholder="Diet"
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
                selectedId={defaultValues.sex}
                showActionButtons={true}
                optionsListHeight={300}
              />
              {/* <FormSelectionInput
                name="isSmoke"
                label="Do you smoke?"
                options={[
                  {label: 'Yes', id: 'yes'},
                  {label: 'No', id: 'no'},
                ]}
                selectedId={defaultValues.isSmoke}
                showActionButtons={true}
                optionsListHeight={150}
              /> */}
              <YesNoAnswer
                selectedRole={value}
                setSelectedRole={setvalue}
                title="Do you smoke?"
              />
              {/* <FormSelectionInput
                name="consumeAlcohol"
                label="Do you consume alcohol?"
                options={[
                  {label: 'Yes', id: 'yes'},
                  {label: 'No', id: 'no'},
                ]}
                selectedId={defaultValues.consumeAlcohol}
                showActionButtons={true}
                optionsListHeight={150}
              /> */}
              <YesNoAnswer
                selectedRole={valuesecond}
                setSelectedRole={setvaluesecond}
                title="Do you consume alcohol?"
              />
            </FormProvider>

            <CustomInputField
              label="Use of other substances"
              name="substance"
              control={control as unknown as Control<FieldValues, object>}
              placeholder="Use of other substances"
            />
            <CustomInputField
              label="Exercise"
              name="exercise"
              control={control as unknown as Control<FieldValues, object>}
              placeholder="Do you exercise?"
            />
            <CustomInputField
              label="Stress factor"
              name="stressFactor"
              control={control as unknown as Control<FieldValues, object>}
              placeholder="Stress factor"
            />
            <CustomInputField
              label="Spoken languages"
              name="spokenLanguages"
              control={control as unknown as Control<FieldValues, object>}
              placeholder="Spoken languages"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    marginBottom: 20,
  },
});

export default AddAndEditSocialHistory;
