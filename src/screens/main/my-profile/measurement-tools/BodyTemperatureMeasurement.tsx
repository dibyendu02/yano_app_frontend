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
        "text": "Point the temperature sensor at the center of the forehead.",
        "img": StaticImage.CentreToForeHead
    },
    {
        "page": "2",
        "text": "Keep the device at a distance of 1-2 cm from the skin.",
        "img": StaticImage.TwoCmFromForeHead
    },
    {
        "page": "3",
        "text": "To start measuring press the \"Start measuring\" button.",
        "img": StaticImage.StartMeasuring
    }
];
const BodyTemperatureMeasurement = () => {
    const [loading, setLoading] = useState(false)
    const [count, setCount] = useState(0)

    const [values, setValues] = useState(0)
    const handleStartMeasurements = () => {
        setLoading(true);
        const interval = setInterval(() => {
            setLoading(false);
            setValues(37)
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
                            title='Body Temperature'
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
                                                name: 'Body Temperature',
                                                value: values,
                                                unit: '°C'
                                            }}
                                            customStyles={{
                                                width: '100%',
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
                                                }} >Normal Body Temperature</Text>
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

export default BodyTemperatureMeasurement

const styles = StyleSheet.create({})