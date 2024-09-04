import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../../../constants/Colors';
import DetailItems from '../components/DetailItems';
import CommonHomeScreen2 from '../components/CommonHomeScreen2';
import {retrieveData} from '../../../utils/Storage';
import {socialHistoryData} from '../../../api/GET/medicalHistoryData';
import {deleteSocialHistoryData} from '../../../api/DELETE/medicalHistoryDelete';

const SocialHistoryHomeScreen = ({navigation}: any) => {
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

  useEffect(() => {
    getToken();
    getUserId();
  }, []);

  useEffect(() => {
    if (userId && token) {
      const getData = async () => {
        try {
          const res = await socialHistoryData({userId, token});
          if (res?.socialHistory?.length > 0) {
            setData({
              id: res?._id,
              occupation: res?.socialHistory[0]?.occupation,
              education: res?.socialHistory[0]?.education.field,
              placeOfBirth: res?.socialHistory[0]?.placeOfBirth,
              maritalStatus: res?.socialHistory[0]?.maritalStatus,
              children: res?.socialHistory[0]?.numberOfChildren,
              religion: res?.socialHistory[0]?.religion,
              diet: res?.socialHistory[0]?.diet,
              sex: res?.socialHistory[0]?.sexualOrientation,
              isSmoke: res?.socialHistory[0]?.isSmoke ? 'Yes' : 'No',
              consumeAlcohol: res?.socialHistory[0]?.consumeAlcohol
                ? 'Yes'
                : 'No',
              substance: res?.socialHistory[0]?.useOfOtherSubstances,
              exercise: res?.socialHistory[0]?.doYouExercise,
              stressFactor: res?.socialHistory[0]?.stressFactor,
              spokenLanguages: res?.socialHistory[0]?.spokenLanguage,
            });
            console.log(res?.socialHistory[0]?.education);
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
              isSmoke: '',
              consumeAlcohol: '',
              substance: '',
              exercise: '',
              stressFactor: '',
              spokenLanguages: '',
            });
          }
          setId(data.id);
        } catch (error) {
          console.error('Error fetching social history data:', error);
        }
      };
      getData();
    }
  }, [userId, token]);

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
                <DetailItems name="Education" value={data.education || ''} />
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
                <DetailItems name="Do you smoke?" value={data.isSmoke || ''} />
                <DetailItems
                  name="Do you consume alcohol?"
                  value={data.consumeAlcohol || ''}
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
        emptyHomeMessage="You have not added any social history yet"
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
});
