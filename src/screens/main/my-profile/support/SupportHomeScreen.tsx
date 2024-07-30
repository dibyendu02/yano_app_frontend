import { Image, ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../../../components/header/Header'
import PatientElements from '../../../../components/PatientElements'
import { Colors } from '../../../../constants/Colors'
import { SupportItems } from '../../../../assets/support/SupportItems'

const SupportHomeScreen = ({ navigation }: any) => {
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: Colors.GhostWhite,
                position: 'relative',
            }}
        >
            <Header title={"Yano's Support"} />
            <ScrollView>
                <View style={{ padding: 20 }}>
                    {
                        SupportItems.map((item, i) => (
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
                                    borderBottomLeftRadius: i === SupportItems.length - 1 ? 10 : 0,
                                    borderBottomRightRadius: i === SupportItems.length - 1 ? 10 : 0
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

export default SupportHomeScreen

const styles = StyleSheet.create({
    versionBox: {
        width: '100%',
        padding: 20,
        borderRadius: 10,
        backgroundColor: Colors.White,
        marginVertical: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: Colors.Blue,
        marginBottom: 10
    },
    versionText: {
        fontSize: 18,
        fontWeight: "500",
        color: Colors.SteelBlue
    },
    logoutBtn: {
        alignItems: "center",
        flexDirection: "row",
        gap: 6,
        paddingTop: 20
    }
})