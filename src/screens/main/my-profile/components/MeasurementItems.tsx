import {Image, StyleSheet} from 'react-native';
import React, {FC} from 'react';
import PatientElements from '../../../../components/PatientElements';
import {Colors} from '../../../../constants/Colors';
import {navigate} from '../../../../navigation/RootNavigation';

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
    <>
      {data.map((item, i) => (
        <PatientElements
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
            paddingVertical: 20,
            borderRadius: 0,
            borderBottomWidth: 1,
            borderBottomColor: Colors.LightGray,
          }}
          onPress={() => handleOnPress(item.path)}
        />
      ))}
    </>
  );
};

export default MeasurementItems;

const styles = StyleSheet.create({});
