/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
    Image,
    FlatList,
    ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Foundation from 'react-native-vector-icons/Foundation';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { userData } from '../../../../test/Data';
import Header from '../../../../components/header/Header';
import { EditIcon, NotificationIcon } from '../../../../assets/icon/IconNames';
import Card from '../../../../components/cards/Card';
import { DummyImage } from '../../../../assets/dummy/images';
import { navigate } from '../../../../navigation/RootNavigation';
import { Colors } from '../../../../constants/Colors';
import Icons from '../../../../assets/icon/Icon';
import { CardStyles } from '../../../../components/cards/CardStyle';
import Badge from '../../../../components/Badge';
import OutlineButton from '../../../../components/buttons/OutlineButton';
import SwitchButton from '../../../../components/formComp/SwitchButton';
import { Switch } from 'react-native-paper';

let data1 = [
    {
        label: userData.gender,
        icon: <Foundation name="female-symbol" size={20} color={'#76BC21'} />,
    },
    {
        label: userData.age,
        icon: <Fontisto name="date" size={20} color={'#76BC21'} />,
    },
    {
        label: userData.blood,
        icon: <MaterialIcons name="bloodtype" size={20} color={'#76BC21'} />,
    },
];

let data2 = [
    {
        label: userData.height,
        icon: <MaterialIcons name="height" size={20} color={'#76BC21'} />,
    },
    {
        label: userData.weight,
        icon: <Foundation name="female-symbol" size={20} color={'#76BC21'} />,
    },
];

const menuData = [
    {
        id: '1',
        icon: (
            <Icons.MaterialIcons
                name="receipt-long"
                size={25}
                color={Colors.LightGreen}
            />
        ),
        text: 'Medical history',
        path: 'MedicalHistory',
    },
    {
        id: '2',
        icon: (
            <Icons.MaterialIcons
                name="insert-chart"
                size={25}
                color={Colors.LightGreen}
            />
        ),
        text: 'Sus mediciones',
        path: '',
    },
    {
        id: '3',
        icon: (
            <NotificationIcon 
                size={25}
                color={Colors.LightGreen}
            />
        ),
        text: "Receive health alerts",
        path: 'UserFamilyMemberDetails',
    },
];

export default function ViewFamilyMemberDetails() {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState); 
    };
    return (
        <SafeAreaView style={styles.container}>
            <Header
                title="Perfil del familiar" 
            />
            <View style={styles.body} >
                <Card>
                    <Image
                        source={DummyImage.user}
                        style={{
                            height: 80,
                            width: 80,
                            borderRadius: 40,
                        }}
                    />
                    <Text style={styles.patientName}>María Clemente</Text>
                    <View style={styles.detailRow}>
                        {data1.map((e, i, a) => (
                            <View style={styles.detailItem} key={e.label}>
                                {e.icon}
                                <Text style={styles.detailText}>{e.label}</Text>
                                {i < a.length - 1 && <View style={styles.separator} />}
                            </View>
                        ))}
                    </View>

                    <View style={styles.detailRow}>
                        {data2.map((e, i, a) => (
                            <View style={styles.detailItem} key={e.label}>
                                {e.icon}
                                <Text style={styles.detailText}>{e.label}</Text>
                                {i < a.length - 1 && <View style={styles.separator} />}
                            </View>
                        ))}
                    </View>
                    <Badge
                        icon={
                            <Icons.MaterialIcons
                                name="diversity-3"
                                size={18}
                                color={Colors.Blue}
                                style={{ marginRight: 3 }}
                            />
                        }
                        text="Mother"
                        color="#B8DAFF"
                    />
                </Card>

                <View style={CardStyles.container}>
                    <FlatList
                        data={menuData}
                        style={{
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                        }}
                        renderItem={({ item, index: _i }) => (
                            <TouchableOpacity
                                onPress={() => navigate(item.path)}
                                style={{
                                    width: '100%',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    paddingVertical: 14,
                                    alignItems: 'center',
                                }}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}>
                                    {item.icon}
                                    <Text
                                        style={{
                                            color: Colors.Blue,
                                            fontSize: 16,
                                            fontWeight: '600',
                                            marginLeft: 6,
                                        }}>
                                        {item.text}
                                    </Text>
                                </View>
                                {_i === menuData.length - 1 ?
                                    <View style={styles.switchBox}> 
                                        <Switch
                                            trackColor={{ false: Colors.LightGray, true: Colors.LighterGreen }}
                                            thumbColor={isEnabled ? Colors.LightGreen : Colors.lightBlack}
                                            ios_backgroundColor={Colors.lightBlack}
                                            onValueChange={toggleSwitch}
                                            value={isEnabled}
                                        />
                                    </View>
                                    :
                                    <Icons.MaterialIcons
                                        name="navigate-next"
                                        size={30}
                                        color={Colors.Blue}
                                    />}
                            </TouchableOpacity>
                        )}
                        ItemSeparatorComponent={() => <View style={styles.separate} />}
                    />
                </View>
            </View>
            <View style={{
                paddingHorizontal: 20,
                paddingVertical: 10,
            }}>
                <OutlineButton
                    type='red'
                    label="Stop monitoring"
                    icon={<FontAwesome5 name="stop" size={15} color={Colors.Red} />}
                    onPress={() => console.log('stop monitoring')}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White,
        position: 'relative',
    },
    body: {
        flex: 1,
        backgroundColor: Colors.GhostWhite,
    },
    separate: {
        backgroundColor: Colors.LightGray,
        height: 1,
        width: '100%',
    },
    separator: {
        width: 1,
        height: 20,
        backgroundColor: Colors.Black,
        marginHorizontal: 8,
    },
    secondContainer: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'space-between',
        padding: 20,
    },
    patientProfileDetails: {
        alignItems: 'center',
        marginBottom: 20,
        padding: 20,
        borderRadius: 10,
        backgroundColor: 'white',
        width: '100%',
    },
    patientName: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Roboto',
        marginVertical: 6,
    },
    detailRow: {
        flexDirection: 'row',
        marginVertical: 5,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailText: {
        color: 'black',
        fontSize: 16,
        marginHorizontal: 6,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00263E',
        borderRadius: 8,
        width: '100%',
        height: 50,
        marginTop: 10,
    },
    addButtonText: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 10,
        alignItems: 'center',
    },
    basicDetails: {
        alignItems: 'center',
        marginTop: 20,
        width: '90%',
        alignSelf: 'center',
    },
    stopMonitoringButton: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'red',
        alignSelf: 'center',
        padding: 10,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: 'white',
        height: 60,
    },
    monintoring: {
        fontSize: 13,
        fontWeight: 'bold',
        color: 'red',
        marginLeft: 5,
    },
    switchBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', 
        backgroundColor: Colors.White,
        borderRadius: 10,
    },
    label: {
        fontSize: 16,
        color: Colors.Blue,
        fontWeight: '600',
    }
});
