import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../../../constants/Colors';
import { DeleteIcon, EditIcon } from '../../../assets/icon/IconNames';
import DetailItems from '../components/DetailItems';
import CommonHeader from '../components/CommonHeader';


const BasicInfo = ({ navigation }: any) => {
    const data = {
        height: "164cm",
        weight: "56kg",
        bloodGroup: "O+"
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: Colors.LightGray,
                position: 'relative',
            }}>
            <CommonHeader
                title={"Basic Information"}
                rightComp1={
                    <TouchableOpacity
                        onPress={() => navigation.navigate('AddAndEditBasicInfo', { data })}
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
                        <DetailItems name='Height' value={data.height} />
                        <DetailItems name="Weight" value={data.weight} />
                        <DetailItems name="Blood Group" value={data.bloodGroup} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default BasicInfo

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