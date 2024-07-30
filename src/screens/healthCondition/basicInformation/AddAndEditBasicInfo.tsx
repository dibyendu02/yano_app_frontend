// AddAndEditBasicInfo.tsx
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
import CustomSelect from '../../../components/formComp/SelectFiled';
import CommonHeader from '../components/CommonHeader';

interface FormValues {
    height: string,
    weight: string,
    bloodGroup: string,
}

const AddAndEditBasicInfo = ({ navigation, route }: any) => {
    let data = null;
    if (route?.params) {
        data = route.params.data;
    }
    const [disabled, setDisabled] = useState(true);
    const [defaultValues, setDefaultValues] = useState<FieldValues>({
        height: data?.height || "",
        weight: data?.weight || "",
        bloodGroup: data?.bloodGroup || "",
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
                            label="Height"
                            name="height"
                            control={control as unknown as Control<FieldValues, object>}
                            placeholder="Enter height"
                            rules={{ required: 'required*' }}
                        />
                        <CustomInputField
                            label="Weight"
                            name="weight"
                            control={control as unknown as Control<FieldValues, object>}
                            placeholder="Enter weight"
                        />
                        <CustomSelect
                            label='Blood Group'
                            name="bloodGroup"
                            control={control as unknown as Control<FieldValues, object>}
                            options={[
                                {label: "A+", value: "A+"},
                                {label: "b+", value: "b+"},
                                {label: "AB+", value: "AB+"},
                                {label: "O+", value: "O+"},
                                {label: "A-", value: "A-"},
                                {label: "B-", value: "B-"},
                                {label: "O-", value: "O-"},
                                {label: "AB-", value: "AB-"}, 
                            ]}
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

export default AddAndEditBasicInfo;
