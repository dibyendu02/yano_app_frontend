/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Modal from 'react-native-modal';

interface DialogBaseProps {
  isVisible: boolean;
  children: React.ReactNode;
  onBackdropPress: () => void;
}

const DialogBase: React.FC<DialogBaseProps> = ({
  isVisible,
  children,
  onBackdropPress,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      style={{
        margin: 0,
        padding: 0,
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onBackdropPress={onBackdropPress}
      onBackButtonPress={onBackdropPress}
      backdropColor={'rgba(0,0,0,0.4)'}>
      {children}
    </Modal>
  );
};

export default DialogBase;
