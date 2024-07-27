import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icons from '../../assets/icon/Icon';
import {useNavigation} from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icons.AntDesign name="arrowleft" size={28} color={'black'} />
      </TouchableOpacity>
      <Text style={styles.navbarTitle}>Monitored Patient</Text>
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
  },
  navbarTitle: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    paddingLeft: 15,
  },
});
