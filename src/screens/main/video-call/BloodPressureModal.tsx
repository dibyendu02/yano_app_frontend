import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CommonVideoCallLayout from './components/CommonVideoCallLayout'
import CustomBottomModal from '../../../components/bottom-sheet/CommonButtonModal'
import MeasurementBox from '../my-profile/components/MeasurementBox'
import { Colors } from '../../../constants/Colors'
import { DummyImage } from '../../../assets/dummy/images'
import CommonLayoutModal from './components/CommonLayoutModal'

const BloodPressureModal = () => {
    const [loading, setLoading] = useState(false)
    const [count, setCount] = useState(0)

    const [values, setValues] = useState({
        systolic: 0,
        diastolic: 0,
        heartRate: 0
    })
    const handleStartMeasurements = () => {
        setLoading(true);
        const interval = setInterval(() => {
            setLoading(false);
            setValues({
                systolic: 119,
                diastolic: 78,
                heartRate: 73
            })
            setCount(count + 1)
        }, 3000);
        return () => clearInterval(interval);
    }

    return (
        <CommonVideoCallLayout>
            <CustomBottomModal
                isVisible={true}
                onBackdropPress={() => (<></>)}
            >
                <CommonLayoutModal heading="Blood Pressure" loading={loading} onPress={handleStartMeasurements} >
                    <>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            gap: 2
                        }}>
                            <MeasurementBox
                                loading={loading}
                                fields={{
                                    name: 'Systolic',
                                    value: values.systolic,
                                    unit: 'mmHg'
                                }}
                                customStyles={styles.border}
                            />
                            <MeasurementBox
                                loading={loading}
                                fields={{
                                    name: 'Diastolic',
                                    value: values.diastolic,
                                    unit: 'mmHg'
                                }}
                                customStyles={styles.border}
                            />
                            <MeasurementBox
                                loading={loading}
                                fields={{
                                    name: 'Heart rate',
                                    value: values.heartRate,
                                    unit: 'Beats/Min'
                                }}
                                customStyles={styles.border}
                            />
                        </View>

                        {count !== 0 && <View style={{
                            padding: 20,
                            backgroundColor: Colors.White,
                            borderRadius: 10,
                            marginVertical: 20,
                        }} >
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 10
                            }}>
                                <View style={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: 20,
                                    backgroundColor: Colors.Green
                                }} ></View>
                                <Text style={{
                                    fontSize: 20,
                                    fontWeight: '600',
                                    color: Colors.Blue
                                }} >Normal blood pressure</Text>
                            </View>
                            <View>
                                <Image
                                    source={DummyImage.bloodOxygen}
                                    width={400}
                                    style={{
                                        width: '100%',
                                        // height: 10,
                                        marginTop: 30
                                    }}
                                />
                            </View>
                        </View>
                        }
                    </>
                </CommonLayoutModal>
            </CustomBottomModal>
        </CommonVideoCallLayout>
    )
}

export default BloodPressureModal

const styles = StyleSheet.create({ 
    border: {
        borderWidth: 1,
        borderColor: Colors.LightGray,
    }
})