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
import React, {useState} from 'react';
import {Colors} from '../../../constants/Colors';
import Header from '../../../components/header/Header';
import {DeleteIcon, EditIcon} from '../../../assets/icon/IconNames';
import DetailItems from '../components/DetailItems';
import CommonHeader from '../components/CommonHeader';
import {staticIcons} from '../../../assets/image';
import Card from '../../main/my-profile/UiUpdateComponents/Card';

const MedicineDetails = ({navigation, route}: any) => {
  const [isClicked, setIsClicked] = useState(false);
  if (!route || !route.params) {
    Alert.alert('Error', 'Data not passed or invalid data passed');
    return navigation.goBack();
  }
  const data = route.params.data;
  const {
    name,
    volume,
    unit,
    medicine,
    field4, // Intake method
    field5, // Dose Quantity
    field6, // When
    field7, // Other instructions
    field8, // Duration begins at
    field9, // Unchanged, potentially related to a date
    field10, // Unchanged, potentially related to a date
    field11, // Additional Information: Medicine taken for (boolean)
    field12, // Prescribed by
    field13, // Side effects
    field14, // Medicamento (Additional field)
  } = data;

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
            onPress={() => navigation.navigate('AddAndEditMedicine', {data})}>
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
            <DetailItems name="Medicine form" value={medicine} />
            <DetailItems name="Medicine strength" value={volume + unit} />
            <DetailItems name="Intake method" value={field4} />
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
            <DetailItems name="Quantity" value={field5} />
            <DetailItems name="When" value={field6} />
            <DetailItems name="Other instructions" value={field7} />
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
              value={new Date(field10).toDateString()}
            />
            <DetailItems name="Until" value={new Date(field9).toDateString()} />
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
            <DetailItems name="Medicine taken for" value={field12} />
            <DetailItems name="Prescribed by" value={field13} />
            <DetailItems name="Side effects" value={field14} />
            {/* <DetailItems name="Additional Info" value={field14} /> */}
          </View>
        </View>
      </ScrollView>
      {isClicked && (
        <View style={styles.deletbuttonclick}>
          <Card
            title={'Delete medication'}
            children={'Are you sure you want to remove this medication?'}
            active={setIsClicked}
            action={() => navigation.goBack()}
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
