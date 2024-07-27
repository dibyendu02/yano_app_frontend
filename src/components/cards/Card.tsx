import {StyleProp, Text, View, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';
import {CardStyles as styles} from './CardStyle';

interface CardProps {
  title?: string;
  children?: ReactNode;
  cardFooter?: ReactNode | null;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

const Card: React.FC<CardProps> = ({
  title = '',
  children,
  cardFooter = null,
  contentContainerStyle,
}) => {
  return (
    <View style={[styles.container, contentContainerStyle]}>
      <View style={styles.content}>
        {title && <Text style={styles.title}>{title}</Text>}
        {children}
      </View>
      {cardFooter}
    </View>
  );
};

export default Card;
