import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'
import Header from '../../components/header/Header'
import { ScrollView } from 'react-native' 
import PatientElements from '../../components/PatientElements'
import { DummyImage } from '../../assets/dummy/images'

const MedicalHistory = ({ navigation }: any) => {
    return (
        <>
            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: Colors.LightGray,
                    position: 'relative',
                }}>
                <Header
                    title="Medical History"
                />
                <ScrollView>
                    <View style={{ padding: 20 }}>
                        <PatientElements
                            name="Basic Information"
                            element={
                                <Image
                                    source={DummyImage.docBag}
                                    style={{ width: 30, objectFit: 'contain' }}
                                />
                            }
                            color="black"
                            customStyle={{
                                paddingVertical: 20,
                                borderRadius: 0, borderBottomWidth: 1, borderBottomColor: Colors.LightGray,
                                borderTopRightRadius: 10,
                                borderTopLeftRadius: 10
                            }}
                            onPress={() => navigation.navigate('HealthCondition')}
                        />
                        <PatientElements
                            name="Health Condition"
                            element={
                                <Image
                                    source={DummyImage.docBag}
                                    style={{ width: 30, objectFit: 'contain' }}
                                />
                            }
                            color="black"
                            customStyle={{
                                borderRadius: 0, borderBottomWidth: 1, borderBottomColor: Colors.LightGray
                            }}
                            onPress={() => navigation.navigate('HealthCondition')}
                        />
                        <PatientElements
                            name="Health Condition"
                            element={
                                <Image
                                    source={DummyImage.docBag}
                                    style={{ width: 30, objectFit: 'contain' }}
                                />
                            }
                            color="black"
                            customStyle={{
                                borderRadius: 0, borderBottomWidth: 1, borderBottomColor: Colors.LightGray
                            }}
                        />
                        <PatientElements
                            name="Health Condition"
                            element={
                                <Image
                                    source={DummyImage.docBag}
                                    style={{ width: 30, objectFit: 'contain' }}
                                />
                            }
                            color="black"
                            customStyle={{
                                borderRadius: 0, borderBottomWidth: 1, borderBottomColor: Colors.LightGray
                            }}
                        />
                        <PatientElements
                            name="Health Condition"
                            element={
                                <Image
                                    source={DummyImage.docBag}
                                    style={{ width: 30, objectFit: 'contain' }}
                                />
                            }
                            color="black"
                            customStyle={{
                                borderRadius: 0, borderBottomWidth: 1, borderBottomColor: Colors.LightGray,
                                borderBottomRightRadius: 10,
                                borderBottomLeftRadius: 10
                            }}

                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

export default MedicalHistory

const styles = StyleSheet.create({
    box: {
        
    }
})