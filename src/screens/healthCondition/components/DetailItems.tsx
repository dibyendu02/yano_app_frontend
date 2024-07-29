import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { Colors } from '../../../constants/Colors'

type itemProps = {
    name: string,
    value: string | number
}

const DetailItems:FC<itemProps> = ({ name, value }) => {
    return (
        <View style={{ marginBottom: 20 }}>
            <Text style={styles.para}>{name}</Text>
            <Text style={styles.title}>{value}</Text>
        </View>
    )
}

export default DetailItems

const styles = StyleSheet.create({ 
    title: {
        fontSize: 18,
        fontWeight: "500",
        color: Colors.Blue
    },
    para: {
        fontSize: 14,
        color: Colors.SteelBlue,
        marginBottom: 4
    },
})