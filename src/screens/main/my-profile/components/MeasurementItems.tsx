import {Image, StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import {Colors} from '../../../../constants/Colors';
import {navigate} from '../../../../navigation/RootNavigation';
import SettingsElements from './SettingsElements';

type Props = {
  data: {
    title: string;
    img: any;
    path: string;
  }[];
  active: (value: boolean) => void;
};

const MeasurementItems: FC<Props> = ({data, active}) => {
  const handleOnPress = (path: string) => {
    if (path !== 'DeleteAllData') {
      navigate(path);
    } else {
      active(true);
    }
  };

  return (
    <View style={{backgroundColor: 'white', padding: 10, borderRadius: 8}}>
      {data.map((item, i) => (
        <SettingsElements
          key={i}
          name={item.title}
          element={
            <Image
              source={item.img}
              style={{
                width: 25,
                height: 25,
                resizeMode: 'contain',
              }}
            />
          }
          color="black"
          customStyle={{
            paddingBottom: i !== data.length - 1 ? 16 : 0,
            paddingTop: i !== 0 ? 16 : 0,
            borderRadius: 0,
            borderBottomWidth: i !== data.length - 1 ? 1 : 0, // Only add border for all except the last item
            borderBottomColor:
              i !== data.length - 1 ? Colors.LightGray : 'transparent',
          }}
          onPress={() => handleOnPress(item.path)}
        />
      ))}
    </View>
  );
};

export default MeasurementItems;

const styles = StyleSheet.create({});
