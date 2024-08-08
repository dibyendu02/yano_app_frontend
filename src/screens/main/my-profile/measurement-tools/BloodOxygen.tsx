import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CommonMeasurementScreen from '../components/CommonMeasurementScreen'
import Header from '../../../../components/header/Header'
import MeasurementBox from '../components/MeasurementBox'
import { Colors } from '../../../../constants/Colors'
import { DummyImage } from '../../../../assets/dummy/images'
import { ShareIcon } from '../../../../assets/icon/IconNames'
import { StaticImage } from '../../../../assets/images'

const help = [
    {
        "page": "1",
        "text": "For best results make sure you are in a place with low light.",
        "img": StaticImage.stopFromSunLight
    },
    {
        "page": "2",
        "text": "Adjust your position and keep still.",
        "img": StaticImage.SittingPosition
    },
    {
        "page": "3",
        "text": "Keep the monitor on a flat surface.",
        "img": StaticImage.FlatSurface
    },
    {
        "page": "4",
        "text": "Put the pad of your middle finger on the sensor at the top of the monitor.",
        "img": StaticImage.TouchTheSensor
    },
    {
        "page": "5",
        "text": "To start measuring press the \"Start measuring\" button.",
        "img": StaticImage.StartMeasuring
    }
];

const BloodOxygenScreen = () => {
    const [loading, setLoading] = useState(false)
    const [count, setCount] = useState(0)

    const [values, setValues] = useState({
        spo2: 0,
        heartRate: 0
    })
    const handleStartMeasurements = () => {
        setLoading(true);
        const interval = setInterval(() => {
            setLoading(false);
            setValues({
                spo2: 100,
                heartRate: 74
            })
            setCount(count + 1)
        }, 3000);
        return () => clearInterval(interval);
    }
    return (
        <>
            <CommonMeasurementScreen
                loading={loading}
                onPress={() => handleStartMeasurements()}
                element={
                    <>
                        <Header
                            title='Blood Oxygen'
                            headerRightComponent={<ShareIcon />}
                        />
                        <ScrollView>
                            <View style={{ padding: 15 }}>
                                <View style={{ padding: 20 }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        gap: 2
                                    }}>
                                        <MeasurementBox
                                            loading={loading}
                                            fields={{
                                                name: 'SpO2H',
                                                value: values.spo2,
                                                unit: '%'
                                            }}
                                            customStyles={{
                                                width: '70%',
                                            }}
                                        />
                                        <MeasurementBox
                                            loading={loading}
                                            fields={{
                                                name: 'Heart Rate',
                                                value: values.heartRate,
                                                unit: 'Beats/min'
                                            }}
                                        />
                                    </View>
                                    {count !== 0 &&
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
                                                }} >Normal blood Oxygen</Text>
                                            </View>
                                            <View>
                                                <Image
                                                    source={DummyImage.bp}
                                                    width={400}
                                                    style={{
                                                        width: '100%',
                                                        // height: 10,
                                                        marginTop: 30
                                                    }}
                                                />
                                            </View>
                                        </View>}
                                </View>
                            </View>
                        </ScrollView>
                    </>
                }
                help={help}
            />
        </>
    )

}

export default BloodOxygenScreen

const styles = StyleSheet.create({})