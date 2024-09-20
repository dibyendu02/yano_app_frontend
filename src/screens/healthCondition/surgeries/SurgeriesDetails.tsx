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
import {retrieveData} from '../../../utils/Storage';
import {deleteSurgeryData} from '../../../api/DELETE/medicalHistoryDelete';

const SurgeriesDetails = ({navigation, route}: any) => {
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  if (!route || !route.params) {
    Alert.alert('Error', 'Data not passed or invalid data passed');
    return navigation.goBack();
  }
  const data = route.params.data;
  const {id, name, devices, date, doctorName, additionalNotes} = data;

  const getUserData = async () => {
    const retrievedToken = await retrieveData('token');
    const retrievedUserId = await retrieveData('userId');

    setToken(retrievedToken);
    setUserId(retrievedUserId);
  };

  useEffect(() => {
    getUserData();
  }, []);

  const deleteSurgery = async () => {
    try {
      await deleteSurgeryData({id, userId, token});
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
          <TouchableOpacity
            onPress={() => navigation.replace('AddAndEditSurgeries', {data})}>
            <Image
              source={staticIcons.EditPencil}
              style={{height: 22, width: 22}}
            />
          </TouchableOpacity>
        }
        rightComp2={
          <TouchableOpacity onPress={() => setIsClicked(true)}>
            <Image
              source={staticIcons.DeleteIcon}
              style={{height: 22, width: 22}}
            />
          </TouchableOpacity>
        }
        customStyle={{paddingVertical: 12, paddingTop: 55}}
      />
      <ScrollView>
        <View style={{paddingVertical: 12, width: '94%', margin: 'auto'}}>
          <View style={styles.boxStyle}>
            <DetailItems name="Surgery name" value={name} />
            <DetailItems name="Implants / Support Devices" value={devices} />
            <DetailItems
              name="Surgery date"
              value={new Date(date)
                .toLocaleDateString('en-GB')
                .replace(/\//g, '-')}
            />
            <DetailItems name="Physician in charge" value={doctorName} />
            <DetailItems name="Additional notes" value={additionalNotes} />
          </View>
        </View>
      </ScrollView>
      {isClicked && (
        <View style={styles.deletbuttonclick}>
          <Card
            title={'Delete surgery'}
            children={'Are you sure you want to eliminate this surgery?'}
            active={setIsClicked}
            action={deleteSurgery}
          />
        </View>
      )}
    </View>
  );
};

export default SurgeriesDetails;

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
