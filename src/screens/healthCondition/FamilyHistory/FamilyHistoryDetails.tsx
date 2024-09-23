import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../../../constants/Colors';
import Header from '../../../components/header/Header';
import {DeleteIcon, EditIcon} from '../../../assets/icon/IconNames';
import DetailItems from '../components/DetailItems';
import CommonHeader from '../components/CommonHeader';
import {Image} from 'react-native';
import {staticIcons} from '../../../assets/image';
import Card from '../../main/my-profile/UiUpdateComponents/Card';
import {deleteFamilyMemberHistoryFn} from '../../../api/DELETE/medicalHistoryDelete';
import {retrieveData} from '../../../utils/Storage';

const FamilyHistoryDetails = ({navigation, route}: any) => {
  if (!route || !route.params) {
    Alert.alert('Error', 'Data not passed or invalid data passed');
    return navigation.goBack();
  }
  const data = route.params.data;
  const {name, disease} = data;
  const [isClicked, setIsClicked] = useState(false);
  const [userId, setUserId] = useState('');
  const [userType, setUserType] = useState('');
  const [requiredUserId, setRequiredUserId] = useState(
    data?.requiredUserId || '',
  );

  const deleteFamilyMemberHistory = async () => {
    try {
      const respose = await deleteFamilyMemberHistoryFn({
        userId: requiredUserId ? requiredUserId : userId,
        id: data.id,
      });
      if (respose) {
        setIsClicked(false);
        navigation.navigate('FamilyHistory');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getUserData = async () => {
    // const retrievedToken = await retrieveData('token');
    const retrievedUserId = await retrieveData('userId');
    const retrievedUserType = await retrieveData('userType');

    // setToken(retrievedToken);
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
        title={`${name} - ${disease}`}
        rightComp1={
          requiredUserId && userType === 'patient' ? null : (
            <TouchableOpacity
              onPress={() =>
                navigation.replace('AddAndEditFamilyHistory', {data})
              }>
              <Image
                source={staticIcons.EditPencil}
                style={{height: 22, width: 22}}
              />
            </TouchableOpacity>
          )
        }
        rightComp2={
          requiredUserId && userType === 'patient' ? null : (
            <TouchableOpacity onPress={() => setIsClicked(true)}>
              <Image
                source={staticIcons.DeleteIcon}
                style={{height: 22, width: 22}}
              />
            </TouchableOpacity>
          )
        }
        customStyle={{
          paddingVertical: 12,
          paddingTop: 55,
        }}
      />
      <ScrollView>
        <View style={{paddingVertical: 12, width: '94%', margin: 'auto'}}>
          <View style={styles.boxStyle}>
            <DetailItems name="Relationship to family member" value={name} />
            <DetailItems
              name="Family member' s health condition"
              value={disease}
            />
          </View>
        </View>
      </ScrollView>
      {isClicked && (
        <View style={styles.deletbuttonclick}>
          <Card
            title={'Delete family medical history'}
            children={
              'Are you sure you want to delete this family medical record?'
            }
            active={setIsClicked}
            action={deleteFamilyMemberHistory}
          />
        </View>
      )}
    </View>
  );
};

export default FamilyHistoryDetails;

const styles = StyleSheet.create({
  boxStyle: {
    width: '100%',
    backgroundColor: Colors.White,
    paddingHorizontal: 20,
    paddingTop: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  deletbuttonclick: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: 1,
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 12,
  },
});
