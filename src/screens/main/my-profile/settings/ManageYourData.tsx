import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Header from '../../../../components/header/Header'
import { Colors } from '../../../../constants/Colors'
import MeasurementItems from '../components/MeasurementItems'
import { mangeDataList } from '../../../../assets/settings/SettingItem'
import { Card } from 'react-native-paper'
import DeleteAllDataCard from '../UiUpdateComponents/DeleteAllDataCard'

const ManageYourData = () => {
    const [isCardActive, setIsCardActive] = useState(false)

    const toggleCard = () => {
        setIsCardActive(!isCardActive)
    }
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
                        active={toggleCard}
                    />
                </View>
            </ScrollView>
            {isCardActive && (
                <View style={styles.afterClick}>
                    <DeleteAllDataCard
                        title={`Permanently delete all your health data?`}
                        children={"This will remove all your medical history, measurements and basic health information from our servers."}
                        active={toggleCard}
                    // items={items}
                    />
                </View>
            )}
        </SafeAreaView>
    )
}

export default ManageYourData

const styles = StyleSheet.create({
    afterClick: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        position: 'absolute',
        height: '100%',
        width: '100%',
        zIndex: 1,
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
})