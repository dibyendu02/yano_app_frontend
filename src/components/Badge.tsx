import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { Colors } from '../constants/Colors'

type BadgeProps = {
    icon: JSX.Element;
    text: string;
    color?: string;
}

const Badge: FC<BadgeProps> = ({ icon, text, color = '#BEE5EB' }) => {
    return (
        <View style={{
            padding: 10,
            paddingVertical: 8,
            backgroundColor: color,
            borderRadius: 50,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
            marginTop: 10,
        }}>
            {icon}
            <Text style={{
                fontSize: 14,
                color: Colors.Blue,
            }} >{text}</Text>
        </View>
    )
}

export default Badge

const styles = StyleSheet.create({})