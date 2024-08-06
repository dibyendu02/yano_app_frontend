import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import CommonVideoCallLayout from './components/CommonVideoCallLayout';
import CustomBottomModal from '../../../components/bottom-sheet/CommonButtonModal';
import MeasurementBox from '../my-profile/components/MeasurementBox';
import { Colors } from '../../../constants/Colors';
import { DummyImage } from '../../../assets/dummy/images';
import CommonLayoutModal from './components/CommonLayoutModal';

const ECGModal = () => {
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(0);

    const [values, setValues] = useState({
        spo2: 0,
        heartRate: 0,
    });
    const handleStartMeasurements = () => {
        setLoading(true);
        const interval = setInterval(() => {
            setLoading(false);
            setValues({
                spo2: 100,
                heartRate: 74,
            });
            setCount(count + 1);
        }, 3000);
        return () => clearInterval(interval);
    };

    return (
        <CommonVideoCallLayout>
            <CustomBottomModal isVisible={true} onBackdropPress={() => <></>}>
                <CommonLayoutModal
                    heading="ECG"
                    loading={loading}
                    onPress={handleStartMeasurements}>
                    <>
                        <View
                            style={{
                                backgroundColor: Colors.White,
                                width: '100%',
                                borderRadius: 10,
                                padding: 20,
                            }}>
                            <Image
                                source={DummyImage.graph}
                                style={{
                                    width: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    marginTop: 20,
                                }}>
                                <Text
                                    style={{
                                        fontSize: 14,
                                        fontWeight: '500',
                                        color: Colors.SteelBlue,
                                    }}>
                                    Gain: 10mm/mv
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 14,
                                        fontWeight: '500',
                                        color: Colors.SteelBlue,
                                    }}>
                                    Paper speed: 10mm/mv
                                </Text>
                            </View>
                        </View>
                        <View style={{ padding: 20 }}>
                            {count === 0 ? (
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        gap: 2,
                                    }}>
                                    <MeasurementBox
                                        loading={loading}
                                        fields={{
                                            name: 'Heart Rate',
                                            value: values.heartRate,
                                            unit: 'Beats/min',
                                        }}
                                        customStyles={{
                                            width: '70%',
                                            borderWidth: 1,
                                            borderColor: Colors.LightGray,
                                        }}
                                    />
                                    <MeasurementBox
                                        loading={loading}
                                        fields={{
                                            name: 'Time Left',
                                            value: values.spo2,
                                            unit: 'Seconds',
                                        }}
                                        customStyles={styles.border}
                                    />
                                </View>
                            ) : (
                                <View
                                    style={{
                                        padding: 20,
                                        backgroundColor: Colors.White,
                                        borderRadius: 10,
                                        borderWidth: 1,
                                        borderColor: Colors.LightGray,
                                    }}>
                                    <Text style={styles.title}>Sample details</Text>
                                    <View style={styles.boxStyle}>
                                        <Text style={styles.text}>
                                            ECG date:
                                        </Text>
                                        <Text
                                            style={[
                                                styles.text,
                                                { color: Colors.Blue, fontWeight: '600' },
                                            ]}>
                                            16/2/2022 - 13:45 PM
                                        </Text>
                                    </View>
                                    <View style={styles.boxStyle}>
                                        <Text style={styles.text}>
                                            Average heart rate:
                                        </Text>
                                        <Text
                                            style={[
                                                styles.text,
                                                { color: Colors.Blue, fontWeight: '600' },
                                            ]}>
                                            80 LPM
                                        </Text>
                                    </View>
                                    <View style={[styles.boxStyle, {
                                        flexDirection: "row",
                                        justifyContent: "space-between",

                                    }]} >
                                        <View style={{
                                            flexDirection: "row",
                                            alignItems: "center"
                                        }} >
                                            <Text style={styles.text}>
                                                RR Max:
                                            </Text>
                                            <Text
                                                style={[
                                                    styles.text,
                                                    { color: Colors.Blue, fontWeight: '600' },
                                                ]}>
                                                804
                                            </Text>
                                        </View>
                                        <View style={{
                                            flexDirection: "row",
                                            alignItems: "center"
                                        }} >
                                            <Text style={styles.text}>
                                                RR Min:
                                            </Text>
                                            <Text
                                                style={[
                                                    styles.text,
                                                    { color: Colors.Blue, fontWeight: '600' },
                                                ]}>
                                                693
                                            </Text>
                                        </View>
                                        <View style={{
                                            flexDirection: "row",
                                            alignItems: "center"
                                        }} >
                                            <Text style={styles.text}>
                                                HRV:
                                            </Text>
                                            <Text
                                                style={[
                                                    styles.text,
                                                    { color: Colors.Blue, fontWeight: '600' },
                                                ]}>
                                                28
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.boxStyle}>
                                        <Text style={styles.text}>
                                            Respiratory rate:
                                        </Text>
                                        <Text
                                            style={[
                                                styles.text,
                                                { color: Colors.Blue, fontWeight: '600' },
                                            ]}>
                                            19
                                        </Text>
                                    </View>
                                    <View style={styles.boxStyle}>
                                        <Text style={styles.text}>
                                            Mood:
                                        </Text>
                                        <Text
                                            style={[
                                                styles.text,
                                                { color: Colors.Blue, fontWeight: '600' },
                                            ]}>
                                            Relaxed
                                        </Text>
                                    </View>
                                </View>
                            )}
                        </View>
                    </>
                </CommonLayoutModal>
            </CustomBottomModal>
        </CommonVideoCallLayout>
    );
};

export default ECGModal;

const styles = StyleSheet.create({
    border: {
        borderWidth: 1,
        borderColor: Colors.LightGray,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: Colors.Blue,
        marginBottom: 6,

    },
    boxStyle: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
        marginVertical: 10,
        borderBottomWidth: 1,
        borderColor: Colors.LightGray,
        paddingBottom: 10
    },
    text: {
        fontSize: 16,
        color: Colors.SteelBlue,
    },
});
