import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { Colors } from '../constants/Colors'

type SpinnerProps = {
    size?: "small" | "large",
    color?: string
}

const Spinner: FC<SpinnerProps> = ({ size = "large", color = Colors.Blue }) => {
    return (
        <View style={{
            marginVertical: 10,
        }}>
            <ActivityIndicator size={size} color={color} />
        </View>
    )
}

export default Spinner

const styles = StyleSheet.create({})