import { Alert, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../../../constants/Colors';
import Header from '../../../components/header/Header';
import { DeleteIcon, EditIcon } from '../../../assets/icon/IconNames';
import DetailItems from '../components/DetailItems';
import CommonHeader from '../components/CommonHeader';


const MedicineDetails = ({ navigation, route }: any) => {
    if (!route || !route.params) {
        Alert.alert('Error', 'Data not passed or invalid data passed');
        return navigation.goBack();
    }
    const data = route.params.data; 
    const {
        name,
        volume,
        unit,
        medicine,
        field4,
        field5,
        field6,
        field7,
        field8,
        field9,
        field10,
        field11,
        field12,
        field13,
        field14,
    } = data;

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
                        onPress={() => navigation.navigate('AddAndEditMedicine', { data })}
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
                        <DetailItems name='Name of the medicine' value={name} />
                        <DetailItems name='Forma de la medicina' value={medicine} />
                        <DetailItems name='Detalles de la medicina' value={volume+unit} />
                        <DetailItems name='Método de ingesta' value={field4} />
                        <DetailItems name='Cantidad' value={field5} />
                        <DetailItems name='Frecuencia' value={field6} />
                        <DetailItems name='Cuando' value={field7} />
                        <DetailItems name='Otras instrucciones' value={field8} />
                        <DetailItems name='Fecha de inicio' value={new Date(field9).toDateString()} />
                        <DetailItems name='Hasta' value={new Date(field10).toDateString()} />
                        <DetailItems name='¿Es un medicamento permanente?' value={field11? "Yes": "No"} />
                        <DetailItems name='Tratado por' value={field12} />
                        <DetailItems name='Notas adicionales' value={field13} />
                        <DetailItems name='Medicamento' value={field14} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default MedicineDetails

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