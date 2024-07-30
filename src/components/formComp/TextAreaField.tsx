
import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { Controller, Control, FieldValues, FieldError } from 'react-hook-form';
import { Colors } from '../../constants/Colors';

interface CustomTextareaProps extends TextInputProps {
    name: string;
    control: Control<FieldValues, object>;
    rules?: object;
    label?: string;
}

const CustomTextarea: React.FC<CustomTextareaProps> = ({
    name, control, label, rules = {}, ...inputProps
}) => {
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
                    <>
                        <TextInput
                            style={[styles.textarea, error && styles.errorTextarea]}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            multiline={true}
                            numberOfLines={4}
                            {...inputProps}
                        />
                        {error && <Text style={styles.errorText}>{(error as FieldError).message}</Text>}
                    </>
                )}
                name={name}
            />
        </View>
    );
};

const styles = StyleSheet.create({ 
    inputBox: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.Blue,
    },
    textarea: {
        backgroundColor: Colors.White,
        borderRadius: 8,
        marginTop: 5,
        borderWidth: 1,
        borderColor: Colors.LightGray,
        paddingHorizontal: 15,
        fontSize: 16,
        textAlignVertical: 'top'
    },
    errorTextarea: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        marginTop: 2,
    },
});

export default CustomTextarea;
