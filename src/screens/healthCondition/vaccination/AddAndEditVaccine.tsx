// AddAndEditVaccine.tsx
import React, { useState } from 'react';
import {
    View, 
    StyleSheet,
    SafeAreaView,
    ScrollView, 
} from 'react-native';
import { Colors } from '../../../constants/Colors';
import Header from '../../../components/header/Header';
import FilledButton from '../../../components/buttons/FilledButton';
import CustomInputField from '../../../components/formComp/CustomInputField';
import { useForm, Control, FieldValues } from 'react-hook-form'; 
import CustomTextarea from '../../../components/formComp/TextAreaField';
import CustomDatePicker from '../../../components/formComp/CustomDatePicker'; 
import CommonHeader from '../components/CommonHeader';

interface FormValues {
    name: string;
    field1: string;
    field2: string;
    field3: string;
    field4: string;
    field5: string;
}

const AddAndEditVaccine = ({ navigation, route }: any) => {
    let data = null;
    if (route?.params) {
        data = route.params.data;
    }
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
        formState: { errors },
    } = useForm<FormValues>({ defaultValues });

    const onSubmit = (data: FormValues) => {
        console.log(data);
        reset();
    };

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: Colors.LightGray,
                position: 'relative',
            }}>
            <CommonHeader
                title={data ? 'Edit' : 'Add'}
                rightComp1={
                    <FilledButton
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
                            label="Name of the Vaccine"
                            name="name"
                            control={control as unknown as Control<FieldValues, object>}
                            placeholder="Ej. Diabetes tipo II, Hypertension, etc... "
                            rules={{ required: 'name is required' }}
                        /> 
                        <CustomDatePicker
                            label="Fecha de la toma"
                            name="field1"
                            control={control as unknown as Control<FieldValues, object>}
                        />
                        <CustomInputField
                            label="Nombre de la vacuna"
                            name="field2"
                            control={control as unknown as Control<FieldValues, object>}
                            placeholder="Ej. 2 times a day, after meal, etc..."
                        />
                        <CustomInputField
                            label="Detalles de la vacuna"
                            name="field3"
                            control={control as unknown as Control<FieldValues, object>}
                            placeholder="Ej. 2 days, 3 weeks, etc..."
                        />
                        <CustomInputField
                            label="Número del lote"
                            name="field4"
                            control={control as unknown as Control<FieldValues, object>}
                            placeholder="Ej. 2 days, 3 weeks, etc..."
                        />
                        <CustomTextarea
                            label="Additional notes"
                            name="field5"
                            control={control as unknown as Control<FieldValues, object>}
                            placeholder="Text"
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
});

export default AddAndEditVaccine;
