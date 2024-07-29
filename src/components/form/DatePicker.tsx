import DatePicker from 'react-native-date-picker'
import { FC, useState } from "react"
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import { Colors } from "../../constants/Colors"
import { DateIcon } from '../../assets/icon/IconNames'

type inputProps = {
    label: string,
    name: string, 
    onchange: (name: string, e: string) => void  
}

export const DatePickerField: FC<inputProps> = ({ label, name, onchange }) => {
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState(new Date())
    return (
        <View style={styles.inputBox}>
            <Text style={styles.label}>{label}</Text>
            <Pressable
                onPress={() => setOpen(true)}
                style={{ position: 'relative' }}
            >
                <TextInput
                    style={[styles.input, {color: Colors.Black}] }
                    value={date.toDateString()}
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
                open={open}
                date={date}
                onConfirm={(date) => {
                    setOpen(false)
                    setDate(date)
                    onchange(name, date.toDateString())
                }}
                onCancel={() => {
                    setOpen(false)
                }}
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