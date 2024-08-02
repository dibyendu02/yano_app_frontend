import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CommonLayout from '../../../../components/CommonLayout'
import Header from '../../../../components/header/Header'
import { Controller, FieldError, useForm } from 'react-hook-form'
import { Colors } from '../../../../constants/Colors'
import { CheckCircleIcon, CheckIcon } from '../../../../assets/icon/IconNames'

const options = [
    {
        label: 'Monthly',
        value: 'monthly',
        amount: 10,
    },
    {
        label: 'Yearly',
        value: 'yearly',
        amount: 100,
        best: true,
    },
]

const Subscription = () => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    return (
        <CommonLayout>
            <Header title="Choose a subscription" />
            <ScrollView>
                <View style={{ padding: 20 }}>
                    <View style={styles.inputBox}>
                        <Controller
                            control={control}
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <View style={styles.container}>
                                    {options.map(option => (<TouchableOpacity
                                        key={option.value}
                                        style={[styles.optionContainer, { borderColor: value === option.value ? Colors.Green : Colors.LightGray }]}
                                        onPress={() => onChange(option.value)}
                                    >
                                        {
                                            value === option.value ?
                                                <CheckCircleIcon size={24} />
                                                : <CheckIcon size={24} />
                                        }
                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            width: '90%',
                                            alignItems: 'center',
                                            marginTop: -2
                                        }} >
                                            <View>
                                                <Text style={styles.label}>{option.label}</Text>
                                                {option.best && <Text style={{
                                                    fontSize: 14,
                                                    color: "white",
                                                    fontWeight: '600',
                                                    paddingHorizontal: 8,
                                                    paddingVertical: 3,
                                                    backgroundColor: '#FFA000',
                                                    borderRadius: 5,
                                                    marginTop: 3,
                                                }} >MORE POPULAR</Text>}
                                            </View>
                                            <Text style={{
                                                fontSize: 18,
                                                color: Colors.Blue,
                                                fontWeight: '600',
                                            }} >${option.amount}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    ))}
                                    {error &&
                                        <Text style={styles.errorText}>
                                            {(error as FieldError).message}
                                        </Text>}
                                </View>
                            )}
                            name={'subscription'}
                        />
                    </View>
                </View>
            </ScrollView>
        </CommonLayout>
    )
}

export default Subscription

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        gap: 10,
    },
    optionContainer: {
        flexDirection: 'row',
        // alignItems: 'center',
        marginBottom: 10,
        backgroundColor: Colors.White,
        padding: 15,
        paddingVertical: 20,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.LightGray,
    },
    label: {
        marginLeft: 8,
        fontSize: 20,
        color: Colors.Blue,
        fontWeight: '600',
    },
    errorText: {
        color: 'red',
        marginTop: 5,
    },
    inputBox: {
        marginBottom: 0,
    },
    textLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.Blue,
    },
    input: {
        backgroundColor: Colors.White,
        borderRadius: 8,
        marginTop: 5,
        borderWidth: 1,
        borderColor: Colors.LightGray,
        height: 56,
        paddingHorizontal: 15,
        fontSize: 16
    },
})