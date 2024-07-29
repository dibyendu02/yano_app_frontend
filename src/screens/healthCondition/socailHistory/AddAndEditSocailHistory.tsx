// AddAndEditSocialHistory.tsx
import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Colors } from '../../../constants/Colors';
import Header from '../../../components/header/Header';
import FilledButton from '../../../components/buttons/FilledButton';
import CustomInputField from '../../../components/formComp/CustomInputField';
import { useForm, Control, FieldValues } from 'react-hook-form';
import CustomSelect from '../../../components/formComp/SelectFiled'; 
import CustomDatePicker from '../../../components/formComp/CustomDatePicker'; 
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

const AddAndEditSocialHistory = ({ navigation, route }: any) => {
    let data = null;
    if (route?.params) {
        data = route.params.data;
    }
    const [disabled, setDisabled] = useState(true);
    const [defaultValues, setDefaultValues] = useState<any>({ 
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
        substance: data?.substance || false,
        stressFactor: data?.stressFactor || '',
        exercise: data?.exercise || '',
        spokenLanguages: data?.spokenLanguages || '',
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
                            label="Occupation"
                            name="occupation"
                            control={control as unknown as Control<FieldValues, object>}
                            placeholder="Ej. Diabetes tipo II, Hypertension, etc... "
                            rules={{ required: 'required' }}
                        /> 
                        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
                            <View style={{ width: "60%" }}>
                                <CustomInputField
                                    label='Education'
                                    name="education"
                                    control={control as unknown as Control<FieldValues, object>}
                                    placeholder="Education"
                                />
                            </View>
                            <View style={{ width: "38%" }}>
                                <CustomDatePicker
                                    label="Date"
                                    name="date"
                                    control={control as unknown as Control<FieldValues, object>}
                                />
                            </View>
                        </View>
                        <CustomInputField
                            label="Place of birth"
                            name="placeOfBirth"
                            control={control as unknown as Control<FieldValues, object>}
                            placeholder="Place of birth"    
                        />
                        <CustomSelect
                            label="Marital status"
                            name="maritalStatus"
                            control={control as unknown as Control<FieldValues, object>}
                            placeholder="Select marital status"
                            options={[
                                { label: 'Single', value: 'single' },
                                { label: 'Married', value: 'married' },
                                { label: 'Divorced', value: 'divorced' },
                                { label: 'Widowed', value: 'widowed' },
                            ]}  
                        />
                        <CustomInputField
                            label="Children"
                            name="children"
                            control={control as unknown as Control<FieldValues, object>}
                            placeholder="Children"
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
                        <CustomSelect
                            label='Sexual Orientation'
                            name='sex'
                            control={control as unknown as Control<FieldValues, object>}
                            options={[
                                { label: 'Heterosexual', value: 'heterosexual' },
                                { label: 'Homosexual', value: 'homosexual' },
                                { label: 'Bisexual', value: 'bisexual' },
                                { label: 'Asexual', value: 'asexual' },
                            ]}
                        />
                        <CustomSelect
                            label='Do you smoke?'
                            name='isSmoke'
                            control={control as unknown as Control<FieldValues, object>}
                            options={[
                                { label: 'Yes', value: 'yes' },
                                { label: 'No', value: 'no' },
                            ]}
                        />
                        <CustomSelect
                            label='Do you consume alcohol?'
                            name='consumeAlcohol'
                            control={control as unknown as Control<FieldValues, object>}
                            options={[
                                { label: 'Yes', value: 'yes' },
                                { label: 'No', value: 'no' },
                            ]}
                        />
                        <CustomInputField
                            label='Use of other substances'
                            name='substance'
                            control={control as unknown as Control<FieldValues, object>}
                            placeholder='Use of other substances'
                        />
                        <CustomInputField
                            label='Do you exercise?'
                            name='exercise'
                            control={control as unknown as Control<FieldValues, object>} 
                            placeholder='Do you exercise?'
                        />
                        <CustomInputField
                            label='Stress factor'
                            name='stressFactor'
                            control={control as unknown as Control<FieldValues, object>}
                            placeholder='Stress factor'
                        />
                        <CustomInputField
                            label='Spoken languages'
                            name='spokenLanguages'
                            control={control as unknown as Control<FieldValues, object>}
                            placeholder='Spoken languages'
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

export default AddAndEditSocialHistory;
