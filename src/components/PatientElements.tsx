import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import Icons from '../assets/icon/Icon';

type PatientElementsProps = {
  name: string;
  icon?: string;
  iconsname?: keyof typeof Icons;
  color: string;
  element?: React.ReactNode;
  customStyle?: object;
  onPress?: () => void;
};

const PatientElements: React.FC<PatientElementsProps> = ({
  name,
  icon,
  iconsname,
  color,
  element,
  customStyle,
  onPress,
}) => {
  const navigation = useNavigation();

  // Get the appropriate icon component
  const IconComponent = Icons[iconsname || 'MaterialIcons'];

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, {...customStyle}]}>
        {IconComponent && <IconComponent name={icon!} size={25} color={color} />}
        {element}
        <Text style={styles.name}>{name}</Text>
        <MaterialIcons name="navigate-next" size={25} color={'black'} />
      </View>
    </TouchableOpacity>
  );
};

export default PatientElements;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
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
