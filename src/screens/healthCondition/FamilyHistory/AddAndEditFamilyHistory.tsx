// AddAndEditFamilyHistory.tsx
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
import CommonHeader from '../components/CommonHeader';

interface FormValues {
    name: string;
    disease: string; 
}

const AddAndEditFamilyHistory = ({ navigation, route }: any) => {
    let data = null;
    if (route?.params) {
        data = route.params.data;
    }
    const [disabled, setDisabled] = useState(true);
    const [defaultValues, setDefaultValues] = useState<FieldValues>({
        name: data?.name || '',
        disease: data?.disease || '', 
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
                            label="Relationship to family member"
                            name="name"
                            control={control as unknown as Control<FieldValues, object>}
                            placeholder="Relationship to family member"
                            rules={{ required: 'required*' }}
                        />
                        <CustomInputField
                            label="Family member's health condition"
                            name="disease"
                            control={control as unknown as Control<FieldValues, object>}
                            placeholder="Family member's health condition"
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

export default AddAndEditFamilyHistory;
