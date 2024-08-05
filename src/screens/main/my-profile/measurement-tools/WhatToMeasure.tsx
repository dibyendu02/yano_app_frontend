import { Image, ScrollView, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../../../components/header/Header'
import { Settings } from '../../../../assets/settings/SettingItem'
import PatientElements from '../../../../components/PatientElements'
import { Colors } from '../../../../constants/Colors'
import { measurementList } from '../../../../assets/measurement-items/measurementList'

const WhatToMeasure = ({ navigation }: any) => {
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: Colors.GhostWhite,
                position: 'relative',
            }}
        >
            <Header title={'What do you want to measure?'} />
            <ScrollView>
                <View style={{ padding: 20 }}>
                    {
                        measurementList.map((item, i) => (
                            <PatientElements
                                key={i}
                                name={item.title}
                                element={
                                    <Image
                                        source={item.img}
                                        style={{ width: 30, objectFit: 'contain' }}
                                    />
                                }
                                color="black"
                                customStyle={{
                                    paddingVertical: 20,
                                    borderRadius: 0,
                                    borderBottomWidth: 1,
                                    borderBottomColor: Colors.LightGray,
                                    borderTopRightRadius: i === 0 ? 10 : 0,
                                    borderTopLeftRadius: i === 0 ? 10 : 0,
                                    borderBottomLeftRadius: i === Settings.length - 1 ? 10 : 0,
                                    borderBottomRightRadius: i === Settings.length - 1 ? 10 : 0
                                }}
                                onPress={() => navigation.navigate(item.path)}
                            />
                        ))
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default WhatToMeasure