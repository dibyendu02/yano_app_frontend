import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Card from '../UiUpdateComponents/Card';

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
    <>
      <TouchableOpacity onPress={onPress}>
        <View style={[styles.container, customStyle]}>
          <View style={styles.content}>
            {element}
            <View style={styles.textContainer}>
              <Text style={styles.name}>{name}</Text>
              {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
            </View>
          </View>
          {isVisibleIcon && (
            <MaterialIcons
              name="navigate-next"
              size={25}
              color={'black'}
              // style={{backgroundColor: 'red'}}
            />
          )}
        </View>
      </TouchableOpacity>
    </>
  );
};

export default DeviceItems;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 16,
    borderRadius: 8,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginStart: 15,
    justifyContent: 'center',
  },
  name: {
    color: '#00263E',
    fontSize: 18,
    fontWeight: '600',
  },
  subtitle: {
    color: '#00263E',
    fontSize: 14,
    fontWeight: '400',
  },
});
