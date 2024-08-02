import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type DeviceItemsProps = {
  name: string;
  subtitle?: string;
  element?: React.ReactNode;
  customStyle?: object;
  onPress?: () => void;
  isVisibleIcon?: boolean;
};

const DeviceItems: React.FC<DeviceItemsProps> = ({
  name,
  subtitle,
  element,
  customStyle,
  isVisibleIcon = true,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, {...customStyle}]}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {element}
          <View
            style={{
              marginStart: 15,
            }}>
            <Text style={styles.name}>{name}</Text>
            <Text style={{marginTop: 4}}>{subtitle}</Text>
          </View>
        </View>
        {isVisibleIcon && (
          <MaterialIcons name="navigate-next" size={25} color={'black'} />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default DeviceItems;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    // paddingBottom: 10,
    borderRadius: 8,
  },
  name: {
    color: '#00263E',
    fontSize: 18,
    fontWeight: '600',
    // fontFamily: 'Roboto',
    // flex: 1,
    // backgroundColor: 'red',
    marginTop: 20,
  },
});
