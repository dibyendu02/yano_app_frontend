/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import {View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {Colors} from '../../../../../constants/Colors';

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
      backdropColor={'rgba(0,0,0,0)'}>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
        }}>
        <View
          style={{
            height: '90%',
            minHeight: 300,
            width: '100%',
            backgroundColor: Colors.White,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            alignItems: 'center',
            shadowColor: 'black', // Shadow color
            shadowOffset: {width: 0, height: -5}, // Increased shadow offset height for more length
            shadowOpacity: 1, // Slightly reduced opacity for more density
            shadowRadius: 20, // Increased shadow radius for more blur
            elevation: 100, //
          }}>
          <View
            style={{
              width: 72,
              height: 8,
              backgroundColor: Colors.LightGray,
              marginTop: 8,
              marginBottom: 16,
              borderRadius: 4,
              alignSelf: 'center',
            }}
          />
          <View
            style={{
              width: '100%',
              flex: 1,
              justifyContent: 'flex-end',
            }}>
            {children}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default BottomSheet;
