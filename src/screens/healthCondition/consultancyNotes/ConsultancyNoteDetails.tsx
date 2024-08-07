import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../../../constants/Colors';
import { DownloadIcon } from '../../../assets/icon/IconNames';
import DetailItems from '../components/DetailItems';
import CommonHeader from '../components/CommonHeader';


const ConsultancyNotesDetails = ({ navigation, route }: any) => {
    if (!route || !route.params) {
        Alert.alert('Error', 'Data not passed or invalid data passed');
        return navigation.goBack();
    }
    const data = route.params.data;
    const {
        name,
        date,
        time,
        note,
        recommendation,
        attendedBy
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
                    <TouchableOpacity >
                        <DownloadIcon />
                    </TouchableOpacity>
                }
            />
            <ScrollView>
                <View style={{ padding: 20 }}>
                    <View style={styles.boxStyle}>
                        <Text
                            style={{
                                fontSize: 24,
                                fontWeight: 'bold',
                                marginBottom: 15,
                                color: Colors.Blue,
                            }}
                        >Consultation notes</Text>
                        <DetailItems name='Consultation date' value={date} />
                        <DetailItems name='Consultation time' value={time} />
                        <DetailItems name='Note' value={note} />
                        <DetailItems name='Recommendation' value={recommendation} />
                        <DetailItems name='Attended by' value={attendedBy} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ConsultancyNotesDetails

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