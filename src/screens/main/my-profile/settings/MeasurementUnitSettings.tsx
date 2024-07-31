import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../../../../constants/Colors'
import Header from '../../../../components/header/Header'
import MeasurementItems from '../components/MeasurementItems'
import { MeasurementSettingItems } from '../../../../assets/settings/SettingItem'
import DeviceItems from '../components/DeviceItems'

const MeasurementUnitSettings = () => {
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: Colors.GhostWhite,
                position: 'relative',
            }}
        >
            <Header title={'Measurement units'} />
            <ScrollView>
                <View style={{ padding: 20 }}>
                    {
                        MeasurementSettingItems.map(item => (
                            <DeviceItems
                                key={item.title}
                                element={
                                    <Image
                                        source={item.img}
                                        height={40}
                                        width={40}
                                        style={{objectFit:"contain"}}
                                    />
                                }
                                name={item.title}
                                subtitle={item.subtitle}
                                customStyle={{
                                    borderBottomWidth: 1,
                                    borderBottomColor: Colors.LightGray,
                                }}
                            />
                        ))
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default MeasurementUnitSettings

const styles = StyleSheet.create({})