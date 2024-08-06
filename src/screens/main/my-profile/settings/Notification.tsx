import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Header from '../../../../components/header/Header'
import { Colors } from '../../../../constants/Colors'
import { Switch } from 'react-native-paper'

const Notification = () => {
    const [notificationEnabled, setNotificationEnabled] = useState(false);
    const toggleNotification = () => setNotificationEnabled(previousState => !previousState);

    const [messageEnabled, setMessageEnabled] = useState(false);
    const toggleMessage = () => setMessageEnabled(previousState => !previousState);
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
                                fontWeight: "600",
                                color: Colors.Blue
                            }}>Push notifications</Text>
                            <Switch
                                trackColor={{ false: Colors.LightGray, true: Colors.LighterGreen }}
                                thumbColor={notificationEnabled ? Colors.LightGreen : Colors.White}
                                ios_backgroundColor={Colors.LightBlack}
                                onValueChange={toggleNotification}
                                value={notificationEnabled}
                            />
                        </View>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            paddingTop: 20
                        }}>
                            <Text style={{
                                fontSize: 18,
                                fontWeight: "600",
                                color: Colors.Blue
                            }}>Email notifications</Text>
                            <Switch
                                trackColor={{ false: Colors.LightGray, true: Colors.LighterGreen }}
                                thumbColor={messageEnabled ? Colors.LightGreen : Colors.White}
                                ios_backgroundColor={Colors.LightBlack}
                                onValueChange={toggleMessage}
                                value={messageEnabled}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Notification

const styles = StyleSheet.create({})