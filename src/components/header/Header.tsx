
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Icons from '../../assets/icon/Icon';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../../constants/Colors';

interface HeaderProps {
  title?: string;
  showBackIcon?: boolean;
  headerRightComponent?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showBackIcon = true,
  headerRightComponent,
}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.navbar}>
      <View style={styles.navBarLeftContainer}>
        {showBackIcon && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icons.AntDesign name="arrowleft" size={28} color={'black'} />
          </TouchableOpacity>
        )}
        <Text style={styles.navbarTitle}>{title}</Text>
      </View>

      <View style={{ alignItems: 'flex-end' }}>{headerRightComponent}</View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.White,
    justifyContent: 'space-between',
  },
  navbarTitle: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    marginLeft: 8,
  },
  navBarLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
