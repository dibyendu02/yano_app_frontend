import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '../../../../constants/Colors';

type ItemWithTileSubtileProps = {
  title: string;
  subtitle?: string;
  element?: React.ReactNode;
  customStyle?: object;
  onPress?: () => void;
  isVisibleIcon?: boolean;
};

const MeasuringYourVitalComp: React.FC<ItemWithTileSubtileProps> = ({
  title,
  subtitle,
  element,
  customStyle,
  isVisibleIcon = true,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, {...customStyle}]}>
        <View
          style={[
            styles.midPart,
            {flexDirection: 'row', alignItems: 'center'},
          ]}>
          {element}
          <View
            style={{
              marginStart: 15,
              width: '68%',
            }}>
            <Text style={styles.title}>{title}</Text>
            <Text style={{marginTop: 4, color: Colors.SteelBlue}}>
              {subtitle}
            </Text>
          </View>
        </View>
        {isVisibleIcon && (
          <View style={{paddingRight: 6}}>
            <MaterialIcons name="navigate-next" size={30} color={'black'} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default MeasuringYourVitalComp;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.White, //Change it to white
    // padding: 20,
    borderRadius: 8,
  },
  midPart: {
    paddingVertical: 20,
    paddingLeft: 20,
    paddingRight: 0,
    borderColor: Colors.LightGray,
    borderRightWidth: 1,
  },
  title: {
    color: '#00263E',
    fontSize: 18,
    fontWeight: '600',
    // fontFamily: 'Roboto',
    flex: 1,
  },
});
