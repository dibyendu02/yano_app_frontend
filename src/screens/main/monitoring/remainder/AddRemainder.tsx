import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CommonLayout from '../../../../components/CommonLayout'
import Header from '../../../../components/header/Header'
import FilledButton from '../../../../components/buttons/FilledButton'
import CustomInputField from '../../../../components/formComp/CustomInputField'
import { Control, FieldValues, useForm } from 'react-hook-form'
import CustomDatePicker from '../../../../components/formComp/CustomDatePicker'
import { RepeatIcon } from '../../../../assets/icon/IconNames'
import { Colors } from '../../../../constants/Colors'
import CustomTimePicker from '../../../../components/formComp/CustomTimePicker'
import { navigate } from '../../../../navigation/RootNavigation'

const AddRemainder = ({ route }: any) => { 
    let data = null;
    if (route.params) {
        data = route.params.data;
    }
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: data?.name || '',
            date: data?.date || new Date(),
            frequency: data?.frequency || '1',
            // time: data.time || new Date().toLocaleTimeString(),
        }
    });
    const onSubmit = (values: any) => {
        console.log(values);
    }
    return (
        <CommonLayout>
            <Header
                title='Add Remainder'
                headerRightComponent={
                    <FilledButton
                        type='blue'
                        label="Save"
                        onPress={handleSubmit(onSubmit)}
                        // disabled={!disabled}
                        style={{
                            width: 70,
                            paddingVertical: 10,
                            borderRadius: 10,
                        }}
                    />}
            />
            <ScrollView>
                <View style={{ padding: 20 }}>
                    <CustomInputField
                        label='What do you need to remind the patient?'
                        name='name'
                        control={control as unknown as Control<FieldValues, object>}
                    />
                    <CustomDatePicker
                        label='Start date'
                        name='date'
                        control={control as unknown as Control<FieldValues, object>}
                    />
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                    }}>
                        <View style={{
                            width: 100,
                        }}>
                            <CustomInputField
                                label='Frequency'
                                name='frequency'
                                value='1'
                                control={control as unknown as Control<FieldValues, object>}
                            />
                        </View>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: '500',
                            color: Colors.Blue,
                        }}>a day</Text>
                    </View>
                    <View style={{
                        width: "50%",
                    }} >
                        <CustomTimePicker
                            label='At'
                            name='time'
                            control={control as unknown as Control<FieldValues, object>}
                        />
                    </View>
                    <View style={{
                        borderTopWidth: 1,
                        borderBottomWidth: 1,
                        borderColor: Colors.LightGray,
                        paddingVertical: 10,
                    }}>
                        <TouchableOpacity style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 10,
                            paddingVertical: 10
                        }}
                            onPress={() => navigate('SetRepetition')}
                        >
                            <RepeatIcon />
                            <Text style={{
                                fontSize: 18,
                                fontWeight: '600',
                                color: Colors.Blue,
                            }} >Set repetition</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </CommonLayout>
    )
}

export default AddRemainder

const styles = StyleSheet.create({})