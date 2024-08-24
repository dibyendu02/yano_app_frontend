import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { Colors } from '../../../constants/Colors';
import { DeleteIcon, EditIcon } from '../../../assets/icon/IconNames';
import DetailItems from '../components/DetailItems';
import CommonHeader from '../components/CommonHeader';
import { Image } from 'react-native';

const BasicInfo = ({ navigation }: any) => {
  const data = {
    height: '164 cm',
    weight: '56 kg',
    bloodGroup: 'O+',
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.GhostWhite,
        position: 'relative',
      }}>
      <CommonHeader
        title={'Basic i nformation'}
        rightComp1={
          <TouchableOpacity
            onPress={() => navigation.navigate('AddAndEditBasicInfo', { data })}>
            <Image
              source={require('../../../assets/image/EditPencil.png')}
              style={{ height: 26, width: 24 }}
            />
          </TouchableOpacity>
        }
        customStyle={{ paddingVertical: 12 }}
      // rightComp2={
      //     <TouchableOpacity>
      //         <DeleteIcon />
      //     </TouchableOpacity>
      // }
      />
      <ScrollView>
        <View style={{ paddingVertical: 12, width: '94%', margin: 'auto' }}>
          <View style={styles.boxStyle}>
            <DetailItems name="Height" value={data.height} />
            <DetailItems name="Weight" value={data.weight} />
            <DetailItems name="Blood type" value={data.bloodGroup} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BasicInfo;

const styles = StyleSheet.create({
  boxStyle: {
    width: '100%',
    backgroundColor: Colors.White,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
});
