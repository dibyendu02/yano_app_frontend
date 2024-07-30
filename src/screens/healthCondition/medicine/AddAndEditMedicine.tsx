// AddAndEditMedicine.tsx
import React, { useState } from 'react';
import { View, Button, StyleSheet, SafeAreaView, ScrollView, Text } from 'react-native';
import { Colors } from '../../../constants/Colors';
import Header from '../../../components/header/Header';
import FilledButton from '../../../components/buttons/FilledButton';
import CustomInputField from '../../../components/formComp/CustomInputField';
import { useForm, Control, FieldValues } from 'react-hook-form';
import CustomSelect from '../../../components/formComp/SelectFiled';
import CustomTextarea from '../../../components/formComp/TextAreaField';
import CustomDatePicker from '../../../components/formComp/CustomDatePicker';
import CustomCheckbox from '../../../components/formComp/CustomCheckbox';
import CommonHeader from '../components/CommonHeader';


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

const AddAndEditMedicine = ({ navigation, route }: any) => {
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

    const { control, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({ defaultValues });

    const onSubmit = (data: FormValues) => {
        console.log(data);
        reset();
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
                        type='blue'
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
            <ScrollView>
                <View style={{ padding: 20 }}>
                    <View style={styles.inputBox}>
                        <CustomInputField
                            label="Name of the medicine"
                            name="name"
                            control={control as unknown as Control<FieldValues, object>}
                            placeholder="Ej. Diabetes tipo II, Hypertension, etc... "
                            rules={{ required: 'name is required' }}
                        />
                        <Text style={styles.heading} >Forma de la medicina</Text>
                        <CustomSelect
                            label='Forma de la medicina'
                            name="medicine"
                            control={control as unknown as Control<FieldValues, object>}
                            rules={{ required: 'Medicine is required' }}
                            placeholder="Select Medicine"
                            options={[
                                { label: 'Tablet', value: 'Tablet' },
                                { label: 'Capsule', value: 'Capsule' },
                                { label: 'Syrup', value: 'Syrup' },
                                { label: 'Injection', value: 'Injection' },
                                { label: 'Other', value: 'Other' },
                            ]}
                        />
                        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
                            <View style={{ width: "60%" }}>
                                <CustomInputField
                                    label="Detalles de la medicina"
                                    name="volume"
                                    control={control as unknown as Control<FieldValues, object>}
                                    placeholder="Ej. 2 times a day, after meal, etc..."
                                    rules={{ required: 'Details is required' }}
                                />
                            </View>
                            <View style={{ width: "38%" }}>
                                <CustomSelect
                                    label='Unit of volume'
                                    name="unit"
                                    control={control as unknown as Control<FieldValues, object>}
                                    placeholder='unit'
                                    options={[
                                        { label: 'mg', value: 'mg' },
                                        { label: 'ml', value: 'ml' },
                                        { label: 'g', value: 'g' },
                                        { label: 'IU', value: 'IU' },
                                        { label: 'Other', value: 'Other' },
                                    ]}
                                />
                            </View>
                        </View>
                        <CustomInputField
                            label="Método de ingesta"
                            name="field4"
                            control={control as unknown as Control<FieldValues, object>}
                            placeholder="Ej. oral, intravenoso, intramuscular, etc."
                            rules={{ required: 'required' }}
                        />
                        <Text style={styles.heading} >Deede</Text>
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
                        <Text style={styles.heading} >Duración</Text>
                        <CustomDatePicker
                            label="Fecha de inicio"
                            name="field9"
                            control={control as unknown as Control<FieldValues, object>}
                        />
                        <CustomDatePicker
                            label="Hasta"
                            name="field10"
                            control={control as unknown as Control<FieldValues, object>}
                        />
                        <CustomCheckbox
                            label="¿Es un medicamento permanente?"
                            name="field11"
                            control={control as unknown as Control<FieldValues, object>}
                        />
                        <Text style={styles.heading} >Información adicional</Text>
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
    )
};

const styles = StyleSheet.create({
    inputBox: {
        marginBottom: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: "600",
        color: Colors.Blue,
        marginBottom: 10,
        marginTop: 5,
    }
});

export default AddAndEditMedicine;
