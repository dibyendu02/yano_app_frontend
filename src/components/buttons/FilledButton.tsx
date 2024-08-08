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
  Green = 'green',
}

const ButtonColors = {
  [ButtonType.Blue]: {
    backgroundColor: Colors.Blue,
    textColor: Colors.White,
    borderColor: Colors.Transparent,
    borderWidth: 0,
  },
  [ButtonType.Red]: {
    backgroundColor: Colors.Red,
    textColor: Colors.White,
    borderColor: Colors.Transparent,
    borderWidth: 0,
  },
  [ButtonType.White]: {
    backgroundColor: Colors.White,
    textColor: Colors.Blue,
    borderColor: Colors.LightGray,
    borderWidth: 1,
  },
  [ButtonType.LightGrey]: {
    backgroundColor: Colors.LightGray,
    textColor: Colors.Blue,
    borderColor: Colors.Transparent,
    borderWidth: 0,
  },
  [ButtonType.Green]: {
    backgroundColor: Colors.Green,
    textColor: Colors.White,
    borderColor: Colors.Transparent,
    borderWidth: 0,
  },
};
interface ButtonProps {
  type: 'blue' | 'red' | 'white' | 'lightGrey' | 'green';
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
  const getBackgroundColorWithOpacity = (color: any, opacity: any) => {
    if (!color.startsWith('#')) {
      // Handle other color formats if necessary
      return color;
    }
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r},${g},${b},${opacity})`;
  };
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: disabled
            ? getBackgroundColorWithOpacity(
                ButtonColors[type].backgroundColor,
                0.4,
              )
            : ButtonColors[type].backgroundColor,
          borderColor: ButtonColors[type].borderColor,
          borderWidth: ButtonColors[type].borderWidth,
        },
        style,
      ]}
      activeOpacity={activeOpacity}
      onPress={onPress}
      disabled={disabled}>
      {icon && icon}
      <Text
        style={[
          styles.label,
          {color: ButtonColors[type].textColor, marginLeft: icon ? 4 : 0},
        ]}>
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
