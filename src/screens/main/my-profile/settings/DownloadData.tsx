import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../../../constants/Colors'
import Header from '../../../../components/header/Header'
import FilledButton from '../../../../components/buttons/FilledButton'
import { DownloadIcon } from '../../../../assets/icon/IconNames'
import EmptyScreen from '../../../healthCondition/components/EmptyScreen'

const DownloadData = () => {
    const [downloaded, setDownloaded] = useState(false);
    const downloadData = true
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: Colors.GhostWhite,
                position: 'relative',
            }}
        >
            <Header title={'Download Your Data'} />
            <ScrollView>
                <View style={{ padding: 20 }}>
                    {downloadData ?
                        <>
                            {downloaded ?
                                <View style={[styles.versionBox, { paddingHorizontal: 30 }]}>
                                    <Text style={{
                                        textAlign: "center",
                                        marginBottom: 10,
                                        fontSize: 14,
                                        color: Colors.SteelBlue,
                                        lineHeight: 20
                                    }}>We are gathering your information and will send you an e-mail when it is ready for download.</Text>
                                </View>
                                : <View style={styles.versionBox}>
                                    <Text style={styles.title} >
                                        Download information for user:
                                        Eduardo Anzola
                                    </Text>
                                    <Text style={{
                                        textAlign: "center",
                                        marginBottom: 10,
                                    }}>Receive a copy of the information we have stored on our servers, sent directly to your email.</Text>
                                    <FilledButton
                                        label='Get your data archive'
                                        icon={<DownloadIcon color={Colors.White} />}
                                        type='blue'
                                        onPress={() => setDownloaded(true)}
                                    />
                                </View>
                            }
                        </> :
                        <EmptyScreen
                            title='No data yet'
                            message='Your data is collected from Yano.'
                        />
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default DownloadData

const styles = StyleSheet.create({
    versionBox: {
        width: '100%',
        padding: 20,
        borderRadius: 10,
        backgroundColor: Colors.White,
        marginVertical: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: Colors.Blue,
        marginBottom: 10,
        textAlign: "center"
    },
})