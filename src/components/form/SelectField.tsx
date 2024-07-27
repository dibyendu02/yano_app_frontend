import Select from 'react-native-picker-select';
import { FC } from "react"
import { StyleSheet, Text, TextInput, View } from "react-native"
import { Colors } from "../../constants/Colors"

type inputProps = {
    label: string,
    name: string,
    value: string,
    data: { label: string, value: string }[],
    onchange: (name: string, e: string) => void
    placeholder?: string,
}

export const SelectField: FC<inputProps> = ({ label, name, value, data, placeholder, onchange }) => {
    return (
        <View style={styles.inputBox}>
            <Text style={styles.label}>{label}</Text>
            <Select
                style={{
                    inputIOS: styles.input,
                    inputAndroid: styles.input,
                }}
                value={value}
                items={data}
                placeholder={placeholder}
                onValueChange={(e) => onchange(name, e)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    inputBox: {
        marginBottom: 20,
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
})