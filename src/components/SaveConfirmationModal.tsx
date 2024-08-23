import React from 'react';
import { View, Text, Image, StyleSheet, GestureResponderEvent, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { staticIcons } from '../assets/image';
import { CloseIcon } from '../assets/icon/IconNames';
import { Colors } from '../constants/Colors';

interface SaveConfirmationModalProps {
    isVisible: boolean;
    onClose: (event?: GestureResponderEvent) => void;
    text: string;
}

const SaveConfirmationModal: React.FC<SaveConfirmationModalProps> = ({ isVisible, onClose, text }) => {
    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onClose}
            onSwipeComplete={onClose as (params: any, gestureState: any) => void}
            swipeDirection="down"
            animationIn="slideInUp"
            animationOut="slideOutDown"
            backdropOpacity={0}
            animationInTiming={1000}
            animationOutTiming={3000}
            style={styles.modal}>
            <View style={styles.modalContent}>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <CloseIcon color="white" />
                </TouchableOpacity>
                <View style={styles.textArea}>
                    <Image
                        source={staticIcons.checkCircle}
                        style={styles.iconStyle}
                    />
                    <Text style={styles.modalText}>{text}</Text>
                </View>
            </View>
        </Modal>
    );
};

export default SaveConfirmationModal;

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        margin: 0,
        marginBottom: 20,
    },
    modalContent: {
        backgroundColor: Colors.Green,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 10,
        width: '90%',
        alignSelf: 'center',
        position: 'relative',
    },
    iconStyle: {
        height: 20,
        width: 20,
        objectFit: 'contain',
        tintColor: 'white',
    },
    modalText: {
        color: Colors.White,
        fontSize: 14,
        fontWeight: 'bold',
    },
    textArea: {
        flexDirection: 'row',
        gap: 10,
        alignSelf: 'flex-start',
        width: '80%',
        marginVertical: 8,
        marginHorizontal: 8,
    },
    closeButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        height: 24,
        width: 24,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
    },
});
