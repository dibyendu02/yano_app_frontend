/* eslint-disable react-native/no-inline-styles */
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {Colors} from '../../constants/Colors';

export enum ButtonType {
  Blue = 'blue',
  Red = 'red',
  White = 'white',
  LightGrey = 'lightGrey',
}

const ButtonColors = {
  [ButtonType.Blue]: {
    backgroundColor: Colors.Blue,
    textColor: Colors.White,
  },
  [ButtonType.Red]: {
    backgroundColor: Colors.Red,
    textColor: Colors.White,
  },
  [ButtonType.White]: {
    backgroundColor: Colors.White,
    textColor: Colors.Blue,
  },
  [ButtonType.LightGrey]: {
    backgroundColor: Colors.LightGray,
    textColor: Colors.Blue,
  },
};
interface ButtonProps {
  type: 'blue' | 'red' | 'white' | 'lightGrey';
  label?: string;
  icon?: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  activeOpacity?: number;
}

const FilledButton: React.FC<ButtonProps> = ({
  type = ButtonType.Blue,
  label,
  icon,
  onPress,
  disabled = false,
  activeOpacity = 0.5,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: ButtonColors[type].backgroundColor,
          opacity: disabled ? 0.4 : 1,
        },
        style,
      ]}
      activeOpacity={activeOpacity}
      onPress={onPress}
      disabled={disabled}>
      {icon && icon}
      <Text style={[styles.label, {color: ButtonColors[type].textColor}]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default FilledButton;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
    marginVertical: 6,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
});
