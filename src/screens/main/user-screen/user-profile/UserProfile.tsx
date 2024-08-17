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
  console.log(userData);

  console.log(userData?.userImg?.secure_url);

  const formatDateOfBirth = dateString => {
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  let data1 = [
    {
      label: userData.gender,
      icon: <Foundation name="female-symbol" size={20} color={'#76BC21'} />,
    },
    {
      label: formatDateOfBirth(userData.dateOfBirth || '1985-05-15'),
      icon: (
        <Image
          source={StaticImage.CalenderIcon}
          style={{height: 20, width: 20, tintColor: Colors.LightGreen}}
        />
      ),
    },
    {
      label: userData.bloodType,
      icon: (
        <Image source={StaticImage.BloodIcon} style={{height: 20, width: 20}} />
      ),
    },
  ];

  let data2 = [
    {
      label: userData.height,
      icon: <MaterialIcons name="height" size={20} color={'#76BC21'} />,
    },
    {
      label: userData.weight,
      icon: <Foundation name="female-symbol" size={20} color={'#76BC21'} />,
    },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="My profile"
        headerRightComponent={
          <TouchableOpacity>
            {/* <EditIcon /> */}
            <Image
              source={require('../../../../assets/image/EditPencil.png')}
              style={{height: 26, width: 24}}
            />
          </TouchableOpacity>
        }
        showBackIcon={false}
      />

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <Card>
          <Image
            source={{uri: userData?.userImg?.secure_url || DummyImage.user}}
            style={{
              height: 80,
              width: 80,
              borderRadius: 40,
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
                {i < a.length - 1 && <View style={styles.separator} />}
              </View>
            ))}
          </View>

          <View style={styles.detailRow}>
            {data2.map((e, i, a) => (
              <View style={styles.detailItem} key={e.label}>
                {e.icon}
                <Text style={styles.detailText}>{e.label}</Text>
                {i < a.length - 1 && <View style={styles.separator} />}
              </View>
            ))}
          </View>
          {/* <Badge
            icon={
              <Icons.MaterialIcons
                name="health-and-safety"
                size={18}
                color={Colors.Blue}
              />
            }
            text="Healthcare provider: Dr. Eduardo Escobar"
          /> */}
          {/* <Badge
            icon={
              <Icons.MaterialIcons
                name="diversity-3"
                size={18}
                color={Colors.Blue}
              />
            }
            text="Mother of: Pedro Anzola"
            color="#B8DAFF"
          /> */}

          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'center',
              padding: 14,
            }}>
            <ShareButton
              label="Share Profile"
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
            {/* <FilledButton
              type="lightGrey"
              style={{width: '18%', marginLeft: 8}}
              icon={
                // <Icons.AntDesign name="qrcode" color={Colors.Blue} size={25} />
                <Image
                  source={StaticImage.QrCode}
                  style={{width: 20, height: 20}}
                />
              }
              onPress={() => setShowQR(true)}
            /> */}
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
              paddingHorizontal: 20,
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
