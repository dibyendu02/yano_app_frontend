import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../../../../components/header/Header' 
import { Colors } from '../../../../constants/Colors'

const Notification = () => {
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: Colors.GhostWhite,
                position: 'relative',
            }}
        >
            <Header
                title={'Notification'}
            />
            <ScrollView>
                <View style={{ padding: 20 }}>
                    <View style={{
                        backgroundColor: Colors.White,
                        borderRadius: 10,
                        padding: 20,
                    }}>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            paddingBottom: 20,
                            borderBottomColor: Colors.LightGray,
                            borderBottomWidth: 1
                        }}>
                            <Text style={{
                                fontSize: 18,
                                fontWeight: "500",
                                color: Colors.Blue
                            }}>Push notifications</Text>
                            <Text>Icon</Text>
                        </View>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            paddingTop:20
                        }}>
                            <Text style={{
                                fontSize: 18,
                                fontWeight: "500",
                                color: Colors.Blue
                            }}>Email notifications</Text>
                            <Text>Icon</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Notification

const styles = StyleSheet.create({})