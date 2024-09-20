import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../../constants/Colors';
import Header from '../../components/header/Header';
import {ScrollView} from 'react-native';
import PatientElements from '../../components/PatientElements';
import {MedicalHistoryItems} from '../../assets/MedicalHistoryItems';
import {Text} from 'react-native';
import Icons from '../../assets/icon/Icon';
import {retrieveData} from '../../utils/Storage';
import {initializeMedicalHistory} from '../../api/GET/medicalHistoryData';
import {useRoute} from '@react-navigation/native';

const MedicalHistory = ({navigation}: any) => {
  const route = useRoute();
  const requiredUserId = route?.params?.fetchedUserId;
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [userType, setUserType] = useState('');
  const getUserData = async () => {
    const retrievedToken = await retrieveData('token');
    const retrievedUserId = await retrieveData('userId');
    const retrievedUserType = await retrieveData('userType');

    setToken(retrievedToken);
    setUserId(retrievedUserId);
    setUserType(retrievedUserType);
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    const initializeMedicalhistorories = async () => {
      try {
        const res = await initializeMedicalHistory({userId, token});
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    };
    if (userType === 'patient') initializeMedicalhistorories();
  }, [userId, token, userType]);

  console.log(requiredUserId);
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.GhostWhite,
          position: 'relative',
        }}>
        <Header title="Medical history" />
        <ScrollView>
          <View
            style={{
              marginTop: 12,
              // paddingVertical: 12,
              borderRadius: 8,
              width: '94%',
              margin: 'auto',
              backgroundColor: Colors.White,
            }}>
            <FlatList
              data={MedicalHistoryItems}
              style={{
                paddingLeft: 20,
                paddingRight: 13,
              }}
              renderItem={({item, index: _i}) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(item.path, {requiredUserId})
                  }
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 14,
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={item.img}
                      style={{width: 30, objectFit: 'contain'}}
                    />
                    <Text
                      style={{
                        color: Colors.Blue,
                        fontSize: 16,
                        // fontWeight: '800',
                        fontWeight: '600',
                        marginLeft: 14,
                      }}>
                      {item.title}
                    </Text>
                  </View>
                  <Icons.MaterialIcons
                    name="navigate-next"
                    size={25}
                    color={Colors.Blue}
                  />
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => <View style={styles.separate} />}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default MedicalHistory;

const styles = StyleSheet.create({
  box: {},
  separate: {
    backgroundColor: Colors.LightGray,
    height: 1,
    width: '100%',
  },
});
