import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../../../constants/Colors'
import Header from '../../../../components/header/Header'
import { DummyImage } from '../../../../assets/dummy/images'
import FilledButton from '../../../../components/buttons/FilledButton'

const DeviceInfo = ({ navigation }: any) => {
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
                            padding: 20,
                            borderRadius: 10,
                            marginBottom: 20,
                        }}
                    >
                        <Image
                            source={DummyImage.device}
                            width={250}
                            height={250}
                            style={{
                                alignSelf: 'center',
                                marginBottom: 20,
                                width: 150,
                                height: 150,
                            }}
                        />
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: Colors.Blue,
                            textAlign: 'center',
                            marginBottom: 10,
                        }}>
                            Información del dispositivo
                        </Text>
                        <Text style={{
                            fontSize: 16,
                            color: Colors.SteelBlue,
                            textAlign: 'center',
                        }}>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio veritatis alias quo delectus eos voluptas at doloremque ipsam necessitatibus aut?
                        </Text>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.addBtn}>
                <FilledButton
                    label='Add a device'
                    type='blue'
                    onPress={() => navigation.navigate('DeviceConnected')}
                />
            </View>
        </SafeAreaView>
    )
}

export default DeviceInfo

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