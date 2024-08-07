import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../../constants/Colors'
import CommonHeader from '../components/CommonHeader'
import EmptyScreen from '../components/EmptyScreen'
import HomeItems from '../components/HomeItems'

const ConsultancyNotes = ({ navigation }: any) => {
    const data = [
        {
            id: 1,
            name: "CONV171122",
            date: "12/12/2021",
            time: "12:00 PM",
            note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, eleifend eros. Nulla nec purus feugiat, molestie ipsum et, eleifend eros. Nulla nec purus feugiat, molestie ipsum et, eleifend eros.",
            recommendation: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum etleifend eros. Nulla nec purus feugiat, molestie ipsum et, eleifend eros. Nulla nec purus feugiat, molestie ipsum et, eleifend eros.",
            attendedBy: "Dr. John Doe"
        },
        {
            id: 2,
            name: "CONV120922",
            title: "Consultation Note 2",
            date: "12/12/2021",
            time: "4:00 PM",
            note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, eleifend eros. Nulla nec purus feugiat, molestie ipsum et, eleifend eros. Nulla nec purus feugiat, molestie ipsum et, eleifend eros.",
            recommendation: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum etleifend eros. Nulla nec purus feugiat, molestie ipsum et, eleifend eros. Nulla nec purus feugiat, molestie ipsum et, eleifend eros.",
            attendedBy: "Dr. John Doe"
        }
    ]
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: Colors.GhostWhite,
                position: 'relative',
            }}>
            <CommonHeader title={"Consultation notes"} />
            {
                data && data.length > 0 ?
                    <HomeItems
                        data={data}
                        path={"ConsultationNotesDetails"}
                        navigation={navigation}
                    />
                    : <EmptyScreen
                        title={"No Consultation Notes"}
                        message={"There are no consultation notes available"}
                    />
            }
        </SafeAreaView>
    )
}

export default ConsultancyNotes 