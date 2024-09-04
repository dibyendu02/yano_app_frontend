import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../../constants/Colors';
import CommonHeader from '../components/CommonHeader';
import EmptyScreen from '../components/EmptyScreen';
import HomeItems from '../components/HomeItems';

const ConsultancyNotes = ({navigation}: any) => {
  const data = [
    {
      id: 1,
      name: 'CONV171122',
      date: '17/11/2022',
      time: '3:24 PM',
      note: 'Presents vomiting, dizziness and general malaise.',
      recommendation: 'Take acetaminophen every 8 hours for 4 days.',
      attendedBy: 'Dr. Carlos Roa',
    },
    {
      id: 2,
      name: 'CONV120922',
      title: 'Consultation Note 2',
      date: '12/12/2021',
      time: '4:00 PM',
      note: 'He reports severe cough and loss of appetite.',
      recommendation: 'Take acetaminophen every 8 hours for 4 days.',
      attendedBy: 'Dr. John Doe',
    },
  ];
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.GhostWhite,
        position: 'relative',
      }}>
      <CommonHeader title={'Consultation notes'} customStyle={{ paddingTop: 55}} />
      {data && data.length > 0 ? (
        <HomeItems
          data={data}
          path={'ConsultationNotesDetails'}
          navigation={navigation}
        />
      ) : (
        <EmptyScreen
          title={'No Consultation Notes'}
          message={'There are no consultation notes available'}
        />
      )}
    </View>
  );
};

export default ConsultancyNotes;
