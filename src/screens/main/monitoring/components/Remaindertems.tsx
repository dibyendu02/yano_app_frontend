import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '../../../../constants/Colors';

type RemainderItemsProps = {
  name: string;
  subtitle?: string;
  element?: React.ReactNode;
  customStyle?: object;
  onPress?: () => void;
  isVisibleIcon?: boolean;
};

const RemainderItems: React.FC<RemainderItemsProps> = ({
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
        <View style={{flexDirection: 'row'}}>
          {element}
          <View
            style={{
              marginStart: 15,
              maxWidth: '90%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <Text style={styles.name}>{name}</Text>
              {isVisibleIcon && (
                <MaterialIcons name="navigate-next" size={30} color={'black'} />
              )}
            </View>
            <Text style={{marginTop: 4, color: Colors.SteelBlue}}>
              {subtitle}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RemainderItems;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
  },
  name: {
    color: '#00263E',
    fontSize: 18,
    fontWeight: '600',
    // fontFamily: 'Roboto',
    flex: 1,
    width: '80%',
  },
});
