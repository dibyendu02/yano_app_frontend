import { Image, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import Header from '../../../../components/header/Header'
import { DummyImage } from '../../../../assets/dummy/images'
import { Colors } from '../../../../constants/Colors'
import CommonItem from '../components/CommonItem'
import FilledButton from '../../../../components/buttons/FilledButton'

const MeasurementToolsHomeScreen = ({ navigation }: any) => {
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: Colors.GhostWhite,
                position: 'relative',
            }}
        >
            <Header title='Measurement Tools' />
            <ScrollView>
                <View style={{ padding: 20 }}>
                    <CommonItem
                        name='Monitor Multiparámetros Yano'
                        onPress={() => navigation.navigate('')}
                        leftIcon={
                            <Image
                                source={DummyImage.device}
                                width={30}
                                height={30}
                            />
                        }
                    />
                    <CommonItem
                        name='Monitor Multiparámetros Yano'
                        onPress={() => navigation.navigate('')}
                        leftIcon={
                            <Image
                                source={DummyImage.device}
                                width={30}
                                height={30}
                            />
                        }
                        isConnected={true}
                    />
                </View>
            </ScrollView>
            <View style={styles.addBtn}>
                <FilledButton
                    label='Add a device'
                    type='blue'
                    onPress={() => navigation.navigate('ChooseDevice')}
                />
            </View>
        </SafeAreaView>
    )
}

export default MeasurementToolsHomeScreen

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