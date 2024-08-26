import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Colors } from '../../../../../constants/Colors';
import { RadioButton } from 'react-native-paper';

type RepetitionModalProps = {
    isVisible: boolean;
    onClose: () => void;
    onSelect: (value: string) => void;
};

const MonthChange = ({ isVisible, onClose, onSelect }: RepetitionModalProps) => {
    const [selectedValue, setSelectedValue] = useState('day');

    const handleSelect = (value: string): void => {
        setSelectedValue(value);
        onSelect(value);
        onClose();
    };


    return (
        <Modal transparent={true} visible={isVisible} animationType="fade">
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    {/* <Text style={styles.modalTitle}>Repeats every</Text> */}
                    <RadioButton.Group
                        onValueChange={newValue => setSelectedValue(newValue)}
                        value={selectedValue}>
                        <TouchableOpacity
                            style={styles.radioItem}
                            onPress={() => handleSelect('Monthly on the 28th')}>
                            <RadioButton
                                value="Monthly on the 28th"
                                color={Colors.LightGreen}
                                uncheckedColor={Colors.Grey}
                            />
                            <Text style={styles.radioText}>Monthly on the 28th</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.radioItem}
                            onPress={() => handleSelect('First Wednesday of every month')}>
                            <RadioButton
                                value="First Wednesday of every month"
                                color={Colors.LightGreen}
                                uncheckedColor={Colors.Grey}
                            />
                            <Text style={styles.radioText}>First Wednesday of every month</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.radioItem}
                            onPress={() => handleSelect('Second Wednesday of every month')}>
                            <RadioButton
                                value="Second Wednesday of every month"
                                color={Colors.LightGreen}
                                uncheckedColor={Colors.Grey}
                            />
                            <Text style={styles.radioText}>Second Wednesday of every month</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.radioItem}
                            onPress={() => handleSelect('Third Wednesday of every month')}>
                            <RadioButton
                                value="Third Wednesday of every month"
                                color={Colors.LightGreen}
                                uncheckedColor={Colors.Grey}
                            />
                            <Text style={styles.radioText}>Third Wednesday of every month</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.radioItem}
                            onPress={() => handleSelect('Fourth Wednesday of every month')}>
                            <RadioButton
                                value="Fourth Wednesday of every month"
                                color={Colors.LightGreen}
                                uncheckedColor={Colors.Grey}
                            />
                            <Text style={styles.radioText}>Fourth Wednesday of every month</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.radioItem}
                            onPress={() => handleSelect('Last Wednesday of every month')}>
                            <RadioButton
                                value="Last Wednesday of every month"
                                color={Colors.LightGreen}
                                uncheckedColor={Colors.Grey}
                            />
                            <Text style={styles.radioText}>Last Wednesday of every month</Text>
                        </TouchableOpacity>
                    </RadioButton.Group>

                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.button} onPress={onClose}>
                            <Text style={styles.cancelButtonText}>CANCEL</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: Colors.White,
        borderRadius: 10,
        padding: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 20,
        color: Colors.Black,
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

export default MonthChange;
