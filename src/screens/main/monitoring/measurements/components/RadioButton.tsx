import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors} from '../../../../../constants/Colors';

const RadioButton = ({label, value, selectedValue, onValueChange}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onValueChange(value)}>
      <View style={styles.radioCircle}>
        {selectedValue === value && <View style={styles.selectedRb} />}
      </View>
      <Text style={styles.radioText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',

    marginVertical: 15,
  },
  radioCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.LightGreen,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedRb: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.LightGreen,
  },
  radioText: {
    fontSize: 18,
    color: Colors.Blue,
    fontWeight: '800',
    marginLeft: 12,
  },
});

export default RadioButton;
