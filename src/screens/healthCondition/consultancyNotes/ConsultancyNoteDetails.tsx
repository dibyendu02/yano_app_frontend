import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Colors} from '../../../constants/Colors';
import {DownloadIcon} from '../../../assets/icon/IconNames';
import DetailItems from '../components/DetailItems';
import CommonHeader from '../components/CommonHeader';

const ConsultancyNotesDetails = ({navigation, route}: any) => {
  if (!route || !route.params) {
    Alert.alert('Error', 'Data not passed or invalid data passed');
    return navigation.goBack();
  }
  const data = route.params.data;
  const {name, date, time, note, recommendation, attendedBy} = data;

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
          <TouchableOpacity>
            <DownloadIcon />
          </TouchableOpacity>
        }
        customStyle={{paddingVertical: 12,paddingTop: 55}}
      />
      <ScrollView>
        <View style={{paddingTop: 12, width: '94%', margin: 'auto'}}>
          <View style={styles.boxStyle}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                marginBottom: 15,
                color: Colors.Blue,
              }}>
              Consultation note
            </Text>
            <DetailItems name="Consultation date" value={date} />
            <DetailItems name="Consultation time" value={time} />
            <DetailItems name="Note" value={note} />
            <DetailItems name="Recommendations" value={recommendation} />
            <DetailItems
              name="Attended by"
              value={attendedBy}
              customtitleStyle={{fontWeight: 'regular'}}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ConsultancyNotesDetails;

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
