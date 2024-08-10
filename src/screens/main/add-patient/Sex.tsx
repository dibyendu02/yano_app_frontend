import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { Colors } from '../../../constants/Colors';
import { RadioButton } from 'react-native-paper';

interface GenderProps {
    selectedRole: string;
    setSelectedRole: (role: string) => void;
    isSelected?: boolean;
}

const Sex: React.FC<GenderProps> = ({ selectedRole, setSelectedRole, isSelected }) => {
    const Config = [
        {
            id: '1',
            label: 'Male',
        },
        {
            id: '2',
            label: 'Female',
        },
    ];

    // Ensure selectedRole is set only if isSelected is true
    useEffect(() => {
        if (isSelected && !selectedRole) {
            setSelectedRole('1');
        } else if (!isSelected && selectedRole) {
            setSelectedRole('');
        }
    }, [isSelected, setSelectedRole]);

    const handlePress = (role: string) => {
        setSelectedRole(role);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Sex</Text>
            <View style={styles.buttonContainer}>
                {Config.map(item => (
                    <TouchableOpacity
                        key={item.id}
                        activeOpacity={0.6}
                        style={[
                            styles.selectionCardContainer,
                            {
                                borderColor: item.id === selectedRole ? Colors.LightGreen : Colors.LightGray,
                                borderWidth: 2,
                            },
                        ]}
                        onPress={() => handlePress(item.id)}>
                        <RadioButton
                            value={item.id}
                            status={selectedRole === item.id ? 'checked' : 'unchecked'}
                            onPress={() => handlePress(item.id)}
                            color={Colors.LightGreen}
                            uncheckedColor={Colors.Grey}
                        />
                        <Text style={[
                            styles.selectionCardContainerText,
                            { color: item.id === selectedRole ? Colors.Blue : Colors.Grey }
                        ]}>
                            {item.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

export default Sex;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 0,
        paddingVertical: 16
    },
    headerText: {
        color: Colors.Blue,
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    selectionCardContainer: {
        width: '48%',
        paddingVertical: 12,
        paddingLeft: 8,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
    },
    selectionCardContainerText: {
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 8,
    },
});
