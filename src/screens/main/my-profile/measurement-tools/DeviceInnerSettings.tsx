import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native'
import { Colors } from '../../../../constants/Colors'
import Header from '../../../../components/header/Header'
import DeviceItems from '../components/DeviceItems'

const DeviceInnerSettings = () => {
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: Colors.GhostWhite,
                position: 'relative',
            }}
        >
            <Header title={'ECG Settings'} />
            <ScrollView>
                <View style={{ padding: 20 }}>
                    <View style={styles.container}>
                        <DeviceItems
                            name='Paper speed'
                            subtitle="25 mm/s"
                            customStyle={{
                                borderBottomWidth: 1,
                                borderBottomColor: Colors.LightGray
                            }}
                        />
                        <DeviceItems
                            name='Gain'
                            subtitle= "10 mm/mv"
                        />
                    </View>
                    <View style={{
                        backgroundColor: Colors.White,
                        paddingHorizontal: 20,
                        paddingVertical: 20,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderRadius:10,
                    }} >
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: "600",
                                color: Colors.Blue,
                            }}
                        >Low performance mode</Text>
                        <Text>icon</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default DeviceInnerSettings

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.White,
        borderRadius: 10,
        height: "auto",
        overflow: "hidden",
        marginBottom: 20
    },
});