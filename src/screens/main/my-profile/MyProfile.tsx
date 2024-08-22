/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Header from '../../../components/header/Header';
import {Colors} from '../../../constants/Colors';
import {CardStyles} from '../../../components/cards/CardStyle';
import FilledButton from '../../../components/buttons/FilledButton';
import BottomSheet from '../../../components/bottom-sheet/BottomSheet';
import ShareButton from '../profile/ShareProfileButton';
import {StaticImage} from '../../../assets/images';
import {staticIcons} from '../../../assets/image';
import {retrieveData} from '../../../utils/Storage';
import axios from 'axios';
import {BASE_URL} from '../../../../App';
import Icons from '../../../assets/icon/Icon';
import {DummyImage} from '../../../assets/dummy/images';
import UserContext from '../../../contexts/UserContext';

const menuData = [
  {
    id: '1',
    icon: (
      <Image
        source={staticIcons.MeasurementTool}
        style={{height: 20, width: 20}}
      />
    ),
    text: 'Measurement tool',
    path: 'MeasurementTools',
  },
  {
    id: '2',
    icon: <Icons.FontAwesome name="gear" size={25} color={Colors.LightGreen} />,
    text: 'Settings',
    path: 'Settings',
  },
  {
    id: '3',
    icon: (
      <Icons.MaterialCommunityIcons
        name="comment-question"
        size={25}
        color={Colors.LightGreen}
      />
    ),
    text: "Yano's support",
    path: 'YanoSupport',
  },
];

const MyProfile = ({navigation}: any) => {
  const [showQR, setShowQR] = useState(false);

  const {userData} = useContext(UserContext);
  console.log(userData);

  // const [userId, setUserId] = useState('');
  // const [userData, setUserData] = useState(null);

  // const fetchDoctorData = async () => {
  //   try {
  //     const response = await axios.get(`${BASE_URL}/api/userdoctor/${userId}`);
  //     console.log('API Response:', response.data);
  //     setUserData(response.data.userData);
  //   } catch (error: any) {
  //     console.error('API Error:', error);
  //     if (error.response) {
  //       console.log('Server Error Response:', error.response.data);
  //     } else if (error.request) {
  //       console.log('No response received:', error.request);
  //     } else {
  //       console.log('Error', error.message);
  //     }
  //   }
  // };

  // const gettingUserId = async () => {
  //   try {
  //     const data = await retrieveData('userId');
  //     console.log('Retrieved UserId:', data);
  //     setUserId(data);
  //   } catch (error) {
  //     console.error('Error retrieving UserId:', error);
  //   }
  // };

  // useEffect(() => {
  //   gettingUserId();
  // }, []);

  // useEffect(() => {
  //   if (userId) {
  //     fetchDoctorData();
  //   }
  // }, [userId]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <BottomSheet isVisible={showQR} onBackdropPress={() => setShowQR(false)}>
        <View style={{padding: 20, alignItems: 'center'}}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'medium',
              color: Colors.Blue,
              marginBottom: 10,
            }}>
            Share QR Code
          </Text>
          <Image source={DummyImage.QR} style={{width: 150, height: 150}} />
          <Text
            style={{
              marginVertical: 20,
              color: Colors.SteelBlue,
              textAlign: 'center',
            }}>
            Scan this QR code with your patient's cell phone to access their
            measurements and health history.
          </Text>
          <FilledButton
            type="blue"
            label="Done"
            onPress={() => setShowQR(false)}
          />
        </View>
      </BottomSheet>
      <Header
        title="My profile"
        showBackIcon={false}
        headerRightComponent={
          <TouchableOpacity
            onPress={() => navigation.navigate('EditDoctorProfile')}>
            <Image
              source={staticIcons.EditPencil}
              style={{height: 24, width: 24}}
            />
          </TouchableOpacity>
        }
      />
      <View style={{flex: 1, backgroundColor: Colors.GhostWhite}}>
        <View style={[CardStyles.container, {marginTop: 12}]}>
          <View
            style={{
              paddingBottom: 24,
              paddingTop: 16,
              width: '100%',
              alignItems: 'center',
            }}>
            <Image
              source={DummyImage.DoctorImg}
              height={80}
              width={80}
              style={{borderRadius: 40}}
            />
            <Text style={{color: Colors.Blue, fontSize: 18, fontWeight: '600'}}>
              Dr. {userData?.firstName} {userData?.lastName}
            </Text>
            <Text style={{color: Colors.SteelBlue}}>
              {userData?.speciality}
            </Text>
          </View>

          <View
            style={{
              width: '100%',
              height: 1,
              backgroundColor: Colors.LightGray,
            }}
          />
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'center',
              padding: 14,
            }}>
            <ShareButton
              label="Share profile"
              type="blue"
              style={{width: '75%'}}
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
              label=""
              style={{
                width: '18%',
                marginLeft: 8,
                flexDirection: 'row',
                justifyContent: 'center',
              }}
              icon={
                <Image
                  source={StaticImage.QrCode}
                  style={{
                    width: 20,
                    height: 20,
                  }}
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
        </View>

        <View style={[CardStyles.container, {marginVertical: 6}]}>
          <FlatList
            data={menuData}
            style={{paddingHorizontal: 20, paddingVertical: 10}}
            renderItem={({item, index: _i}) => (
              <TouchableOpacity
                onPress={() => navigation.navigate(item.path)}
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 14,
                  alignItems: 'center',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {item.icon}
                  <Text
                    style={{
                      color: Colors.Blue,
                      fontSize: 16,
                      fontWeight: '600',
                      marginLeft: 14,
                    }}>
                    {item.text}
                  </Text>
                </View>
                {/* <Icons.MaterialIcons
                  name="navigate-next"
                  size={30}
                  color={Colors.Blue}
                /> */}
                <Image
                  source={staticIcons.nextIcon}
                  style={{height: 12, width: 10, objectFit: 'contain'}}
                />
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  separator: {
    backgroundColor: Colors.LightGray,
    height: 1,
    width: '100%',
  },
});
