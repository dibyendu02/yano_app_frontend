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
        "text": "Sit in a comfortable position with your back straight and your legs uncrossed.",
        "img": StaticImage.SittingPosition
    },
    {
        "page": "2",
        "text": "Hold the device with your left hand and with your thumb touches the metal part at the top of the blood oxygen sensor.",
        "img": StaticImage.ThumpTouchesTheMetalpart
    },
    {
        "page": "3",
        "text": "Your index and middle fingers should touch the metal on the back of the device.",
        "img": StaticImage.MFingureTouchBackMetal
    },
    {
        "page": "4",
        "text": "With the index finger of the right hand, touch the body temperature sensor. The two hands should not touch.",
        "img": StaticImage.TwoHandShouldNotTouch
    },
    {
        "page": "5",
        "text": "To start measuring press the \"Start measuring\" button.",
        "img": StaticImage.StartMeasuring
    }
];

const EcgMeasurement = () => {
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
                            title='ECG'
                            headerRightComponent={<ShareIcon />}
                        />
                        <ScrollView>
                            <View style={{ padding: 15 }}>
                                <View
                                    style={{
                                        backgroundColor: Colors.White,
                                        width: '100%',
                                        borderRadius: 10,
                                        padding: 20
                                    }}
                                >
                                    <Image
                                        source={DummyImage.graph}
                                        style={{
                                            width: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-around',
                                        marginTop: 20
                                    }}>
                                        <Text style={{
                                            fontSize: 14,
                                            fontWeight: '500',
                                            color: Colors.SteelBlue
                                        }} >
                                            Gain: 10mm/mv
                                        </Text>
                                        <Text style={{
                                            fontSize: 14,
                                            fontWeight: '500',
                                            color: Colors.SteelBlue
                                        }} >
                                            Paper speed: 10mm/mv
                                        </Text>
                                    </View>
                                </View>
                                <View style={{ padding: 20 }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        gap: 2
                                    }}>
                                        <MeasurementBox
                                            loading={loading}
                                            fields={{
                                                name: 'Heart Rate',
                                                value: values.heartRate,
                                                unit: 'Beats/min'
                                            }}
                                            customStyles={{
                                                width: '70%',
                                            }}
                                        />
                                        <MeasurementBox
                                            loading={false}
                                            fields={{
                                                name: 'Time Left',
                                                value: values.spo2,
                                                unit: 'Seconds'
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
                                                }} >Normal blood pressure</Text>
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

export default EcgMeasurement

const styles = StyleSheet.create({})