import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import Icons from '../../../../assets/icon/Icon';
import {Colors} from '../../../../constants/Colors';
import {Image} from 'react-native';
import {staticIcons} from '../../../../assets/image';

type SettingsElementsProps = {
  name: string;
  icon?: string;
  iconsname?: keyof typeof Icons;
  color: string;
  element?: React.ReactNode;
  customStyle?: object;
  onPress?: () => void;
};

const SettingsElements: React.FC<SettingsElementsProps> = ({
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
        {IconComponent && (
          <IconComponent name={icon!} size={25} color={color} />
        )}
        {element}
        <Text style={styles.name}>{name}</Text>
        {/* <MaterialIcons name="navigate-next" size={25} color={Colors.Blue} /> */}
        <Image
          source={staticIcons.nextIcon}
          style={{height: 12, width: 10, objectFit: 'contain'}}
        />
      </View>
    </TouchableOpacity>
  );
};

export default SettingsElements;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 5,
    borderRadius: 8,
  },
  name: {
    color: '#00263E',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    marginLeft: 15,
    flex: 1,
  },
});
