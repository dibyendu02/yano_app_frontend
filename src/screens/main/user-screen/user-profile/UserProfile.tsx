/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  FlatList,
  ScrollView,
  Share,
} from 'react-native';
import React, {useContext, useState} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Foundation from 'react-native-vector-icons/Foundation';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import {userData} from '../../../../test/Data';
import Header from '../../../../components/header/Header';
import {EditIcon} from '../../../../assets/icon/IconNames';
import Card from '../../../../components/cards/Card';
import {DummyImage} from '../../../../assets/dummy/images';
import {navigate} from '../../../../navigation/RootNavigation';
import {Colors} from '../../../../constants/Colors';
import PatientElements from '../../../../components/PatientElements';
import Icons from '../../../../assets/icon/Icon';
import FilledButton from '../../../../components/buttons/FilledButton';
import BottomSheet from '../../../../components/bottom-sheet/BottomSheet';
import {CardStyles} from '../../../../components/cards/CardStyle';
import Badge from '../../../../components/Badge';
import ShareButton from './ShareButton';
import {StaticImage} from '../../../../assets/images';
import UserContext from '../../../../contexts/UserContext';
import {useNavigation} from '@react-navigation/native';
import {staticIcons} from '../../../../assets/image';

const menuData = [
  {
    id: '1',
    icon: (
      <Icons.MaterialIcons
        name="receipt-long"
        size={25}
        color={Colors.LightGreen}
      />
    ),
    text: 'Medical history',
    path: 'MedicalHistory',
  },
  {
    id: '2',
    icon: (
      <Image
        source={StaticImage.FamilyIcon}
        style={{height: 20, width: 20, marginRight: 3}}
      />
    ),
    text: 'Family link',
    path: 'UserFamilyMembers',
  },
  {
    id: '4',
    icon: <Icons.FontAwesome name="gear" size={25} color={Colors.LightGreen} />,
    text: 'Settings',
    path: 'Settings',
  },
  {
    id: '3',
    icon: (
      <Image
        source={StaticImage.QuestionIcon}
        style={{height: 20, width: 18, marginRight: 3}}
      />
    ),
    text: "Yano's support",
    path: 'YanoSupport',
  },
];

