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
import {EditIcon} from '../../../assets/icon/IconNames';
import {Colors} from '../../../constants/Colors';
import {CardStyles} from '../../../components/cards/CardStyle';
import {DummyImage} from '../../../assets/dummy/images';
import FilledButton from '../../../components/buttons/FilledButton';
import Icons from '../../../assets/icon/Icon';
import BottomSheet from '../../../components/bottom-sheet/BottomSheet';
import ShareButton from './ShareProfileButton';
import UserContext from '../../../contexts/UserContext';
import {retrieveData} from '../../../utils/Storage';
import {BASE_URL} from '../../../../App';
import axios from 'axios';

const menuData = [
  {
    id: '1',
    icon: (
      <Icons.MaterialCommunityIcons
        name="toolbox"
        size={25}
        color={Colors.LightGreen}
      />
    ),
    text: 'Measurement Tool',
  },
  {
    id: '2',
    icon: <Icons.FontAwesome name="gear" size={25} color={Colors.LightGreen} />,
    text: 'Settings',
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
  },
];

const MyProfile = () => {
  let [showQR, setShowQR] = useState(false);
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState([]);
  // const {userData} = useContext(UserContext);
  // console.log(userData);

  const fetchDoctorData = async () => {
    const response = await axios.post(`${BASE_URL}api/userpatient/${userId}`);
    setUserData(response.data.userData);
  };

  const gettingUserId = async () => {
    const data = await retrieveData('userId');
    setUserId(data);
    console.log('userId ', userId);
  };
  useEffect(() => {
    gettingUserId();
  }, []);
  useEffect(() => {
    fetchDoctorData();
  }, [userId]);
  return (
    <SafeAreaView style={{flex: 1}}>
      <BottomSheet isVisible={showQR} onBackdropPress={() => setShowQR(false)}>
        <View style={{padding: 20, alignItems: 'center'}}>
          <Image source={DummyImage.QR} height={150} width={150} />
          <Text style={{marginVertical: 20}}>
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
        title="My Profile"
        showBackIcon={false}
        headerRightComponent={<EditIcon size={20} />}
      />
      <View style={{flex: 1, backgroundColor: Colors.GhostWhite}}>
        <View style={[CardStyles.container, {marginTop: 10}]}>
          <View
            style={{paddingVertical: 24, width: '100%', alignItems: 'center'}}>
            <Image
              source={DummyImage.DoctorImg}
              height={80}
              width={80}
              style={{borderRadius: 40}}
            />
            <Text style={{color: Colors.Blue, fontSize: 18, fontWeight: '600'}}>
              Dr. Eduardo Escobar
            </Text>
            <Text style={{color: Colors.SteelBlue}}>General medicine</Text>
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
              label="Share Profile"
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
            <FilledButton
              type="lightGrey"
              style={{width: '18%', marginLeft: 8}}
              icon={
                <Icons.AntDesign name="qrcode" color={Colors.Blue} size={25} />
              }
              onPress={() => setShowQR(true)}
            />
          </View>
        </View>

        <View style={CardStyles.container}>
          <FlatList
            data={menuData}
            style={{paddingHorizontal: 20, paddingVertical: 10}}
            renderItem={({item, index: _i}) => (
              <TouchableOpacity
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
                      marginLeft: 6,
                      fontFamily: 'Roboto',
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
