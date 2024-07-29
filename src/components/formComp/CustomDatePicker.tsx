// CustomDatePicker.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Controller, Control, FieldValues, FieldError } from 'react-hook-form';
import { TextInput } from 'react-native';
import { DateIcon } from '../../assets/icon/IconNames';
import { Colors } from '../../constants/Colors';

interface CustomDatePickerProps {
    name: string;
    control: Control<FieldValues, object>;
    rules?: object;
    label?: string;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
    name, control, rules = {}, label,
}) => {
    const [show, setShow] = useState(false);

    return (
        <View style={styles.inputBox}>
            {label && <Text style={styles.label}>{label}</Text>}
            <Controller
                control={control}
                rules={rules}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <>
                        <Pressable
                            onPress={() => setShow(true)}
                            style={{ position: 'relative' }}
                        >
                            <TextInput
                                style={[styles.input, { color: Colors.Black }, error && styles.errorInput]}
                                value={value && new Date(value).toDateString()}
                                placeholder={'Select a date'}
                                editable={false}
                            />
                            <View style={{
                                position: 'absolute',
                                top: 25,
                                right: 20,
                            }}>
                                <DateIcon />
                            </View>
                        </Pressable>
                        <DatePicker
                            mode='date'
                            style={styles.input}
                            modal
                            open={show}
                            date={value ? new Date(value) : new Date()}
                            onConfirm={(date) => {
                                setShow(false)
                                onChange(date);
                            }}
                            onCancel={() => {
                                setShow(false)
                            }}
                        />
                        {error &&
                            <Text style={styles.errorText}>
                                {(error as FieldError).message}
                            </Text>
                        }
                    </>
                )}
                name={name}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    errorText: {
        color: 'red',
        marginTop: 2,
    },
    errorInput: {
        borderColor: "red"
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
        height: 56,
        paddingHorizontal: 15,
        fontSize: 16
    },
});

export default CustomDatePicker;