const onShare = async () => {
  try {
    const result = await Share.share({
      message: 'Join me on Yano',
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    // alert(error.message);
  }
};

export default function () {
  const [showQR, setShowQR] = useState(false);
  const {userData} = useContext(UserContext);

  const calculateAge = dateString => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // If the birth month hasn't occurred yet this year, subtract one from the age.
    // Or, if it is the birth month but the day hasn't occurred yet this year, subtract one from the age.
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  let data1 = [
    {
      label: userData?.gender,
      icon: (
        <Foundation
          name={userData?.gender == 'Male' ? `male-symbol` : `female-symbol`}
          size={20}
          color={'#76BC21'}
        />
      ),
    },
    {
      label: calculateAge(userData?.dateOfBirth || '60'),
      icon: (
        <Image
          source={StaticImage.CalenderIcon}
          style={{height: 20, width: 20, tintColor: Colors.LightGreen}}
        />
      ),
      unit: 'years',
    },
    {
      label: userData?.bloodType,
      icon: (
        <Image source={StaticImage.BloodIcon} style={{height: 20, width: 20}} />
      ),
    },
  ];

  let data2 = [
    {
      label: userData?.height,
      icon: <MaterialIcons name="height" size={20} color={'#76BC21'} />,
      unit: 'cm',
    },
    {
      label: userData?.weight,
      icon: <Foundation name="female-symbol" size={20} color={'#76BC21'} />,
      unit: 'kg',
    },
  ];
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="My profile"
        headerRightComponent={
          <TouchableOpacity
            onPress={() => navigation.navigate('EditPatientProfile')}>
            {/* <EditIcon /> */}
            <Image
              source={staticIcons.EditPencil}
              style={{height: 26, width: 24}}
            />
          </TouchableOpacity>
        }
        showBackIcon={false}
      />

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <Card contentContainerStyle={{marginTop: 12, marginBottom: 8}}>
          <Image
            source={{uri: userData?.userImg?.secure_url} || DummyImage.user}
            style={{
              height: 80,
              width: 80,
              borderRadius: 40,
              marginTop: 2,
            }}
          />
          <Text style={styles.patientName}>
            {userData.firstName} {userData.lastName}
          </Text>
          <View style={styles.detailRow}>
            {data1.map((e, i, a) => (
              <View style={styles.detailItem} key={e.label}>
                {e.icon}
                <Text style={styles.detailText}>{e.label}</Text>
                <Text style={[styles.detailText, {marginLeft: 0}]}>
                  {e?.unit}
                </Text>
                {i < a.length - 1 && <View style={styles.separator} />}
              </View>
            ))}
          </View>

          <View style={styles.detailRow}>
            {data2.map((e, i, a) => (
              <View style={styles.detailItem} key={e.label}>
                {e.icon}
                <Text style={styles.detailText}>{e.label}</Text>
                <Text style={[styles.detailText, {marginLeft: 0}]}>
                  {e.unit}
                </Text>
                {i < a.length - 1 && <View style={styles.separator} />}
              </View>
            ))}
          </View>

          <View style={styles.horizontalSeparator} />

          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'center',
              paddingHorizontal: 14,
              paddingTop: 14,
            }}>
            <ShareButton
              label="Share profile"
              type="blue"
              style={{width: '85%'}}
              onPress={onShare}
              icon={
                <Icons.EvilIcons
                  name="share-google"
                  size={30}
                  color={Colors.White}
                />
              }
            />
            <TouchableOpacity
              onPress={() => setShowQR(true)}
              style={{
                width: '18%',
                backgroundColor: Colors.LightGray,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 8,
                marginVertical: 5,
                marginLeft: 8,
              }}>
              <Image
                source={StaticImage.QrCode}
                style={{
                  width: 20,
                  height: 20,
                }}
              />
            </TouchableOpacity>
          </View>
        </Card>

        <View style={CardStyles.container}>
          <FlatList
            data={menuData}
            style={{
              paddingLeft: 20,
              paddingRight: 13,
              paddingVertical: 10,
            }}
            renderItem={({item, index: _i}) => (
              <TouchableOpacity
                onPress={() => navigate(item.path)}
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 14,
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  {item.icon}
                  <Text
                    style={{
                      color: Colors.Blue,
                      fontSize: 18,
                      // fontWeight: '800',
                      fontWeight: '600',
                      marginLeft: 14,
                    }}>
                    {item.text}
                  </Text>
                </View>
                <Icons.MaterialIcons
                  name="navigate-next"
                  size={30}
                  color={Colors.Blue}
                />
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => <View style={styles.separate} />}
          />
        </View>
      </ScrollView>
      <BottomSheet isVisible={showQR} onBackdropPress={() => setShowQR(false)}>
        <View style={{padding: 20, alignItems: 'center'}}>
          <View
            style={{
              padding: 5,
            }}>
            <Text
              style={{
                fontFamily: 'Roboto',
                fontSize: 20,
                fontWeight: '700',
                color: Colors.Blue,
              }}>
              Share QR code
            </Text>
          </View>
          <Image source={DummyImage.QR} style={{width: 150, height: 150}} />
          <Text
            style={{
              marginVertical: 20,
              color: Colors.Blue,
              textAlign: 'center',
              fontSize: 15,
            }}>
            Scan this QR code with your health provider's or family member's
            cell phone so that they have access to your measurements and health
            history.
          </Text>
          <FilledButton
            type="blue"
            label="Done"
            onPress={() => setShowQR(false)}
          />
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  body: {
    flex: 1,
    backgroundColor: Colors.GhostWhite,
  },
  separate: {
    backgroundColor: Colors.LightGray,
    height: 1,
    width: '100%',
  },
  separator: {
    width: 1.4,
    height: 20,
    backgroundColor: '#E9E9E9',
    marginHorizontal: 8,
  },
  horizontalSeparator: {
    width: '120%',
    height: 1.4,
    backgroundColor: '#e9e9e9',
    marginTop: 10,
  },
  secondContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'space-between',
    padding: 20,
  },
  patientProfileDetails: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    width: '100%',
  },
  patientName: {
    color: Colors.Blue,
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    marginVertical: 6,
  },
  detailRow: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    color: Colors.SteelBlue,
    fontSize: 16,
    marginHorizontal: 6,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00263E',
    borderRadius: 8,
    width: '100%',
    height: 50,
    marginTop: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 10,
    alignItems: 'center',
  },
  basicDetails: {
    alignItems: 'center',
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
  },
  stopMonitoringButton: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'red',
    alignSelf: 'center',
    padding: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
    height: 60,
  },
  monintoring: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'red',
    marginLeft: 5,
  },
});
