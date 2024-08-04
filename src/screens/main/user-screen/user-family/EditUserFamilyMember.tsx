import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CommonLayout from '../../../../components/CommonLayout' 
import { DummyImage } from '../../../../assets/dummy/images'
import CustomSelect from '../../../../components/formComp/SelectFiled'
import { useForm } from 'react-hook-form'
import { Colors } from '../../../../constants/Colors'
import CommonHeader from '../../../healthCondition/components/CommonHeader'
import FilledButton from '../../../../components/buttons/FilledButton'
import { navigate } from '../../../../navigation/RootNavigation'

const EditUserFamilyMember = () => {
    const { control } = useForm();
    return (
        <CommonLayout>
            <CommonHeader
                title={'Add Family Member'}
                rightComp1={
                    <FilledButton
                        type='blue'
                        label="Save"
                        onPress={() => navigate('FamilyMemberSaved')}
                        // disabled={!disabled}
                        style={{
                            width: 70,
                            paddingVertical: 10,
                            borderRadius: 10,
                        }}
                    />
                }
            />
            <View style={{ padding: 20 }} >
                <View style={{
                    width: "100%",
                    borderRadius: 10,
                    backgroundColor: Colors.White,
                    alignItems: "center",
                    paddingVertical: 20,
                    marginBottom: 20
                }}>
                    <Image
                        source={DummyImage.user}
                        style={{ width: 80, height: 80, borderRadius: 80, objectFit: "cover", marginBottom: 10 }}
                    />
                    <Text style={{
                        fontSize: 18,
                        fontWeight: "600",
                        color: Colors.Blue
                    }} >María Clemente</Text>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: "500",
                        color: Colors.SteelBlue
                    }} >maria.clemente@gmail.com</Text>
                </View>
                <View>
                    <CustomSelect
                        name='relation'
                        label='Relación con el familiar'
                        control={control}
                        options={[
                            { label: "Mother", value: "Mother" },
                            { label: "Father", value: "Father" },
                            { label: "Brother", value: "Brother" },
                        ]}
                    />
                </View>
            </View>
        </CommonLayout>
    )
}

export default EditUserFamilyMember

const styles = StyleSheet.create({})