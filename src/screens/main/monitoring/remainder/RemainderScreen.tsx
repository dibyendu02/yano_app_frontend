import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RemainderLayout from '../components/RemainderLayout' 
import CommonLayout from '../../../../components/CommonLayout'

const RemainderScreen = () => {
    const data = [
        {
            name: "Perform blood pressure measurement",
            subtitle: "1 time a day - 8:00 PM - Repeats every day", 
            // time: "8:00 PM",
            date: "2022-09-01",
            frequency: "1"
        }
    ]
    return (
        <CommonLayout>
            <RemainderLayout data={data} />
        </CommonLayout>
    )
}

export default RemainderScreen

const styles = StyleSheet.create({})