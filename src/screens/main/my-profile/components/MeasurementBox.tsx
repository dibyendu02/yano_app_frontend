import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { Colors } from '../../../../constants/Colors';
import Spinner from '../../../../components/Spinner';
import HeartAnimation from '../../../../assets/images/heartAnimate';

type props = {
  loading: boolean;
  fields: {
    name: string;
    value: number;
    unit: string;
  };
  customStyles?: any;
};

const MeasurementBox: FC<props> = ({
  loading,
  fields: { name, value, unit },
  customStyles,
}) => {
  // console.log('MeasurementBox', name, value, unit);
  return (
    <>
      <View style={[styles.container, { ...customStyles }]}>
        <Text style={styles.heading}>{name}</Text>
        {loading ? (
          unit == 'Beats/Min' ? (
            <HeartAnimation />
          ) : (
            <Spinner />
          )
        ) : (
          <Text style={styles.value}>
            {value === 0 ? '_ _' : value} {unit == 'SpO2H' ? '%' : ''}
          </Text>
        )}
        <Text style={styles.unit}>{unit}</Text>
      </View>
    </>
  );
};

export default MeasurementBox;

const styles = StyleSheet.create({
  container: {
    width: '33%',
    backgroundColor: Colors.White,
    padding: 20,
    borderRadius: 10,
  },
  heading: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.SteelBlue,
  },
  value: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 6,
    // color: Colors.Grey,
    color: Colors.Blue,
  },
  unit: {
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.SteelBlue,
  },
});
