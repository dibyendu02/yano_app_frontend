import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../../../constants/Colors'
import Header from '../../../../components/header/Header'
import CustomPasswordField from '../../../../components/formComp/CustomPasswordField'
import { Control, FieldValues, useForm } from 'react-hook-form'
import FilledButton from '../../../../components/buttons/FilledButton'

interface FormValues {
    oldPassword: "",
    newPassword: "",
    repeatPassword: ""
}

const ChangePassword = () => {
    const [disabled, setDisabled] = useState(true)
    const { control, handleSubmit, reset, formState: { errors, isValid } } = useForm<FormValues>();
    const onSubmit = (value: FormValues) => {
        console.log(value)
    }
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: Colors.GhostWhite,
                position: 'relative',
            }}
        >
            <Header
                title={'Change password'}
                headerRightComponent={
                    <FilledButton
                        type='blue'
                        label="Save"
                        onPress={handleSubmit(onSubmit)}
                        disabled={!isValid ? true : false}
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
                    <View>
                        <CustomPasswordField
                            name='oldPassword'
                            control={control as unknown as Control<FieldValues, object>}
                            label='Old password'
                            rules={{ required: "Old password is required" }}
                        />
                        <CustomPasswordField
                            name='newPassword'
                            control={control as unknown as Control<FieldValues, object>}
                            label='New password'
                            condition='At least 8 characters'
                            rules={{ required: "New password is required" }}
                        />
                        <CustomPasswordField
                            name='repeatPassword'
                            control={control as unknown as Control<FieldValues, object>}
                            label='Repeat new password'
                            condition='Must be the same as the new password'
                            rules={{ required: "Repeat password is required" }}
                        />
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ChangePassword

const styles = StyleSheet.create({})