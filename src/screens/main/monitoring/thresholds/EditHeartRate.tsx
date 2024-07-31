import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Colors } from '../../../../constants/Colors'
import CustomSelect from '../../../../components/formComp/SelectFiled'
import { Control, FieldValues, useForm } from 'react-hook-form'
import CommonThresholdLayout from '../components/CommonThresholdLayout'

const EditHeartRate = () => {
    const { control, handleSubmit, reset, formState: { errors } } = useForm();

    return (
        <CommonThresholdLayout title='Heart Rate'>
            <View style={styles.container}>
                <View style={{
                    width: '45%',
                    borderRadius: 10,
                    overflow: 'hidden',
                }}>
                    <CustomSelect
                        name='minimum'
                        label='Minimum'
                        control={control as unknown as Control<FieldValues, object>}
                        options={[
                            { label: '40BPM', value: '40BPM' },
                            { label: '50BPM', value: '50BPM' },
                            { label: '60BPM', value: '60BPM' },
                            { label: '70BPM', value: '670BPM' },
                        ]}
                    />
                </View>
                <View style={{
                    width: '45%',
                    borderRadius: 10,
                    overflow: 'hidden',
                }}>
                    <CustomSelect
                        name='maximum'
                        label='Maximum'
                        control={control as unknown as Control<FieldValues, object>}
                        options={[
                            { label: '80BPM', value: '80BPM' },
                            { label: '90BPM', value: '90BPM' },
                            { label: '100BPM', value: '100BPM' },
                            { label: '120BPM', value: '120BPM' },
                        ]}
                    />
                </View>
            </View>
        </CommonThresholdLayout>
    )
}

export default EditHeartRate

const styles = StyleSheet.create({ 
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    }
})