import { StyleSheet, View } from 'react-native'
import React from 'react' 
import CustomSelect from '../../../../components/formComp/SelectFiled'
import { Control, FieldValues, useForm } from 'react-hook-form'
import CommonThresholdLayout from '../components/CommonThresholdLayout'

const GlucoseLevel = () => {
    const { control, handleSubmit, reset, formState: { errors } } = useForm();

    return (
        <CommonThresholdLayout title='Glucose level'>
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
                            { label: '4 mmol/L', value: '4 mmol/L' }, 
                            { label: '5 mmol/L', value: '5 mmol/L' },
                            { label: '6 mmol/L', value: '6 mmol/L' },
                            { label: '7 mmol/L', value: '7 mmol/L' },
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
                            { label: '8 mmol/L', value: '8 mmol/L' },
                            { label: '9 mmol/L', value: '9 mmol/L' },
                            { label: '10 mmol/L', value: '10 mmol/L' },
                            { label: '11 mmol/L', value: '11 mmol/L' },
                        ]}
                    />
                </View>
            </View>
        </CommonThresholdLayout>
    )
}

export default GlucoseLevel

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    }
})