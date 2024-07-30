import { Alert, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../../../constants/Colors';
import Header from '../../../components/header/Header';
import { DeleteIcon, EditIcon } from '../../../assets/icon/IconNames';
import DetailItems from '../components/DetailItems';
import CommonHeader from '../components/CommonHeader';

const AllergyDetails = ({ navigation, route }: any) => {
    if (!route || !route.params) {
        Alert.alert('Error', 'Data not passed or invalid data passed');
        return navigation.goBack();
    }
    const data = route.params.data;
    const { name, date, details, moreDetails, treatedBy, medicine, additionalNotes } = data;
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
                        onPress={() => navigation.navigate('AddAndEditAllergies', { data })}
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
                        <DetailItems name='Details of allergy' value={details} />
                        <DetailItems name='More details' value={moreDetails} />
                        <DetailItems name='Treated by' value={treatedBy} />
                        <DetailItems name='Date of diagnosis' value={date} />
                        <DetailItems name='Medicine' value={medicine} />
                        <DetailItems name='Additional notes' value={additionalNotes} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default AllergyDetails

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