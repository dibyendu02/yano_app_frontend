import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Colors} from '../../../constants/Colors';
import Header from '../../../components/header/Header';
import {DeleteIcon, EditIcon} from '../../../assets/icon/IconNames';
import DetailItems from '../components/DetailItems';
import CommonHeader from '../components/CommonHeader';
import {Image} from 'react-native';
import {staticIcons} from '../../../assets/image';

const HospitalizationDetails = ({navigation, route}: any) => {
  if (!route || !route.params) {
    Alert.alert('Error', 'Data not passed or invalid data passed');
    return navigation.goBack();
  }
  const data = route.params.data;
  const {name, reason, dischargeDate, admissionDate, doctorName} = data;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.GhostWhite,
        position: 'relative',
      }}>
      <CommonHeader
        title={name}
        rightComp1={
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('AddAndEditHospitalization', {data})
            }>
            <Image
              source={staticIcons.EditPencil}
              style={{height: 22, width: 22}}
            />
          </TouchableOpacity>
        }
        rightComp2={
          <TouchableOpacity>
            <Image
              source={staticIcons.DeleteIcon}
              style={{height: 22, width: 22}}
            />
          </TouchableOpacity>
        }
      />
      <ScrollView>
        <View style={{paddingVertical: 12, width: '94%', margin: 'auto'}}>
          <View style={styles.boxStyle}>
            <DetailItems name="Name of the hospital" value={name} />
            <DetailItems name="Reason for hospitalization" value={reason} />
            <DetailItems
              name="Admission date"
              value={new Date(admissionDate).toDateString()}
            />
            <DetailItems name="Discharge date" value={doctorName} />
            <DetailItems
              name="Name of attending physician"
              value={doctorName}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HospitalizationDetails;

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
