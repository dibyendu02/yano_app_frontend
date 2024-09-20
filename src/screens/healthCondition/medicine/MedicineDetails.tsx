import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../../../constants/Colors';
import DetailItems from '../components/DetailItems';
import CommonHeader from '../components/CommonHeader';
import {staticIcons} from '../../../assets/image';
import Card from '../../main/my-profile/UiUpdateComponents/Card';
import {retrieveData} from '../../../utils/Storage';
import {deleteMedicineData} from '../../../api/DELETE/medicalHistoryDelete';

const MedicineDetails = ({navigation, route}: any) => {
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
    volume,
    unit,
    formOfMedicine,
    ingestionMethod,
    amount,
    frequency,
    when,
    otherInstructions,
    whenItBegins,
    whenItEnds,
    longDuration,
    medicineTakenFor,
    prescribedBy,
    sideEffects,
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

  const deleteMedicine = async () => {
    try {
      await deleteMedicineData({
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
              onPress={() => navigation.replace('AddAndEditMedicine', {data})}>
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
            <DetailItems name="Medicine name" value={name} />
            <View
              style={{
                paddingTop: 2,
                paddingBottom: 12,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: Colors.Blue,
                }}>
                Medicine form
              </Text>
            </View>
            <DetailItems name="Medicine form" value={formOfMedicine} />
            <DetailItems name="Medicine strength" value={volume + ` ` + unit} />
            <DetailItems name="Intake method" value={ingestionMethod} />
            <View
              style={{
                paddingTop: 2,
                paddingBottom: 12,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: Colors.Blue,
                }}>
                Dose
              </Text>
            </View>
            <DetailItems name="Quantity" value={amount} />
            <DetailItems name="Frequency" value={frequency} />
            <DetailItems name="When" value={when} />
            <DetailItems name="Other instructions" value={otherInstructions} />
            <View
              style={{
                paddingTop: 2,
                paddingBottom: 12,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: Colors.Blue,
                }}>
                Duration
              </Text>
            </View>
            <DetailItems
              name="It begins at"
              value={new Date(whenItBegins)
                .toLocaleDateString('en-GB')
                .replace(/\//g, '-')}
            />
            <DetailItems
              name="Until"
              value={new Date(whenItEnds)
                .toLocaleDateString('en-GB')
                .replace(/\//g, '-')}
            />
            <View
              style={{
                paddingTop: 2,
                paddingBottom: 12,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: Colors.Blue,
                }}>
                Additional Information
              </Text>
            </View>
            <DetailItems name="Medicine taken for" value={medicineTakenFor} />
            <DetailItems name="Prescribed by" value={prescribedBy} />
            <DetailItems name="Side effects" value={sideEffects} />
          </View>
        </View>
      </ScrollView>
      {isClicked && (
        <View style={styles.deletbuttonclick}>
          <Card
            title={'Delete medication'}
            children={'Are you sure you want to remove this medication?'}
            active={setIsClicked}
            action={deleteMedicine}
          />
        </View>
      )}
    </View>
  );
};

export default MedicineDetails;

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
