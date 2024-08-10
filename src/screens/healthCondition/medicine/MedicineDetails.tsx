import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Colors } from '../../../constants/Colors';
import Header from '../../../components/header/Header';
import { DeleteIcon, EditIcon } from '../../../assets/icon/IconNames';
import DetailItems from '../components/DetailItems';
import CommonHeader from '../components/CommonHeader';

const MedicineDetails = ({ navigation, route }: any) => {
    if (!route || !route.params) {
        Alert.alert('Error', 'Data not passed or invalid data passed');
        return navigation.goBack();
    }
    const data = route.params.data;
    const {
        name,
        volume,
        unit,
        medicine,
        field4, // Intake method
        field5, // Dose Quantity
        field6, // When
        field7, // Other instructions
        field8, // Duration begins at
        field9, // Unchanged, potentially related to a date
        field10, // Unchanged, potentially related to a date
        field11, // Additional Information: Medicine taken for (boolean)
        field12, // Prescribed by
        field13, // Side effects
        field14, // Medicamento (Additional field)
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
                    <TouchableOpacity
                        onPress={() => navigation.navigate('AddAndEditMedicine', { data })}
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
                        <DetailItems name="Medicine name" value={name} />
                        <View
                            style={{
                                paddingTop: 2,
                                paddingBottom: 12,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                    color: Colors.Blue,
                                }}
                            >
                                Medicine form
                            </Text>
                        </View>
                        <DetailItems name="Medicine form" value={medicine} />
                        <DetailItems name="Medicine strength" value={volume + unit} />
                        <DetailItems name="Intake method" value={field4} />
                        <View
                            style={{
                                paddingTop: 2,
                                paddingBottom: 12,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                    color: Colors.Blue,
                                }}
                            >
                                Dose
                            </Text>
                        </View>
                        <DetailItems name="Quantity" value={field5} />
                        <DetailItems name="When" value={field6} />
                        <DetailItems name="Other instructions" value={field7} />
                        <View
                            style={{
                                paddingTop: 2,
                                paddingBottom: 12,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                    color: Colors.Blue,
                                }}
                            >
                                Duration
                            </Text>
                        </View>
                        <DetailItems name="It begins at" value={new Date(field8).toDateString()} />
                        <DetailItems name="Until" value={new Date(field9).toDateString()} />
                        <View
                            style={{
                                paddingTop: 2,
                                paddingBottom: 12,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                    color: Colors.Blue,
                                }}
                            >
                                Additional Information
                            </Text>
                        </View>
                        <DetailItems name="Medicine taken for" value={field12} />
                        <DetailItems name="Prescribed by" value={field13} />
                        <DetailItems name="Side effects" value={field14} />
                        {/* <DetailItems name="Additional Info" value={field14} /> */}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default MedicineDetails;

const styles = StyleSheet.create({
    boxStyle: {
        width: '100%',
        backgroundColor: Colors.White,
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderRadius: 10,
        marginBottom: 20,
    },
});
