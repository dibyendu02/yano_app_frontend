import { StyleSheet, Switch, Text, View } from 'react-native'
import React, { FC, useState } from 'react'
import { Colors } from '../../constants/Colors'

interface SwitchButtonProps {
    label?: string,
    getValue?: (value: boolean) => void,
    element?: React.ReactNode
    customStyle?: object
}

const SwitchButton: FC<SwitchButtonProps> = ({ label, getValue, element, customStyle }) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
        getValue && getValue(!isEnabled)
    };

    return (
        <>
            <View style={[styles.container, { ...customStyle }]}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                    {element}
                    <Text style={styles.label}>{label}</Text>
                </View>
                <Switch
                    trackColor={{ false: '#EDEDED', true: Colors.LighterGreen }}
                    thumbColor={isEnabled ? Colors.LightGreen : Colors.White}
                    ios_backgroundColor={Colors.LightBlack}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
        </>
    )
}

export default SwitchButton

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: Colors.White,
        borderRadius: 10,
    },
    label: {
        fontSize: 16,
        color: Colors.Blue,
        fontWeight: '600',
    }
})