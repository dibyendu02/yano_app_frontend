import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import React, { ReactNode, useEffect } from 'react';
import { Colors } from '../../../../constants/Colors';
import { RadioButton } from 'react-native-paper';

interface MeasurementChangeCardProps {
    title?: string;
    children?: ReactNode;
    cardFooter?: ReactNode | null;
    contentContainerStyle?: StyleProp<ViewStyle>;
    active: (value: boolean) => void;
    items?: { unit1: string, unit2: string, unit3: string };
}

const ECGSettingsGainCard: React.FC<MeasurementChangeCardProps> = ({
    title = '',
    contentContainerStyle,
    active,
    items
}) => {
    const [selectedValue, setSelectedValue] = React.useState<string>('');

    useEffect(() => {
        if (items) {
            setSelectedValue(items.unit1); // Default to unit1, or you could add logic to check for previously selected unit
        }
    }, [items]);

    return (
        <View style={[styles.container, contentContainerStyle]}>
            <View style={styles.content}>
                {title ? <Text style={styles.title}>{title}</Text> : null}
            </View>

            <View>
                <RadioButton.Group
                    onValueChange={value => setSelectedValue(value)}
                    value={selectedValue}
                >
                    <View style={styles.radioItem}>
                        <RadioButton
                            value={items?.unit1 || ''}
                            mode="android"
                            color={Colors.LightGreen}
                            uncheckedColor={Colors.Grey}
                        />
                        <Text style={styles.radioText}>{items?.unit1 || ''}</Text>
                    </View>
                    <View style={styles.radioItem}>
                        <RadioButton
                            value={items?.unit2 || ''}
                            mode="android"
                            color={Colors.LightGreen}
                            uncheckedColor={Colors.Grey}
                        />
                        <Text style={styles.radioText}>{items?.unit2 || ''}</Text>
                    </View>
                    {items?.unit3 && <View style={styles.radioItem}>
                        <RadioButton
                            value={items?.unit3 || ''}
                            mode="android"
                            color={Colors.LightGreen}
                            uncheckedColor={Colors.Grey}
                        />
                        <Text style={styles.radioText}>{items?.unit3 || ''}</Text>
                    </View>}
                </RadioButton.Group>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.button} onPress={() => active(false)}>
                    <Text style={styles.cancelButtonText}>CANCEL</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 6,
        borderRadius: 10,
        backgroundColor: 'white',
        width: '94%',
        alignSelf: 'center',
        overflow: 'hidden',
        padding: 15,
        position: 'relative',
        top: '34%',
        zIndex: 2
    },
    content: {
        width: '100%',
        alignItems: 'flex-start',
    },
    title: {
        fontWeight: 'bold',
        marginLeft: 4,
        marginTop: 10,
        marginBottom: 10,
        fontSize: 20,
        color: Colors.Blue,
        alignSelf: 'flex-start',
    },
    radioItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    radioText: {
        marginLeft: 8,
        color: 'black',
        fontSize: 18,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 20,
        width: '100%',
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    cancelButtonText: {
        color: Colors.LightGreen,
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default ECGSettingsGainCard;
