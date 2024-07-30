import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '../../constants/Colors'
import Header from '../../components/header/Header'
import { DeleteIcon, EditIcon } from '../../assets/icon/IconNames'
import DetailItems from './components/DetailItems'
import CommonHeader from './components/CommonHeader'

const HealthConditionDetails = ({ navigation, route }: any) => {
    if (!route || !route.params) {
        Alert.alert('Error', 'Data not passed or invalid data passed');
        return navigation.goBack();
    }
    const data = route.params.data;
    const { name, date, status, treatedBy, medicine, additionalNotes } = data;
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: Colors.GhostWhite,
                position: 'relative',
            }}>
            <CommonHeader
                title={name}
                rightComp1={
                    <TouchableOpacity
                        onPress={() => navigation.navigate('AddHealthCondition', { data })}
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
                        <DetailItems name='Name of the health condition' value={name} />
                        <DetailItems name='Date of diagnosis' value={date} /> 
                        <DetailItems name='Status' value={status} /> 
                        <DetailItems name='Treated by' value={treatedBy} />
                        <DetailItems name='Medicine' value={medicine} />
                        <DetailItems name='Additional notes' value={additionalNotes} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default HealthConditionDetails

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