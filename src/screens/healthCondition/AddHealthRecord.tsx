import { ScrollView, StyleSheet, View } from 'react-native';
import React, { FC, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import Header from '../../components/header/Header';
import FilledButton from '../../components/buttons/FilledButton';
import { InputField } from '../../components/form/inputField';
import { SelectField } from '../../components/form/SelectField';
import { DatePickerField } from '../../components/form/DatePicker';
import { TextArea } from '../../components/form/TextAreaField';

const AddHealthRecord = ({ navigation, route }: any) => {
    let data = null;
    if (route?.params) {
        data = route.params.data;
    }
    const [disabled, setDisabled] = useState(true);
    const [formData, setFormData] = useState({
        name: data?.name || '',
        date: data?.date || '',
        status: data?.status || '',
        treatedBy: data?.treatedBy || '',
        medicine: data?.medicine || '',
        additionalNotes: data?.additionalNotes || '',
    });
    const selectOptions = [
        { label: 'Active', value: 'Active' },
        { label: 'Inactive', value: 'Inactive' },
    ]

    const handelChange = (id: string, e: string) => {
        setFormData({ ...formData, [id]: e });
        if (formData.name) setDisabled(false)
        else setDisabled(true)
    };
    const handelSubmit = () => {
        console.log(formData)
    }
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: Colors.LightGray,
                position: 'relative',
            }}>
            <Header
                title={data ? "Edit" : "Add"}
                rightComp1={
                    <FilledButton
                        label="Save"
                        onPress={handelSubmit}
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
                <View style={{ padding: 20 }}>
                    <View style={styles.inputBox}>
                        <InputField
                            label="Name of the health condition"
                            name="name"
                            placeholder="Ej. Diabetes tipo II, Hypertension, etc... "
                            value={formData.name}
                            onchange={handelChange}
                        />
                        <DatePickerField
                            label="Date of diagnosis"
                            name="date"
                            onchange={handelChange}
                        />
                        <SelectField
                            label="Status"
                            name="status"
                            value={formData.status}
                            data={selectOptions}
                            onchange={handelChange}
                        />
                        <InputField
                            label="Treated By"
                            name="treatedBy"
                            placeholder="Ej. Dr. House"
                            value={formData.treatedBy}
                            onchange={handelChange}
                        />
                        <InputField
                            label="Medicine"
                            name="medicine"
                            placeholder="Ej. Losartán Potásico,  metformina, etc."
                            value={formData.medicine}
                            onchange={handelChange}
                        />
                        <TextArea
                            label="Additional Notes"
                            name="additionalNotes"
                            placeholder=""
                            value={formData.additionalNotes}
                            onchange={handelChange} 
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default AddHealthRecord;

const styles = StyleSheet.create({
    formContainer: {},
    inputBox: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.Blue,
    },
    input: {
        backgroundColor: Colors.White,
        borderRadius: 8,
        marginTop: 5,
        borderWidth: 1,
        borderColor: Colors.LightGray,
        height: 56,
        paddingHorizontal: 15,
        fontSize: 16,
    },
});
