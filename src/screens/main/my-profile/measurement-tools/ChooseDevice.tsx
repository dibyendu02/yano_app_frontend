import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../../../../components/header/Header'
import { DummyImage } from '../../../../assets/dummy/images'
import { Colors } from '../../../../constants/Colors' 
import PatientElements from '../../../../components/PatientElements'
import OutlineButton from '../../../../components/buttons/OutlineButton'

const ChooseDevice = ({ navigation }: any) => {
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: Colors.GhostWhite,
                position: 'relative',
            }}
        >
            <Header title='Choose Device' />
            <ScrollView>
                <View style={{ padding: 20 }}>
                    <PatientElements
                        name='Monitor Multiparámetros Yano'
                        onPress={navigation.navigate('')}
                        element={
                            <Image
                                source={DummyImage.device}
                                width={30}
                                height={30}
                            />
                        }
                        color=''
                    />
                </View>
            </ScrollView>
            <View style={styles.addBtn}>
                <Text style={{
                    textAlign: "center",
                    color: Colors.SteelBlue,
                    marginBottom: 6,
                }}>Still don't have one of our devices?</Text>
                <OutlineButton
                    label='Click here to buy'
                    type='blue'
                />
            </View>
        </SafeAreaView>
    )
}

export default ChooseDevice

const styles = StyleSheet.create({
    connectBtn: {
        width: "50%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 10
    },
    textStyle: {
        fontSize: 16,
        fontWeight: "600",
        color: Colors.Blue
    },
    addBtn: {
        position: "absolute",
        bottom: 0,
        left: 0,
        width: '100%',
        backgroundColor: Colors.White,
        padding: 10
    }
})