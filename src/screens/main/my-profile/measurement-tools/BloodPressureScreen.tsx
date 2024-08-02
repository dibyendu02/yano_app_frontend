import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Header from '../../../../components/header/Header'
import { Colors } from '../../../../constants/Colors'
import CommonMeasurementScreen from '../components/CommonMeasurementScreen'
import MeasurementBox from '../components/MeasurementBox'
import { DummyImage } from '../../../../assets/dummy/images'

const BloodPressureScreen = () => {
    const [loading, setLoading] = useState(false)
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
                systolic: Math.floor(Math.random() * 200),
                diastolic: Math.floor(Math.random() * 200),
                heartRate: Math.floor(Math.random() * 200)
            })
        }, 3000);
        return () => clearInterval(interval);
    }

    return (
        <CommonMeasurementScreen
            loading={loading}
            onPress={handleStartMeasurements}
            element={
                <>
                    <Header title='Blood Pressure' />
                    <ScrollView>
                        <View style={{ padding: 20 }}>
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
                                />
                                <MeasurementBox
                                    loading={loading}
                                    fields={{
                                        name: 'Diastolic',
                                        value: values.diastolic,
                                        unit: 'mmHg'
                                    }}
                                />
                                <MeasurementBox
                                    loading={loading}
                                    fields={{
                                        name: 'Heart rate',
                                        value: values.heartRate,
                                        unit: 'Beats/Min'
                                    }}
                                />
                            </View>

                            <View style={{
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
                        </View>
                    </ScrollView>
                </>
            }
        />
    )
}

export default BloodPressureScreen

const styles = StyleSheet.create({
    heading: {
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center'
    },
    value: {
        fontSize: 32,
        fontWeight: '700',
        textAlign: 'center',
        marginVertical: 6,
        color: Colors.Blue
    },
    unit: {
        fontSize: 13,
        fontWeight: '500',
        textAlign: 'center'
    },

})