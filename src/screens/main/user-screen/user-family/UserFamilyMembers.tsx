import React from 'react'; 
import CommonLayout from '../../../../components/CommonLayout';
import Header from '../../../../components/header/Header';
import EmptyScreen from '../../../../components/EmptyScreen';
import FilledButton from '../../../../components/buttons/FilledButton';
import { NextIcon, PlusIcon } from '../../../../assets/icon/IconNames';
import { navigate } from '../../../../navigation/RootNavigation';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DummyImage } from '../../../../assets/dummy/images';

const UserFamilyMembers = () => {
    const data = [
        {
            id: 1,
            name: 'John Doe',
            relation: 'Mother',
            admissionDate: '2024-07-27T11:38:00.000Z',
            dischargeDate: '2024-07-27T11:38:00.000Z',
            doctorName: 'Value2',
        },
    ];

    return (
        <>
            <CommonLayout>
                <Header title={'Family Link'} />
                <ScrollView>
                    <View style={{ padding: 20 }} >
                        {data && data.length > 0 ? (
                            <>
                                {data.map((item, i: number) => {
                                    return (
                                        <TouchableOpacity onPress={() => navigate('UserFamilyMemberDetails', { data: item })} key={i}>
                                            <View style={[styles.container]}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <View
                                                        style={{
                                                            flexDirection: 'row',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center',
                                                            width: '100%',
                                                        }}>
                                                        <View style={{
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                            gap: 10,
                                                        }}>
                                                            <Image
                                                                source={DummyImage.user}
                                                                style={{
                                                                    width: 50,
                                                                    height: 50,
                                                                    borderRadius: 50
                                                                }}
                                                            />
                                                            <View>
                                                                <Text style={styles.name}>{item.name}</Text>
                                                                <Text style={{ marginTop: 2, fontSize: 14 }}>{item.relation}</Text>
                                                            </View>
                                                        </View>
                                                        <NextIcon size={32} />
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    );
                                })}
                            </>
                        ) : (
                            <EmptyScreen
                                title={'No Family Member added yet'}
                                message={' Add family members to keep track of them.'}
                            />
                        )}
                    </View>
                </ScrollView>
                <FilledButton
                    type="blue"
                    label="Add family member"
                    icon={<PlusIcon />}
                    onPress={() => navigate('AddUserFamilyMember')}
                    style={styles.addBtn}
                />
            </CommonLayout>
        </>
    );
};

export default UserFamilyMembers;

const styles = StyleSheet.create({
    addBtn: {
        width: 200,
        position: 'absolute',
        bottom: 40,
        right: 20,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 8,
    },
    name: {
        color: '#00263E',
        fontSize: 18,
        fontWeight: '600',
    },
});
