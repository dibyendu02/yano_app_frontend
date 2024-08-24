import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from '../../constants/Colors';
import Header from '../../components/header/Header';
import {DeleteIcon, EditIcon} from '../../assets/icon/IconNames';
import DetailItems from './components/DetailItems';
import CommonHeader from './components/CommonHeader';
import {staticIcons} from '../../assets/image';
import Card from '../main/my-profile/UiUpdateComponents/Card';

const HealthConditionDetails = ({navigation, route}: any) => {
  const [isClicked, setIsClicked] = useState(false);
  if (!route || !route.params) {
    Alert.alert('Error', 'Data not passed or invalid data passed');
    return navigation.goBack();
  }
  const data = route.params.data;
  const {name, date, status, treatedBy, medicine, additionalNotes} = data;
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
            onPress={() => navigation.navigate('AddHealthCondition', {data})}>
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
        customStyle={{paddingVertical: 12}}
      />
      <ScrollView>
        <View style={{paddingVertical: 12, width: '94%', margin: 'auto'}}>
          <View style={styles.boxStyle}>
            <DetailItems name="Name of the health condition" value={name} />
            <DetailItems name="Date of diagnosis" value={date} />
            <DetailItems name="Status" value={status} />
            <DetailItems name="Treated by" value={treatedBy} />
            <DetailItems name="Medicine" value={medicine} />
            <DetailItems name="Additional notes" value={additionalNotes} />
          </View>
        </View>
      </ScrollView>
      {isClicked && (
        <View style={styles.deletbuttonclick}>
          <Card
            title={'Delete health condition'}
            children={
              'Are you sure you want to eliminate this health condition?'
            }
            active={setIsClicked}
            action={() => navigation.goBack()}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default HealthConditionDetails;

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
