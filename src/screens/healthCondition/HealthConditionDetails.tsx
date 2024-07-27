import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '../../constants/Colors'
import Header from '../../components/header/Header'
import { DeleteIcon, EditIcon } from '../../assets/icon/IconNames'

const HealthConditionDetails = ({ navigation }: any) => {
    const data = {
        name: 'Hypertension',
        date: '09-06-2012',
        status: 'Crónico',
        medicine: 'Losartán Potásico',
        additionalNotes: ''
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: Colors.LightGray,
                position: 'relative',
            }}>
            <Header
                title="Hypertension"
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
                        <Item name='Name of the health condition' value={data.name} />
                        <Item name='Date of diagnosis' value={data.date} />
                        <Item name='Status' value={data.status} />
                        <Item name='Medicine' value={data.medicine} />
                        <Item name='Additional notes' value={data.additionalNotes} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default HealthConditionDetails

type itemProps = {
    name: string,
    value: string
}

export const Item: FC<itemProps> = ({ name, value }) => {
    return (
        <View style={{ marginBottom: 20 }}>
            <Text style={styles.para}>{name}</Text>
            <Text style={styles.title}>{value}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    boxStyle: {
        width: '100%',
        backgroundColor: Colors.White,
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderRadius: 10,
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: "500",
        color: Colors.Blue
    },
    para: {
        fontSize: 14,
        color: Colors.lightBlue,
        marginBottom: 4
    },
})