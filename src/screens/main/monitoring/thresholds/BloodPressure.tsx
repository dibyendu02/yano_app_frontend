import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Colors } from '../../../../constants/Colors'
import CustomSelect from '../../../../components/formComp/SelectFiled'
import { Control, FieldValues, useForm } from 'react-hook-form'
import CommonThresholdLayout from '../components/CommonThresholdLayout'

const BloodPressure = () => {
    const { control, handleSubmit, reset, formState: { errors } } = useForm();

    return (
        <CommonThresholdLayout title='Blood pressure'>
            <View style={styles.container}>
                <View style={{
                    width: '45%',
                    borderRadius: 10,
                    overflow: 'hidden',
                }}>
                    <CustomSelect
                        name='systolicMinimum'
                        label='Systolic minimum'
                        control={control as unknown as Control<FieldValues, object>}
                        options={[
                            { label: '100 mmHg', value: '100 mmHg' }, 
                            { label: '110 mmHg', value: '110 mmHg' },
                            { label: '120 mmHg', value: '120 mmHg' },
                            { label: '130 mmHg', value: '130 mmHg' },
                        ]}
                    />
                </View>
                <View style={{
                    width: '45%',
                    borderRadius: 10,
                    overflow: 'hidden',
                }}>
                    <CustomSelect
                        name='systolicMaximum'
                        label='systolic Minimum'
                        control={control as unknown as Control<FieldValues, object>}
                        options={[ 
                            { label: '140 mmHg', value: '140 mmHg' },
                            { label: '150 mmHg', value: '150 mmHg' },
                            { label: '160 mmHg', value: '160 mmHg' },
                            { label: '170 mmHg', value: '170 mmHg' },
                        ]}
                    />
                </View>
            </View>
            <View style={styles.container}>
                <View style={{
                    width: '45%',
                    borderRadius: 10,
                    overflow: 'hidden',
                }}>
                    <CustomSelect
                        name='diastolicMinimum'
                        label='Diastolic minimum'
                        control={control as unknown as Control<FieldValues, object>}
                        options={[
                            { label: '100 mmHg', value: '100 mmHg' }, 
                            { label: '110 mmHg', value: '110 mmHg' },
                            { label: '120 mmHg', value: '120 mmHg' },
                            { label: '130 mmHg', value: '130 mmHg' },
                        ]}
                    />
                </View>
                <View style={{
                    width: '45%',
                    borderRadius: 10,
                    overflow: 'hidden',
                }}>
                    <CustomSelect
                        name='diastolicMaximum'
                        label='Diastolic maximnum'
                        control={control as unknown as Control<FieldValues, object>}
                        options={[ 
                            { label: '140 mmHg', value: '140 mmHg' },
                            { label: '150 mmHg', value: '150 mmHg' },
                            { label: '160 mmHg', value: '160 mmHg' },
                            { label: '170 mmHg', value: '170 mmHg' },
                        ]}
                    />
                </View>
            </View>
        </CommonThresholdLayout>
    )
}

export default BloodPressure

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    }
})