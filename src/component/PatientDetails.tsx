import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function PatientDetails({name, icon, color}) {
  return (
    <View style={styles.container}>
      <FontAwesome6 name={icon} size={25} color={'#76BC21'} />
      <Text style={styles.name}>{name}</Text>
      <MaterialIcons name="navigate-next" size={25} color={'black'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    // elevation: 2,
    // marginVertical: 10,
  },
  name: {
    color: '#00263E',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    marginLeft: 15,
    flex: 1,
  },
});
