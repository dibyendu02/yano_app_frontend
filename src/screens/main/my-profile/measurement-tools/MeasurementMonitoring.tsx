import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../../../components/header/Header'
import { Colors } from '../../../../constants/Colors'
import { BatteryCharge, BluetoothConnected, SettingsIcon } from '../../../../assets/icon/IconNames'
import MeasurementItems from '../components/MeasurementItems'
import { measurementList } from '../../../../assets/measurement-items/measurementList'
import { navigate } from '../../../../navigation/RootNavigation'

const MeasurementMonitoring = ({ navigation }: any) => {
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: Colors.GhostWhite,
                position: 'relative',
            }}
        >
            <Header
                title={'Monitor Multiparámetros Yano'}
                headerRightComponent={
                    <TouchableOpacity onPress={() => navigate('DeviceSettings')}>
                        <SettingsIcon size={24} />
                    </TouchableOpacity>
                }
            />

            <ScrollView>
                <View style={{ padding: 20 }}>
                    <View style={styles.boxStyle}>
                        <TouchableOpacity
                            style={[
                                styles.connectBtn,
                                { borderRightWidth: 2, borderColor: Colors.LightGray },
                            ]}>
                            <BluetoothConnected size={22} />
                            <Text style={styles.textStyle}>Connect</Text>
                        </TouchableOpacity>
                        <View style={[styles.connectBtn]}>
                            <BatteryCharge size={22} />
                            <Text style={styles.textStyle}>83%</Text>
                        </View>
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.heading} >measure</Text>
                        <MeasurementItems data={measurementList} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
        // <>
        //     <DeviceConnectedScreen/>
        // </>
    )
}

export default MeasurementMonitoring

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.White,
        borderRadius: 10,
        height: "auto",
        overflow: "hidden",
        marginBottom: 20
    },
    heading: {
        fontSize: 14,
        color: Colors.SteelBlue,
        textTransform: 'uppercase',
        fontWeight: "500",
        paddingTop: 10,
        paddingHorizontal: 20
    },
    boxStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 80,
        backgroundColor: Colors.White,
        marginBottom: 20,
        borderRadius: 10,
    },
    connectBtn: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 10,
    },
    textStyle: {
        fontSize: 18,
        fontWeight: '500',
        color: Colors.SteelBlue,
    },
});