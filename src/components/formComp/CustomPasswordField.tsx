import React, { FC, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps, TouchableOpacity } from 'react-native';
import { Controller, Control, FieldValues, FieldError } from 'react-hook-form';
import { Colors } from '../../constants/Colors';
import { NotViewPassIcon, ViewPassIcon } from '../../assets/icon/IconNames';

interface CustomInputProps extends TextInputProps {
    name: string;
    control: Control<FieldValues, object>;
    rules?: object;
    label?: string;
    icon?: React.ReactNode;
    isVisible?: boolean,
    condition?: string
}

const CustomPasswordField: FC<CustomInputProps> = ({
    name,
    control,
    condition,
    label,
    isVisible = true,
    rules = {},
    ...inputProps
}) => {
    const [visiblePass, setVisiblePass] = useState(false);
    return (
        <View style={styles.inputBox}>
            {label && <Text style={styles.label}>{label}</Text>}
            <Controller
                control={control}
                rules={rules}
                render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error }
                }) => (
                    <View style={{ position: "relative" }}>
                        <TextInput
                            style={[
                                styles.input,
                                error && styles.errorInput,
                            ]}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            {...inputProps}
                            secureTextEntry={!visiblePass}
                        />
                        <TouchableOpacity
                            style={{
                                position: "absolute",
                                top: 20,
                                right: 15,
                                zIndex: 1,
                                backgroundColor: Colors.White,
                            }}
                            onPress={() => setVisiblePass(!visiblePass)}
                        >
                            <>
                                {visiblePass ? <ViewPassIcon /> : <NotViewPassIcon />}
                            </>
                        </TouchableOpacity>
                        {condition && !error &&
                            <Text style={{marginTop:3}}>
                                {condition}
                            </Text>}
                        {error && (
                            <Text style={styles.errorText}>
                                {(error as FieldError).message}
                            </Text>
                        )}
                    </View>
                )}
                name={name}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    errorInput: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        marginTop: 2,
    },
    inputBox: {
        marginBottom: 15,
    },
    label: {
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
        paddingHorizontal: 15,
        fontSize: 16,
        paddingRight: 40,
        height: 56
    },
    padRight: {
        paddingRight: 40,
    }
});

export default CustomPasswordField;
