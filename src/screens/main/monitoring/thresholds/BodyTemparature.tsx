import { StyleSheet, View } from 'react-native'
import React from 'react' 
import CustomSelect from '../../../../components/formComp/SelectFiled'
import { Control, FieldValues, useForm } from 'react-hook-form'
import CommonThresholdLayout from '../components/CommonThresholdLayout'

const BodyTemperature = () => {
    const { control, handleSubmit, reset, formState: { errors } } = useForm();

    return (
        <CommonThresholdLayout title='Body Temperature'>
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
                            { label: '34 °C ', value: '34 °C' },
                            { label: '35 °C ', value: '35 °C' },
                            { label: '36 °C ', value: '36 °C' },
                            { label: '37 °C ', value: '37 °C' },
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
                            { label: '38 °C ', value: '38 °C' },
                            { label: '39 °C ', value: '39 °C' },
                            { label: '40 °C ', value: '40 °C' },
                            { label: '41 °C ', value: '41 °C' },
                        ]}
                    />
                </View>
            </View>
        </CommonThresholdLayout>
    )
}

export default BodyTemperature

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    }
})