// AddAndEditHospitalization.tsx
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
import CustomDatePicker from '../../../components/formComp/CustomDatePicker';
import CommonHeader from '../components/CommonHeader';

interface FormValues {
    name: string;
    reason: string;
    dischargeDate: string;
    admissionDate: string;
    doctorName: string;
}

const AddAndEditHospitalization = ({ navigation, route }: any) => {
    let data = null;
    if (route?.params) {
        data = route.params.data;
    }
    const [disabled, setDisabled] = useState(true);
    const [defaultValues, setDefaultValues] = useState<FormValues>({
        name: data?.name || '',
        reason: data?.reason || '',
        dischargeDate: data?.dischargeDate || '',
        admissionDate: data?.admissionDate || '',
        doctorName: data?.doctorName || '',
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
                            label="Name of the hospital"
                            name="name"
                            control={control as unknown as Control<FieldValues, object>}
                            placeholder="Name of the hospital"
                            rules={{ required: 'required' }}
                        />
                        <CustomInputField
                            label="Reason for hospitalization"
                            name="reason"
                            control={control as unknown as Control<FieldValues, object>}
                            placeholder="Reason for hospitalization"
                        />
                        <CustomDatePicker
                            label="Admission date"
                            name="admissionDate"
                            control={control as unknown as Control<FieldValues, object>}
                        />
                        <CustomDatePicker
                            label="Discharge date"
                            name="dischargeDate"
                            control={control as unknown as Control<FieldValues, object>}
                        />
                        <CustomInputField
                            label="Physician in charge"
                            name="doctorName"
                            control={control as unknown as Control<FieldValues, object>}
                            placeholder="Doctor's name"
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

export default AddAndEditHospitalization;
