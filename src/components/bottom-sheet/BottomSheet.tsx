/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import {View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {Colors} from '../../constants/Colors';

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
        padding: 0,
        height: '100%',
        width: '100%',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
      }}
      onBackdropPress={onBackdropPress}
      onBackButtonPress={onBackdropPress}
      backdropColor={'rgba(0,0,0,0.4)'}>
      <View
        style={{
          height: 'auto',
          minHeight: 300,
          width: '100%',
          backgroundColor: Colors.White,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingBottom: 14,
          alignItems: 'center',
        }}>
        <View
          style={{
            width: 72,
            height: 8,
            backgroundColor: Colors.LightGray,
            marginVertical: 8,
            borderRadius: 4,
          }}
        />
        <View style={{width: '100%'}}>{children}</View>
      </View>
    </Modal>
  );
};

export default BottomSheet;
