import { Image, SafeAreaView, StyleSheet, View } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'
import Header from '../../components/header/Header'
import { ScrollView } from 'react-native'
import PatientElements from '../../components/PatientElements'
import { MedicalHistoryItems } from '../../assets/MedicalHistoryItems'

const MedicalHistory = ({ navigation }: any) => {
    return (
        <>
            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: Colors.LightGray,
                    position: 'relative',
                }}>
                <Header
                    title="Medical History"
                />
                <ScrollView>
                    <View style={{ padding: 20 }}>
                        {
                            MedicalHistoryItems.map((item, i) => (
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
                                        borderBottomLeftRadius: i === MedicalHistoryItems.length - 1 ? 10 : 0,
                                        borderBottomRightRadius: i === MedicalHistoryItems.length - 1 ? 10 : 0
                                    }}
                                    onPress={() => navigation.navigate(item.path)}
                                />
                            ))
                        }
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

export default MedicalHistory

const styles = StyleSheet.create({
    box: {

    }
})