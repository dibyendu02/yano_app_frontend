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
import {DeleteIcon, EditIcon} from '../../../assets/icon/IconNames';
import DetailItems from '../components/DetailItems';
import CommonHeader from '../components/CommonHeader';
import {Image} from 'react-native';
import {staticIcons} from '../../../assets/image';
import Card from '../../main/my-profile/UiUpdateComponents/Card';
import {
  deleteAllergyData,
  deleteVaccineData,
} from '../../../api/DELETE/medicalHistoryDelete';
import {retrieveData} from '../../../utils/Storage';

const VaccineDetails = ({navigation, route}: any) => {
  if (!route || !route.params) {
    Alert.alert('Error', 'Data not passed or invalid data passed');
    return navigation.goBack();
  }
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [userType, setUserType] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const data = route.params.data;
  const {
    id,
    shotDate,
    name,
    vaccineDetails,
    vaccineFor,
    lotNumber,
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

  const deleteVaccine = async () => {
    try {
      await deleteVaccineData({
        id,
        userId: requiredUserId ? requiredUserId : userId,
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
              onPress={() => navigation.replace('AddAndEditVaccine', {data})}>
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
        customStyle={{paddingVertical: 12, paddingTop: 55}}
      />
      <ScrollView>
        <View style={{paddingVertical: 12, width: '94%', margin: 'auto'}}>
          <View style={styles.boxStyle}>
            <DetailItems name="Vaccination for" value={vaccineFor} />
            <DetailItems
              name="Shot date"
              value={new Date(shotDate)
                .toLocaleDateString('en-GB')
                .replace(/\//g, '-')}
            />
            <DetailItems name="Vaccine name" value={name} />
            <DetailItems name="Vaccine details" value={vaccineDetails} />
            <DetailItems name="lot number" value={lotNumber} />
            <DetailItems name="Additional notes" value={additionalNotes} />
          </View>
        </View>
      </ScrollView>
      {isClicked && (
        <View style={styles.deletbuttonclick}>
          <Card
            title={'Delete vaccine'}
            children={'Are you sure you want to delete this vaccine?'}
            active={setIsClicked}
            action={deleteVaccine}
          />
        </View>
      )}
    </View>
  );
};

export default VaccineDetails;

const styles = StyleSheet.create({
  boxStyle: {
    width: '100%',
    backgroundColor: Colors.White,
    paddingHorizontal: 20,
    paddingVertical: 16,
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
