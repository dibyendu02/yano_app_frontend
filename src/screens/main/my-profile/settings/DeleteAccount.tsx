import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native'
import { Colors } from '../../../../constants/Colors'
import Header from '../../../../components/header/Header'
import { ScrollView } from 'react-native' 
import { Control, FieldValues, useForm } from 'react-hook-form'
import FilledButton from '../../../../components/buttons/FilledButton'
import CustomPasswordField from '../../../../components/formComp/CustomPasswordField'

const DeleteAccount = () => {
    const { control, handleSubmit, reset, formState: { errors, isValid } } = useForm();
    const onSubmit = (value: string) => {
        console.log(value)
    }
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
                    <View style={styles.versionBox} >
                        <View>
                            <Text style={styles.title}>If you delete this account:</Text>
                        </View>
                        <View style={{
                            borderBottomWidth: 1,
                            borderBottomColor: Colors.LightGray,
                            paddingBottom: 20,
                            marginBottom: 20
                        }}>
                            <Text style={styles.list}>The account will be deleted from Yano and all your devices.</Text>
                            <Text style={styles.list}>Your health history will be erased.</Text>
                            <Text style={styles.list}>Your measurements will be erased.</Text>
                        </View>
                        <View>
                            <Text style={{
                                fontSize: 18, 
                                color: Colors.SteelBlue,
                                marginBottom:10,
                            }} >To delete your account please enter your password.</Text>
                            <CustomPasswordField
                                name='password'
                                label='Password'
                                control={control as unknown as Control<FieldValues, object>}
                            />
                            <FilledButton
                                label='Delete account'
                                disabled
                                type='red'
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default DeleteAccount

const styles = StyleSheet.create({
    versionBox: {
        width: '100%',
        padding: 20,
        borderRadius: 10,
        backgroundColor: Colors.White,
        marginVertical: 20,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: Colors.Red,
        marginBottom: 15,
    },
    list: {
        paddingStart: 20,
        fontSize: 14,
        color: Colors.SteelBlue,
        marginBottom: 8,
    }
})