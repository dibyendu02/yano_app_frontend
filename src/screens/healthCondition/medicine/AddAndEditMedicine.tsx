import React, {useState} from 'react';
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

  const onSubmit = (data: FormValues) => {
    console.log(data);
    reset();
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
              label="Name of the medicine"
              name="name"
              control={control as unknown as Control<FieldValues, object>}
              placeholder="Ej. Diabetes tipo II, Hypertension, etc... "
              rules={{required: 'name is required'}}
            />
            <Text style={styles.heading}>Forma de la medicina</Text>
            <FormProvider {...methods}>
              <FormSelectionInput
                name="medicine"
                label="Forma de la medicina"
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
                  label="Detalles de la medicina"
                  name="volume"
                  control={control as unknown as Control<FieldValues, object>}
                  placeholder="Ej. 2 times a day, after meal, etc..."
                  rules={{required: 'Details is required'}}
                />
              </View>
              <View style={{width: '38%'}}>
                <FormProvider {...methods}>
                  <FormSelectionInput
                    name="unit"
                    label="Unit of volume"
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
              label="Método de ingesta"
              name="field4"
              control={control as unknown as Control<FieldValues, object>}
              placeholder="Ej. oral, intravenoso, intramuscular, etc."
              rules={{required: 'required'}}
            />
            <Text style={styles.heading}>Deede</Text>
            <CustomInputField
              label="Cantidad"
              name="field5"
              control={control as unknown as Control<FieldValues, object>}
              placeholder="Ej. 2 times a day, after meal, etc..."
            />
            <CustomInputField
              label="Frecuencia"
              name="field6"
              control={control as unknown as Control<FieldValues, object>}
              placeholder="Ej. 2 days, 3 weeks, etc..."
            />
            <CustomInputField
              label="Cuando"
              name="field7"
              control={control as unknown as Control<FieldValues, object>}
              placeholder="Ej. 2 days, 3 weeks, etc..."
            />
            <CustomTextarea
              label="Otras instrucciones"
              name="field8"
              control={control as unknown as Control<FieldValues, object>}
              placeholder="Text"
            />
            <Text style={styles.heading}>Duración</Text>
            <DatePickerField
              label="Fecha de inicio"
              name="field9"
              value={defaultValues.field9}
              onchange={handleChange}
            />
            <DatePickerField
              label="Hasta"
              name="field10"
              value={defaultValues.field10}
              onchange={handleChange}
            />
            <CustomCheckbox
              label="¿Es un medicamento permanente?"
              name="field11"
              control={control as unknown as Control<FieldValues, object>}
            />
            <Text style={styles.heading}>Información adicional</Text>
            <CustomInputField
              label="Tratado por"
              name="field12"
              control={control as unknown as Control<FieldValues, object>}
              placeholder="Ej. Dr. John Doe"
            />
            <CustomInputField
              label="Notas adicionales"
              name="field13"
              control={control as unknown as Control<FieldValues, object>}
              placeholder="Notas adicionales"
            />
            <CustomInputField
              label="Medicamento"
              name="field14"
              control={control as unknown as Control<FieldValues, object>}
              placeholder="Ej. Paracetamol, Ibuprofen, etc..."
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.Blue,
    marginBottom: 10,
    marginTop: 5,
  },
});

export default AddAndEditMedicine;
