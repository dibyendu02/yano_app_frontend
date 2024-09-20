import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {Colors} from '../../../constants/Colors';
import DetailItems from '../components/DetailItems';
import CommonHomeScreen2 from '../components/CommonHomeScreen2';
import {retrieveData} from '../../../utils/Storage';
import {socialHistoryData} from '../../../api/GET/medicalHistoryData';
import {deleteSocialHistoryData} from '../../../api/DELETE/medicalHistoryDelete';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import EmptyScreen from '../components/EmptyScreen';
import FilledButton from '../../../components/buttons/FilledButton';
import {PlusIcon} from '../../../assets/icon/IconNames';
import moment from 'moment';

const SocialHistoryHomeScreen = ({navigation}: any) => {
  const route = useRoute();
  const requiredUserId = route?.params?.requiredUserId;
  const [data, setData] = useState<any>({});
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [id, setId] = useState('');

  const getToken = async () => {
    const data = await retrieveData('token');
    setToken(data);
  };

  const getUserId = async () => {
    const data = await retrieveData('userId');
    setUserId(data);
  };

  const handleDelete = async () => {
    try {
      await deleteSocialHistoryData({userId, token, id});
      navigation.goBack();
    } catch (err) {
      console.log('error deleting social history');
    }
  };

  const fetchData = async () => {
    try {
      let res;
      if (requiredUserId)
        res = await socialHistoryData({userId: requiredUserId, token});
      else res = await socialHistoryData({userId, token});
      // const res = await socialHistoryData({userId, token});
      if (res?.socialHistory?.length > 0) {
        setData({
          id: res?.socialHistory[0]._id,
          occupation: res?.socialHistory[0]?.occupation,
          education: res?.socialHistory[0]?.education.field,
          date: res?.socialHistory[0]?.education.date,
          placeOfBirth: res?.socialHistory[0]?.placeOfBirth,
          maritalStatus: res?.socialHistory[0]?.maritalStatus,
          children: res?.socialHistory[0]?.numberOfChildren,
          religion: res?.socialHistory[0]?.religion,
          diet: res?.socialHistory[0]?.diet,
          sex: res?.socialHistory[0]?.sexualOrientation,
          doYouSmoke: res?.socialHistory[0]?.doYouSmoke,
          doYouConsumeAlcohol: res?.socialHistory[0]?.doYouConsumeAlcohol,
          substance: res?.socialHistory[0]?.useOfOtherSubstances,
          exercise: res?.socialHistory[0]?.doYouExercise,
          stressFactor: res?.socialHistory[0]?.stressFactor,
          spokenLanguages: res?.socialHistory[0]?.spokenLanguage,
        });
        setId(res?.socialHistory[0]._id);
      } else {
        setData({
          id: '',
          occupation: '',
          education: '',
          placeOfBirth: '',
          maritalStatus: '',
          children: 0,
          religion: '',
          diet: '',
          sex: '',
          doYouSmoke: '',
          doYouConsumeAlcohol: '',
          substance: '',
          exercise: '',
          stressFactor: '',
          spokenLanguages: '',
        });
      }
    } catch (error) {
      console.error('Error fetching social history data:', error);
    }
  };

  useEffect(() => {
    getToken();
    getUserId();
  }, []);

  // Using useFocusEffect to fetch data whenever the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      if (userId && token) {
        fetchData();
      }
    }, [userId, token]),
  );

  return (
    <>
      <CommonHomeScreen2
        data={data}
        navigation={navigation}
        onDelete={handleDelete}
        heading="Social history"
        customHeaderStyle={{paddingVertical: 12, paddingTop: 55}}
        component={
          <ScrollView>
            <View style={{paddingVertical: 12, width: '94%', margin: 'auto'}}>
              <View style={styles.boxStyle}>
                <DetailItems name="Occupation" value={data.occupation || ''} />
                <DetailItems
                  name="Education"
                  value={
                    `${data.education}-${moment(data.date).format(
                      'DD-MM-YYYY',
                    )}  ` || ''
                  }
                />
                <DetailItems
                  name="Place of birth"
                  value={data.placeOfBirth || ''}
                />
                <DetailItems
                  name="Marital status"
                  value={data.maritalStatus || ''}
                />
                <DetailItems
                  name="Number of children"
                  value={data.children?.toString() || '0'}
                />
                <DetailItems name="Religion" value={data.religion || ''} />
                <DetailItems name="Diet" value={data.diet || ''} />
                <DetailItems name="Sexual orientation" value={data.sex || ''} />
                <DetailItems
                  name="Do you smoke?"
                  value={data.doYouSmoke || ''}
                />
                <DetailItems
                  name="Do you consume alcohol?"
                  value={data.doYouConsumeAlcohol || ''}
                />
                <DetailItems
                  name="Use of other substances"
                  value={data.substance || ''}
                />
                <DetailItems
                  name="Do you exercise?"
                  value={data.exercise || ''}
                />
                <DetailItems
                  name="Stress factor"
                  value={data.stressFactor || ''}
                />
                <DetailItems
                  name="Spoken languages"
                  value={data.spokenLanguages || ''}
                />
              </View>
            </View>
          </ScrollView>
        }
        addItem_path="AddAndEditSocialHistory"
        emptyHomeTitle="No Social History"
        emptyHomeMessage="Social history will appear here.
Add one to get started."
      />
    </>
  );
};

export default SocialHistoryHomeScreen;

const styles = StyleSheet.create({
  boxStyle: {
    width: '100%',
    backgroundColor: Colors.White,
    paddingHorizontal: 20,
    paddingTop: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  addBtn: {
    width: 100,
    position: 'absolute',
    bottom: 25,
    right: 20,
  },
});
