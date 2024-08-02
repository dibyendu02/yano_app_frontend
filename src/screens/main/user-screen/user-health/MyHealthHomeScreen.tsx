import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CommonLayout from '../../../../components/CommonLayout'
import Header from '../../../../components/header/Header'
import { IconName, NotificationIcon, PlusIcon } from '../../../../assets/icon/IconNames'
import { Colors } from '../../../../constants/Colors'
import ItemWithTileSubtile from '../../../../components/ItemWithTileSubtitle'
import Icons from '../../../../assets/icon/Icon'
import Card from '../../../../components/cards/Card'
import { navigate } from '../../../../navigation/RootNavigation'
import { measurements } from '../../../../test/Data'
import FilledButton from '../../../../components/buttons/FilledButton'
import OutlineButton from '../../../../components/buttons/OutlineButton'

const MyHealthHomeScreen = () => {
    return (
        <CommonLayout>
            <Header
                title="Hi, Pedro"
                headerRightComponent={
                    <TouchableOpacity style={{ position: "relative" }}>
                        <NotificationIcon size={24} color={Colors.Blue} />
                        <View style={{
                            position: 'absolute',
                            width: 10,
                            height: 10,
                            borderRadius: 6,
                            backgroundColor: Colors.Red,
                            right: 2,
                            top: 0,
                        }} ></View>
                    </TouchableOpacity>
                }
            />
            <ScrollView>
                <View style={{ padding: 15 }}>
                    <View style={styles.container} >
                        <Text style={styles.title}>Do you have one of our devices?</Text>
                        <Text style={styles.para}>Connect your Yano device and start taking control of your health.</Text>
                        <OutlineButton
                            type='blue'
                            icon={
                                <PlusIcon size={16} color={Colors.Blue} />
                            }
                            label="Connect Device"
                            onPress={() => navigate('Subscription')}
                            style={{ marginTop: 10 }}
                        />
                    </View>
                    <ItemWithTileSubtile
                        element={
                            <View style={{
                                width: 60,
                                height: 60,
                                borderRadius: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: "#16967633"
                            }} >
                                <Icons.MaterialIcons name="monitor-heart" size={40} color={Colors.Green} />
                            </View>
                        }
                        title="Measure your vital signs"
                        subtitle="Choose a device and start monitoring your health."
                        onPress={() => { }}
                    />
                </View>
                <Card
                    title="Your last measurements"
                    cardFooter={
                        <TouchableOpacity
                            style={{
                                borderTopWidth: 1,
                                borderTopColor: Colors.LightGray,
                                width: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingVertical: 16,
                            }}
                            onPress={() => navigate('')}>
                            <Text
                                style={{
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                    fontFamily: 'Roboto',
                                    color: Colors.SteelBlue,
                                }}>
                                See More
                            </Text>
                        </TouchableOpacity>
                    }>
                    <FlatList
                        data={
                            measurements.length >= 2
                                ? measurements.filter((e, i) => i < 2)
                                : []
                        }
                        scrollEnabled={false}
                        style={{ width: '100%' }}
                        renderItem={({ item, index: _index }) => (
                            <View
                                style={{
                                    width: '100%',
                                    paddingVertical: 10,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}>
                                <View style={{ width: '50%' }}>
                                    <Text
                                        style={{
                                            fontSize: 18,
                                            color: Colors.Blue,
                                            fontWeight: 'bold',
                                            marginBottom: 4,
                                        }}>
                                        {item.mType}
                                    </Text>
                                    <Text style={{ fontSize: 13, fontFamily: 'Roboto' }}>
                                        {item.dt}
                                    </Text>
                                </View>
                                <Text
                                    style={{
                                        fontSize: 18,
                                        marginBottom: 4,
                                        color: Colors.Blue,
                                        fontWeight: 'bold',
                                    }}>
                                    {item.amt}{' '}
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            fontFamily: 'Roboto',
                                            fontWeight: 'light',
                                        }}>
                                        mmol/L
                                    </Text>
                                </Text>
                                <Icons.AntDesign
                                    name={IconName.CheckCircle}
                                    color={Colors.Green}
                                    size={22}
                                />
                            </View>
                        )}
                        ItemSeparatorComponent={() => (
                            <View
                                style={{
                                    height: 1,
                                    width: '100%',
                                    backgroundColor: Colors.LightGray,
                                    alignSelf: 'center',
                                }}
                            />
                        )}
                    />
                </Card>
            </ScrollView>
            <FilledButton
                type='blue'
                label="Consultation 24/7"
                icon={
                    <Icons.MaterialIcons
                        name="health-and-safety"
                        size={24}
                        color={Colors.White}
                    />
                }
                onPress={() => navigate('')}
                style={styles.addBtn}
            />
        </CommonLayout>
    )
}

export default MyHealthHomeScreen

const styles = StyleSheet.create({
    addBtn: {
        width: 200,
        position: 'absolute',
        bottom: 40,
        right: 20,
    },
    container: {
        backgroundColor: Colors.White,
        padding: 20,
        borderRadius: 10,
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.Blue,
        marginBottom: 6,
        textAlign: 'center',
    },
    para: {
        textAlign: 'center',
        fontSize: 14,
        color: Colors.SteelBlue,
        marginBottom: 10,
    }
})