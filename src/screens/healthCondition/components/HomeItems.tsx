import {ScrollView, StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import {Colors} from '../../../constants/Colors';
import PatientElementComp from './PatientElementComp';

type props = {
  data: any[];
  path: string;
  navigation: any;
};

const HomeItems: FC<props> = ({data, path, navigation}) => {
  return (
    <>
      <ScrollView>
        <View style={{paddingVertical: 12, width: '94%', margin: 'auto'}}>
          <View
            style={{
              paddingHorizontal: 10,
              borderRadius: 8,
              backgroundColor: Colors.White,
            }}>
            {data.map((item, i) => {
              console.log(item?.note);
              return (
                <PatientElementComp
                  key={i}
                  name={item.name}
                  element={<></>}
                  details={item?.note ? item?.note : ''}
                  color="black"
                  customStyle={{
                    paddingVertical: 20,
                    borderRadius: 0,
                    borderBottomWidth: i === data.length - 1 ? 0 : 1,
                    borderBottomColor: Colors.LightGray,
                    borderTopRightRadius: i === 0 ? 10 : 0,
                    borderTopLeftRadius: i === 0 ? 10 : 0,
                    borderBottomLeftRadius: i === data.length - 1 ? 10 : 0,
                    borderBottomRightRadius: i === data.length - 1 ? 10 : 0,
                    // paddingLeft: 10,
                    padding: 0,
                    // backgroundColor: 'red',
                  }}
                  onPress={() => navigation.navigate(path, {data: item})}
                />
              );
            })}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default HomeItems;

const styles = StyleSheet.create({
  boxStyle: {
    width: '100%',
    backgroundColor: Colors.White,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.Blue,
  },
});
