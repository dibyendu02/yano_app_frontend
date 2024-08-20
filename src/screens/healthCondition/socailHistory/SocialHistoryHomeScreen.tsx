import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {Colors} from '../../../constants/Colors';
import DetailItems from '../components/DetailItems';
import CommonHomeScreen2 from '../components/CommonHomeScreen2';

const SocialHistoryHomeScreen = ({navigation}: any) => {
  const data = {
    occupation: 'Engineer',
    education: 'Msc',
    placeOfBirth: 'New York',
    maritalStatus: 'Married',
    children: 2,
    religion: 'Hindu',
    diet: 'Omnivoro',
    sex: 'Hetereosexual',
    isSmoke: 'No',
    consumeAlcohol: 'No',
    substance: 'None',
    exercise: 'Jogging',
    stressFactor: 'Relaxed',
    spokenLanguages: 'Inglés, francés y espYearl',
  };

  return (
    <>
      <CommonHomeScreen2
        data={data}
        navigation={navigation}
        heading="Social History"
        component={
          <ScrollView>
            <View style={{paddingVertical: 12, width: '94%', margin: 'auto'}}>
              <View style={styles.boxStyle}>
                <DetailItems name="Occupation" value={data.occupation} />
                <DetailItems name="Education" value={data.education} />
                <DetailItems name="Place of birth" value={data.placeOfBirth} />
                <DetailItems name="Marital status" value={data.maritalStatus} />
                <DetailItems name="Number of children" value={data.children} />
                <DetailItems name="Religion" value={data.religion} />
                <DetailItems name="Diet" value={data.diet} />
                <DetailItems name="Sexual orientation" value={data.sex} />
                <DetailItems name="Do you smoke?" value={data.isSmoke} />
                <DetailItems
                  name="Do you consume alcohol?"
                  value={data.consumeAlcohol}
                />
                <DetailItems
                  name="Use of other substances"
                  value={data.substance}
                />
                <DetailItems name="Do you exercise?" value={data.exercise} />
                <DetailItems name="Stress factor" value={data.stressFactor} />
                <DetailItems
                  name="Spoken languages"
                  value={data.spokenLanguages}
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
    paddingVertical: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
});
