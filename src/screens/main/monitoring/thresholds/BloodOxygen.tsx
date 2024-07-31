
import React from 'react'
import CustomSelect from '../../../../components/formComp/SelectFiled'
import { Control, FieldValues, useForm } from 'react-hook-form'
import CommonThresholdLayout from '../components/CommonThresholdLayout'
import { View } from 'react-native'

const BloodOxygen = () => {
    const { control, handleSubmit, reset, formState: { errors } } = useForm();

    return (
        <CommonThresholdLayout title='Blood Oxygen'>
            <View style={{ marginBottom: 10 }}>
                <CustomSelect
                    name='minimum'
                    label='Minimum'
                    control={control as unknown as Control<FieldValues, object>}
                    options={[
                        { label: '92 SpO2H', value: '92 SpO2H' },
                        { label: '93 SpO2H', value: '93 SpO2H' },
                        { label: '94 SpO2H', value: '94 SpO2H' },
                        { label: '95 SpO2H', value: '95 SpO2H' },
                    ]}
                />
            </View>
        </CommonThresholdLayout >
    )
}

export default BloodOxygen 