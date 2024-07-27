import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icons from '../../assets/icon/Icon';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../../constants/Colors';

interface HeaderProps {
  title?: string;
  showBackIcon?: boolean;
}

const Header: React.FC<HeaderProps> = ({title, showBackIcon = true}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.navbar}>
      {showBackIcon && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icons.AntDesign name="arrowleft" size={28} color={'black'} />
        </TouchableOpacity>
      )}
      <Text style={styles.navbarTitle}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: Colors.White,
  },
  navbarTitle: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    paddingLeft: 15,
  },
});
