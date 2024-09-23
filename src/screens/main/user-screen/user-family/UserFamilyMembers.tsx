import React, {useEffect, useState, useCallback} from 'react';
import CommonLayout from '../../../../components/CommonLayout';
import Header from '../../../../components/header/Header';
import EmptyScreen from '../../../../components/EmptyScreen';
import FilledButton from '../../../../components/buttons/FilledButton';
import {NextIcon, PlusIcon} from '../../../../assets/icon/IconNames';
import {navigate} from '../../../../navigation/RootNavigation';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {DummyImage} from '../../../../assets/dummy/images';
import {Colors} from '../../../../constants/Colors';
import {retrieveData} from '../../../../utils/Storage';
import {getFamilyLinkData} from '../../../../api/GET/familyLink';
import {useFocusEffect} from '@react-navigation/native';

const UserFamilyMembers = () => {
  const [data, setData] = useState([]);
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

  const getFamilyData = async () => {
    try {
      const res = await getFamilyLinkData({userId, token});
      console.log(res);
      setData(res.familyLink); // Assuming the response contains `familyLink`
    } catch (error) {
      console.error(error);
    }
  };

  // Run `getFamilyData` whenever the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      if (userId && token) {
        getFamilyData();
      }
    }, [userId, token]),
  );

  return (
    <>
      <CommonLayout>
        <Header title={'Family link'} />
        <ScrollView>
          <View
            style={{
              paddingVertical: 12,
              width: '94%',
              margin: 'auto',
            }}>
            {data && data.length > 0 ? (
              <>
                {data.map((item, i: number) => {
                  return (
                    <View key={i}>
                      <TouchableOpacity
                        onPress={() =>
                          navigate('UserFamilyMemberDetails', {data: item})
                        }>
                        <View
                          style={[
                            styles.container,
                            {
                              borderTopLeftRadius: i == 0 ? 8 : 0,
                              borderTopRightRadius: i == 0 ? 8 : 0,
                              borderBottomLeftRadius:
                                i == data.length - 1 ? 8 : 0,
                              borderBottomRightRadius:
                                i == data.length - 1 ? 8 : 0,
                            },
                          ]}>
                          <View style={{flexDirection: 'row'}}>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '100%',
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  gap: 10,
                                }}>
                                <Image
                                  source={
                                    item?.userImg?.secure_url
                                      ? {uri: item?.userImg?.secure_url}
                                      : DummyImage.user
                                  }
                                  style={{
                                    width: 42,
                                    height: 42,
                                    borderRadius: 50,
                                  }}
                                />
                                <View>
                                  <Text style={styles.name}>{item.name}</Text>
                                  <Text
                                    style={{
                                      marginTop: 2,
                                      fontSize: 14,
                                      color: Colors.SteelBlue,
                                    }}>
                                    {item.relation}
                                  </Text>
                                </View>
                              </View>
                              <NextIcon size={32} />
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                      {/* Add the separator if this is not the last item */}
                      {i < data.length - 1 && <View style={styles.separator} />}
                    </View>
                  );
                })}
              </>
            ) : (
              <EmptyScreen
                title={'No Family Member added yet'}
                message={' Add family members to keep track of them.'}
              />
            )}
          </View>
        </ScrollView>
        <FilledButton
          type="blue"
          label="Add family member"
          icon={<PlusIcon />}
          onPress={() => navigate('AddUserFamilyMember')}
          style={styles.addBtn}
        />
      </CommonLayout>
    </>
  );
};

export default UserFamilyMembers;

const styles = StyleSheet.create({
  addBtn: {
    width: 200,
    position: 'absolute',
    bottom: 25,
    right: 20,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    paddingRight: 10,
    // borderRadius: 8,
  },
  name: {
    color: '#00263E',
    fontSize: 18,
    fontWeight: '600',
  },
  separator: {
    backgroundColor: Colors.LightGray,
    height: 1,
    width: '80%', // Set the width to 90%
    alignSelf: 'center', // Center the separator
  },
});
