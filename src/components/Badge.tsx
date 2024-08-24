import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {Colors} from '../constants/Colors';

type BadgeProps = {
  icon: JSX.Element;
  text: string;
  color?: string;
  customStyle?: object;
};

const Badge: FC<BadgeProps> = ({
  icon,
  text,
  color = '#BEE5EB',
  customStyle,
}) => {
  return (
    <View
      style={{
        padding: 10,
        paddingHorizontal: 15,
        paddingVertical: 8,
        backgroundColor: color,
        borderRadius: 50,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        marginTop: 10,
        ...customStyle,
      }}>
      {icon}
      <Text
        style={{
          fontSize: 14,
          color: Colors.Blue,
        }}>
        {text}
      </Text>
    </View>
  );
};

export default Badge;

const styles = StyleSheet.create({});
