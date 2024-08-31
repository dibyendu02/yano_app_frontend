import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../../../constants/Colors';
import Icons from '../../../assets/icon/Icon';

type props = {
  title?: string;
  leftIcon?: React.ReactNode;
  rightComp1?: React.ReactNode;
  rightComp2?: React.ReactNode;
  customStyle?: object;
};

const CommonHeader: FC<props> = ({
  title,
  leftIcon,
  rightComp1,
  rightComp2,
  customStyle,
}) => {
  const navigation = useNavigation();

  // Determine paddingVertical based on whether right components are present
  const paddingVertical = rightComp1 || rightComp2 ? 1 : 10;

  return (
    <View
      style={[styles.navbar, styles.flexBox, {paddingVertical}, customStyle]}>
      <View style={[styles.flexBox, {justifyContent: 'center'}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          {leftIcon ? (
            leftIcon
          ) : (
            <Icons.AntDesign name="arrowleft" size={25} color={Colors.Blue} />
          )}
        </TouchableOpacity>
        <Text style={styles.navbarTitle}>
          {title ? title : 'Monitored Patient'}
        </Text>
      </View>
      <View style={{flexDirection: 'row', gap: 20}}>
        {rightComp1}
        {rightComp2}
      </View>
    </View>
  );
};

export default CommonHeader;

const styles = StyleSheet.create({
  navbar: {
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingEnd: 10,
    backgroundColor: Colors.White,
    paddingTop: 45,
  },
  navbarTitle: {
    color: Colors.Blue,
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    paddingLeft: 15,
  },
  boxStyle: {
    width: '100%',
    backgroundColor: Colors.White,
    borderRadius: 15,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.Blue,
  },
  para: {
    fontSize: 14,
    color: Colors.SteelBlue,
    marginBottom: 4,
  },
  flexBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
