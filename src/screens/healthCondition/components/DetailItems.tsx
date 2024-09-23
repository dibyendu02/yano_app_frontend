import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {Colors} from '../../../constants/Colors';

type itemProps = {
  name: string;
  value: string | number;
  customtitleStyle?: object;
};

const DetailItems: FC<itemProps> = ({name, value, customtitleStyle}) => {
  return (
    <View style={{marginBottom: 15}}>
      <Text style={styles.para}>{name}</Text>
      <Text style={[styles.title, customtitleStyle]}>{value}</Text>
    </View>
  );
};

export default DetailItems;

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.Blue,
  },
  para: {
    fontSize: 12,
    color: Colors.SteelBlue,
    marginBottom: 4,
  },
});
