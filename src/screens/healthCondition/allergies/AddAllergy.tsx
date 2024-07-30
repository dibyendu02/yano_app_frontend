import { SafeAreaView, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../../constants/Colors'
import Header from '../../../components/header/Header'
import FilledButton from '../../../components/buttons/FilledButton'
import { ScrollView } from 'react-native'
import { InputField } from '../../../components/form/InputField'
import { DatePickerField } from '../../../components/form/DatePicker' 
import { TextArea } from '../../../components/form/TextAreaField'
import CommonHeader from '../components/CommonHeader'

const AddAndEditAllergy = ({ navigation, route }: any) => {
    let data = null;
    if (route?.params) {
        data = route.params.data;
    }

    const [disabled, setDisabled] = useState(true);
    const [formData, setFormData] = useState({
        name: data?.name || '',
        date: data?.date || '',
        details: data?.details || '',
        moreDetails: data?.moreDetails || '',
        treatedBy: data?.treatedBy || '',
        medicine: data?.medicine || '',
        additionalNotes: data?.additionalNotes || '',
    }); 

    const handelChange = (id: string, e: string) => {
        setFormData({ ...formData, [id]: e });
        if (formData.name) setDisabled(false);
        else setDisabled(true);
    };

    const handelSubmit = () => {
        console.log(formData);
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
                            label="Name of the allergy"
                            name="name"
                            placeholder="Ej. Diabetes tipo II, Hypertension, etc... "
                            value={formData.name}
                            onchange={handelChange}
                        />
                        <InputField
                            label="Details of the allergy"
                            name="details"
                            placeholder="Ej. Diabetes tipo II, Hypertension, etc... "
                            value={formData.details}
                            onchange={handelChange}
                        />
                        <InputField
                            label="More Details"
                            name="moreDetails"
                            placeholder="Ej. Diabetes tipo II, Hypertension, etc... "
                            value={formData.moreDetails}
                            onchange={handelChange}
                        />
                        <InputField
                            label="Treated By"
                            name="treatedBy"
                            placeholder="Ej. Dr. House"
                            value={formData.treatedBy}
                            onchange={handelChange}
                        />
                        <DatePickerField
                            label="Date of diagnosis"
                            name="date"
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
                            placeholder="Additional notes"
                            value={formData.additionalNotes}
                            onchange={handelChange}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default AddAndEditAllergy

const styles = StyleSheet.create({
    inputBox: {
        marginBottom: 20,
    },
})