import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../../../../components/header/Header'
import { Colors } from '../../../../constants/Colors'
import MeasurementItems from '../components/MeasurementItems'
import { mangeDataList } from '../../../../assets/settings/SettingItem'

const ManageYourData = () => {
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: Colors.GhostWhite,
                position: 'relative',
            }}
        >
            <Header
                title={'Manage your data'}
            />
            <ScrollView>
                <View style={{ padding: 20 }}>
                    <MeasurementItems
                        data={mangeDataList}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ManageYourData

const styles = StyleSheet.create({})