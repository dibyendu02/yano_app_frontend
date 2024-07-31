import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../../../constants/Colors'
import Header from '../../../../components/header/Header' 
import FilledButton from '../../../../components/buttons/FilledButton'
import { OkIcon } from '../../../../assets/icon/IconNames'

const DeviceConnected = ({ navigation }: any) => {
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: Colors.GhostWhite,
                position: 'relative',
            }}
        >
            <Header title='' />
            <ScrollView>
                <View style={{ padding: 20 }}>
                    <View
                        style={{
                            backgroundColor: Colors.White,
                            paddingVertical: 40,
                            paddingHorizontal: 40,
                            borderRadius: 10,
                            marginBottom: 20,
                        }}
                    >
                        <View
                            style={{
                                alignSelf: 'center',
                                marginBottom: 20,
                                width: 100,
                                height: 100,
                            }}
                        >
                            <OkIcon size={90} />
                        </View>
                        <Text style={{
                            fontSize: 24,
                            fontWeight: 'bold',
                            color: Colors.Blue,
                            textAlign: 'center',
                            marginBottom: 10,
                        }}>
                            Monitor Multiparámetros Yano has been added
                        </Text>
                        <Text style={{
                            fontSize: 16,
                            color: Colors.SteelBlue,
                            textAlign: 'center',
                        }}>
                            Start measuring your vital signs.
                        </Text>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.addBtn}>
                <FilledButton
                    label='Add a device'
                    type='blue'
                    onPress={() => navigation.navigate('MeasurementTools')}
                />
            </View>
        </SafeAreaView>
    )
}

export default DeviceConnected

const styles = StyleSheet.create({
    addBtn: {
        position: "absolute",
        bottom: 0,
        left: 0,
        width: '100%',
        backgroundColor: Colors.White,
        padding: 10
    }
})