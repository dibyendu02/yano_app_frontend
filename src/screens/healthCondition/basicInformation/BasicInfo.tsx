import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Colors} from '../../../constants/Colors';
import {DeleteIcon, EditIcon} from '../../../assets/icon/IconNames';
import DetailItems from '../components/DetailItems';
import CommonHeader from '../components/CommonHeader';
import {Image} from 'react-native';
import {basicInfoData} from '../../../api/GET/medicalHistoryData';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {retrieveData} from '../../../utils/Storage';

const BasicInfo = ({navigation}: any) => {
  const route = useRoute();
  const requiredUserId = route?.params?.requiredUserId;
  const [data, setData] = React.useState({
    height: '-',
    weight: '-',
    bloodGroup: '-',
  });
  const [userId, setUserId] = useState('');
  const [userType, setUserType] = useState('');

  const fetchData = async () => {
    try {
      let res;
      if (requiredUserId) res = await basicInfoData({userId: requiredUserId});
      else res = await basicInfoData({userId});

      console.log(res);

      const transformedData = {
        height: res.userData?.height ? `${res.userData?.height} cm` : '-',
        weight: res.userData?.weight ? `${res.userData?.weight} kg` : '-',
        bloodGroup: res.userData?.bloodType ? res.userData?.bloodType : '-',
      };
      console.log(transformedData);
      setData(transformedData);
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [userId]),
  );

  const getUserData = async () => {
    // const retrievedToken = await retrieveData('token');
    const retrievedUserId = await retrieveData('userId');
    const retrievedUserType = await retrieveData('userType');

    setUserId(retrievedUserId);
    setUserType(retrievedUserType);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.GhostWhite,
        position: 'relative',
      }}>
      <CommonHeader
        title={'Basic information'}
        rightComp1={
          requiredUserId && userType === 'patient' ? null : (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('AddAndEditBasicInfo', {
                  data: {
                    height: data.height.replace(' cm', ''),
                    weight: data.weight.replace(' kg', ''),
                    bloodGroup: data.bloodGroup,
                  },
                  requiredUserId,
                })
              }>
              <Image
                source={require('../../../assets/image/EditPencil.png')}
                style={{height: 26, width: 24}}
              />
            </TouchableOpacity>
          )
        }
        customStyle={{paddingVertical: 12, paddingTop: 55}}
      />
      <ScrollView>
        <View style={{paddingVertical: 12, width: '94%', margin: 'auto'}}>
          <View style={styles.boxStyle}>
            <DetailItems name="Height" value={data.height} />
            <DetailItems name="Weight" value={data.weight} />
            <DetailItems name="Blood type" value={data.bloodGroup} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default BasicInfo;

const styles = StyleSheet.create({
  boxStyle: {
    width: '100%',
    backgroundColor: Colors.White,
    paddingHorizontal: 20,
    paddingTop: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
});
