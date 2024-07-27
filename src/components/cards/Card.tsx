import {StyleSheet, Text, View} from 'react-native';
import React, {ReactNode} from 'react';
import {Colors} from '../../constants/Colors';

interface CardProps {
  title?: string;
  children?: ReactNode;
  cardFooter?: ReactNode | null;
}

const Card: React.FC<CardProps> = ({
  title = '',
  children,
  cardFooter = null,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {title && <Text style={styles.title}>{title}</Text>}
        {children}
      </View>
      {cardFooter}
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 6,
    borderRadius: 10,
    backgroundColor: Colors.White,
    width: '94%',
    alignSelf: 'center',
  },
  content: {
    padding: 15,
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Roboto',
    fontWeight: '600',
    fontSize: 14,
    color: Colors.SteelBlue,
    alignSelf: 'flex-start',
  },
});
