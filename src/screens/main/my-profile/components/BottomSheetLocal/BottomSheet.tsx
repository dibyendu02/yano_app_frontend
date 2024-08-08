/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import { View } from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import { Colors } from '../../../../../constants/Colors';

interface BottomSheetProps {
    isVisible: boolean;
    children: React.ReactNode;
    onBackdropPress: () => void;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
    isVisible,
    children,
    onBackdropPress,
}) => {
    return (
        <Modal
            isVisible={isVisible}
            style={{
                margin: 0,
                justifyContent: 'flex-end',
            }}
            onBackdropPress={onBackdropPress}
            onBackButtonPress={onBackdropPress}
            backdropColor={'rgba(0,0,0,0.4)'}>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                }}>
                <View
                    style={{
                        height: '98%',
                        minHeight: 300,
                        width: '100%',
                        backgroundColor: Colors.White,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        alignItems: 'center',
                    }}>
                    <View
                        style={{
                            width: 72,
                            height: 8,
                            backgroundColor: Colors.LightGray,
                            marginTop: 8,
                            marginBottom: 16,  // Add some margin to separate from the content
                            borderRadius: 4,
                            alignSelf: 'center',
                        }}
                    />
                    <View style={{
                        width: '100%',
                        flex: 1,
                        justifyContent: 'flex-end',  // Ensure children are at the bottom
                    }}>
                        {children}
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default BottomSheet;
