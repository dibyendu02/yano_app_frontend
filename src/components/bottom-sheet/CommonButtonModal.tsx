import { View } from 'react-native';
import React, { FC } from 'react';
import Modal from 'react-native-modal';
import { Colors } from '../../constants/Colors';


type CustomBottomModalProps = {
    isVisible: boolean;
    children: JSX.Element;
    onBackdropPress: () => void;
    modalStyle?: object;
    boxStyle?: object;
}

const CustomBottomModal:FC<CustomBottomModalProps> = ({ isVisible, children, onBackdropPress, modalStyle, boxStyle }) => {
    return (
        <Modal
            isVisible={isVisible}
            style={{
                margin: 0,
                padding: 0,
                height: '100%',
                width: '100%',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                ...modalStyle
            }}
            onBackdropPress={onBackdropPress}
            onBackButtonPress={onBackdropPress}
            backdropColor={'rgba(0,0,0,0.4)'}>
            <View
                style={{
                    minHeight: 100,
                    width: '100%',
                    backgroundColor: Colors.White,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    // paddingBottom: 14,
                    alignItems: 'center',
                    ...boxStyle
                }}>
                <View
                    style={{
                        width: 50,
                        height: 4,
                        backgroundColor: Colors.LightGray,
                        marginVertical: 6,
                        borderRadius: 4,
                    }}
                />
                <View style={{ width: '100%' }}>{children}</View>
            </View>
        </Modal>
    );
};

export default CustomBottomModal;