/* eslint-disable react-native/no-inline-styles */
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Colors} from '../../constants/Colors';

export enum ButtonType {
  Blue = 'blue',
  Red = 'red',
  White = 'white',
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
};
interface ButtonProps {
  type?: 'blue' | 'red' | 'white';
  label: string;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  style?: any;
}

const FilledButton: React.FC<ButtonProps> = ({
  type = ButtonType.Blue,
  label,
  onPress,
  disabled = false,
  icon,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: ButtonColors[type].backgroundColor,
          opacity: disabled ? 0.4 : 1,
          ...style,
        },
      ]}
      onPress={onPress}
      disabled={disabled}>
      {icon}
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
    marginVertical: 6,
    gap: 4,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
});
