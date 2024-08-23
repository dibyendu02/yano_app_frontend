import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import Icons from '../../../assets/icon/Icon';
import {Colors} from '../../../constants/Colors';

type PatientElementsProps = {
  name: string;
  icon?: string;
  iconsname?: keyof typeof Icons;
  color: string;
  element?: React.ReactNode;
  customStyle?: object;
  details?: string;
  onPress?: () => void;
};

const PatientElementComp: React.FC<PatientElementsProps> = ({
  name,
  icon,
  iconsname,
  color,
  element,
  details,
  customStyle,
  onPress,
}) => {
  const navigation = useNavigation();
  const stringTrimmer = (str: any) => {
    const trimmedString = typeof str === 'string' ? str : String(str);
    return trimmedString.length > 30
      ? trimmedString.slice(0, 40) + '...'
      : trimmedString;
  };

  details = stringTrimmer(details);

  // Get the appropriate icon component
  const IconComponent = Icons[iconsname || 'MaterialIcons'];

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, customStyle]}>
        {IconComponent && (
          <IconComponent name={icon!} size={25} color={color} />
        )}
        {element}
        <View style={styles.textContainer}>
          <Text style={styles.name}>{name}</Text>
          {details && <Text style={styles.details}>{details}</Text>}
        </View>
        <MaterialIcons name="navigate-next" size={25} color={'black'} />
      </View>
    </TouchableOpacity>
  );
};

export default PatientElementComp;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
  },
  textContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flex: 1, // Ensures the text container takes up remaining space
    marginLeft: 15, // Adds some space between the icon and the text
  },
  name: {
    color: '#00263E',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  details: {
    marginTop: 4,
    fontSize: 16,
    color: Colors.SteelBlue,
  },
});
