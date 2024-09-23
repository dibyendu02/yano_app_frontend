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
import {deleteAllergyData} from '../../../api/DELETE/medicalHistoryDelete';
import {retrieveData} from '../../../utils/Storage';

const AllergyDetails = ({navigation, route}: any) => {
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [userType, setUserType] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  if (!route || !route.params) {
    Alert.alert('Error', 'Data not passed or invalid data passed');
    return navigation.goBack();
  }
  const data = route.params.data;
  const {
    id,
    name,
    date,
    triggeredBy, // Based on your model, this should be triggeredBy
    reaction,
    medicine,
    howOften,
    additionalNotes,
  } = data;
  const [requiredUserId, setRequiredUserId] = useState(
    data?.requiredUserId || '',
  );

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

  const deleteAllergy = async () => {
    try {
      await deleteAllergyData({
        id,
        userId:
          requiredUserId && userType == 'doctor' ? requiredUserId : userId,
        token,
      });
      navigation.goBack();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.GhostWhite,
        position: 'relative',
      }}>
      <CommonHeader
        title={name}
        rightComp1={
          requiredUserId && userType === 'patient' ? null : (
            <TouchableOpacity
              onPress={() => navigation.replace('AddAndEditAllergies', {data})}>
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
        customStyle={{paddingVertical: 12}}
      />
      <ScrollView>
        <View style={{paddingVertical: 12, width: '94%', margin: 'auto'}}>
          <View style={styles.boxStyle}>
            <DetailItems name="Allergy name" value={name} />
            <DetailItems name="Triggered by" value={triggeredBy} />
            <DetailItems name="Reaction" value={reaction} />
            <DetailItems name="How often does it occur" value={howOften} />
            <DetailItems
              name="Date Of first diagnosis"
              value={new Date(date)
                .toLocaleDateString('en-GB')
                .replace(/\//g, '-')}
            />
            <DetailItems name="Medicine" value={medicine} />
            <DetailItems name="Additional notes" value={additionalNotes} />
          </View>
        </View>
      </ScrollView>
      {isClicked && (
        <View style={styles.deletbuttonclick}>
          <Card
            title={'Delete allergy'}
            children={'Are you sure you want to eliminate this allergy?'}
            active={setIsClicked}
            action={deleteAllergy}
          />
        </View>
      )}
    </View>
  );
};

export default AllergyDetails;

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
