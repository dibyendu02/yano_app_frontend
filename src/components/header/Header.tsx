import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icons from '../../assets/icon/Icon';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../../constants/Colors';

interface HeaderProps {
  title?: string;
  showBackIcon?: boolean;
  headerRightComponent?: React.ReactNode;
  customStyle?: any;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showBackIcon = true,
  headerRightComponent,
  customStyle,
}) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.navbar, customStyle]}>
      <View style={styles.navBarLeftContainer}>
        {showBackIcon && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icons.AntDesign name="arrowleft" size={25} color={Colors.Blue} />
          </TouchableOpacity>
        )}
        <Text style={styles.navbarTitle}>{title}</Text>
      </View>

      <View style={{alignItems: 'flex-end'}}>{headerRightComponent}</View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    // paddingLeft: 14,
    paddingVertical: 12,
    // height: 64,

    backgroundColor: Colors.White,
    justifyContent: 'space-between',
  },
  navbarTitle: {
    color: Colors.Blue,
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
