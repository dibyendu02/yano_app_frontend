import { Alert, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../../../constants/Colors';
import Header from '../../../components/header/Header';
import { DeleteIcon, EditIcon } from '../../../assets/icon/IconNames';
import DetailItems from '../components/DetailItems';
import CommonHeader from '../components/CommonHeader';


const SurgeriesDetails = ({ navigation, route }: any) => {
    if (!route || !route.params) {
        Alert.alert('Error', 'Data not passed or invalid data passed');
        return navigation.goBack();
    }
    const data = route.params.data;
    const {
        name,
        devices,
        date,
        doctorName,
        additionalNotes, 
    } = data;

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: Colors.LightGray,
                position: 'relative',
            }}>
            <CommonHeader
                title={name}
                rightComp1={
                    <TouchableOpacity
                        onPress={() => navigation.navigate('AddAndEditSurgeries', { data })}
                    >
                        <EditIcon />
                    </TouchableOpacity>
                }
                rightComp2={
                    <TouchableOpacity>
                        <DeleteIcon />
                    </TouchableOpacity>
                }
            />
            <ScrollView>
                <View style={{ padding: 20 }}>
                    <View style={styles.boxStyle}>
                        <DetailItems name='Surgery name' value={name} />
                        <DetailItems name='Implants / Support Devices' value={devices} />
                        <DetailItems name='Surgery date' value={new Date(date).toDateString()} />
                        <DetailItems name='Physician in charge' value={doctorName} /> 
                        <DetailItems name='Additional notes' value={additionalNotes} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SurgeriesDetails

const styles = StyleSheet.create({
    boxStyle: {
        width: '100%',
        backgroundColor: Colors.White,
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderRadius: 10,
        marginBottom: 20,
    },
})