import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text} from 'react-native';
import chatIcon from '../../../../assets/image/chatIcon.png';
import verticalLine from '../../../../assets/image/Line.png';
import {useNavigation} from '@react-navigation/native';

interface props {
  doctorName: string;
  duration: string;
}

export const TopBar: React.FC<props> = ({doctorName, duration}) => {
  const navigation = useNavigation();
  return (
    <View style={style.mainContainer}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '55%',
        }}>
        <Image source={chatIcon} style={{height: 20, width: 20}} />
        <View style={{marginHorizontal: 25}}>
          <Image source={verticalLine} />
        </View>

        <View>
          <Text style={[style.textColor, {fontWeight: '600', fontSize: 16}]}>
            {doctorName}
          </Text>
          <Text style={style.textColor}>{duration}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={style.button}
        onPress={() => navigation.goBack()}>
        <Text style={style.textColor}>End Call</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // margin: 10,
    width: '88%',
    margin: 'auto',
    marginVertical: 12,
  },
  textColor: {
    color: 'white',
  },
  button: {
    backgroundColor: '#D52417',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
});
