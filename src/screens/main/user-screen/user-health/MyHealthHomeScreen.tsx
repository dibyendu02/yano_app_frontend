import React, {useContext, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  PermissionsAndroid, // Import for Android permissions
  Alert,
} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions'; // Import for handling permissions
import CommonLayout from '../../../../components/CommonLayout';
import Header from '../../../../components/header/Header';
import {
  IconName,
  NotificationIcon,
  PlusIcon,
} from '../../../../assets/icon/IconNames';
import {Colors} from '../../../../constants/Colors';
import Icons from '../../../../assets/icon/Icon';
import Card from '../../../../components/cards/Card';
import {navigate} from '../../../../navigation/RootNavigation';
import {measurements} from '../../../../test/Data';
import FilledButton from '../../../../components/buttons/FilledButton';
import BottomSheet from '../../../../components/bottom-sheet/BottomSheet';
import {StaticImage} from '../../../../assets/images';
import MeasuringYourVitalComp from './MeasuringYourVitalComp';
import OutlineButton from '../../../../components/buttons/OutlineButton';
import UserContext from '../../../../contexts/UserContext';
import moment from 'moment';
import {healthParameterDetailsN, HSDGN} from '../../../../test/HealthStatsData';
import {useIsFocused} from '@react-navigation/native';
const requestPermissions = async () => {
  try {
    // Request location and camera permissions for Android
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);

      if (
        granted['android.permission.ACCESS_FINE_LOCATION'] !==
          PermissionsAndroid.RESULTS.GRANTED ||
        granted['android.permission.CAMERA'] !==
          PermissionsAndroid.RESULTS.GRANTED ||
        granted['android.permission.RECORD_AUDIO'] !==
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        // Alert.alert(
        //   'Permission Denied',
        //   'All permissions are required to proceed.',
        // );
        return false;
      }
    } else if (Platform.OS === 'ios') {
      // Request location and camera permissions for iOS
      const locationPermission = await request(
        PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      );
      const cameraPermission = await request(PERMISSIONS.IOS.CAMERA);
      const microphonePermission = await request(PERMISSIONS.IOS.MICROPHONE);

      if (
        locationPermission !== RESULTS.GRANTED ||
        cameraPermission !== RESULTS.GRANTED ||
        microphonePermission !== RESULTS.GRANTED
      ) {
        Alert.alert(
          'Permission Denied',
          'All permissions are required to proceed.',
        );
        return false;
      }
    }
    return true;
  } catch (err) {
    console.warn(err);
    return false;
  }
};
const MyHealthHomeScreen = ({navigation}) => {
  const [show, setShow] = useState(false);
  const [selectedDiv, setSelectedDiv] = useState(null);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const {userData} = useContext(UserContext);
  console.log(userData);

  const handleDivPress = div => {
    setSelectedDiv(div);
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    const checkPermissions = async () => {
      const permissionsGranted = await requestPermissions();
      // if (!permissionsGranted) {
      //   // If permissions are not granted, navigate back or show a message
      //   Alert.alert(
      //     'Permissions Required',
      //     'Please enable all permissions to use this feature.',
      //   );
      // }
    };

    checkPermissions();
  }, []);

  useEffect(() => {
    console.log('it runs');
    if (Platform.OS === 'android') {
      if (isFocused) {
        StatusBar.setBarStyle('dark-content');
        StatusBar.setBackgroundColor('transparent');
        StatusBar.setTranslucent(true);
      }
    }
  }, [isFocused]);

  useEffect(() => {
    console.log('it runs');
    if (Platform.OS === 'android') {
      if (show) {
        StatusBar.setBackgroundColor('rgba(0,0,0,0.3)');
        StatusBar.setTranslucent(true);
      } else {
        StatusBar.setBackgroundColor('transparent');
        StatusBar.setTranslucent(true);
      }
    }
  }, [show]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.GhostWhite,
        position: 'relative',
      }}>
      <Header
        showBackIcon={false}
        title={`Hi, ${userData?.firstName}`}
        headerRightComponent={
          <TouchableOpacity
            onPress={() => navigate('NotificationAlerts')}
            style={{position: 'relative'}}>
            <NotificationIcon size={24} color={Colors.Blue} />
            <View
              style={{
                position: 'absolute',
                width: 10,
                height: 10,
                borderRadius: 6,
                backgroundColor: Colors.Red,
                right: 2,
                top: 0,
              }}></View>
          </TouchableOpacity>
        }
      />
      <ScrollView
        onScrollBeginDrag={() => setIsButtonVisible(false)}
        onScrollEndDrag={() => setIsButtonVisible(true)}
        style={{paddingVertical: 12, width: '94%', margin: 'auto'}}>
        <View>
          <View style={styles.container}>
            <Text style={styles.title}>Do you have one of our devices?</Text>
            <Text style={styles.para}>
              Connect your Yano device and start taking control of your health.
            </Text>
            <OutlineButton
              type="blue"
              icon={<PlusIcon size={16} color={Colors.Blue} />}
              label="Connect device"
              onPress={() => navigate('ChooseDevice')}
              style={{
                marginTop: 10,
                width: '88%',
                marginHorizontal: 'auto',
                paddingVertical: 12,
              }}
            />
          </View>
          <MeasuringYourVitalComp
            element={
              <View
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#16967633',
                }}>
                <Icons.MaterialIcons
                  name="monitor-heart"
                  size={40}
                  color={Colors.Green}
                />
              </View>
            }
            title="Measure your vital signs"
            subtitle="Choose a device and start monitoring your health."
            onPress={() => {
              navigation.navigate('MyDevices');
            }}
          />
        </View>
        <Card
          title="Your last measurements"
          cardFooter={
            <TouchableOpacity
              style={{
                borderTopWidth: 1,
                borderTopColor: Colors.LightGray,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 16,
              }}
              onPress={() => navigate('HealthParametersList')}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  fontFamily: 'Roboto',
                  color: Colors.SteelBlue,
                }}>
                See More
              </Text>
            </TouchableOpacity>
          }
          contentContainerStyle={{
            marginVertical: 12,
            width: '100%',
          }}>
          <FlatList
            data={
              HSDGN[0].data.length >= 2
                ? HSDGN[0].data.filter((e, i) => i < 2)
                : []
            }
            scrollEnabled={false}
            style={{width: '100%'}}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={{
                  width: '100%',
                  paddingVertical: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
                onPress={() =>
                  navigate('HealthParameterDetail', {
                    //@ts-ignore
                    healthParameterDetail: healthParameterDetailsN[item.field],
                  })
                }>
                <View style={{width: '50%'}}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: Colors.Blue,
                      fontWeight: 'bold',
                      marginBottom: 4,
                    }}>
                    {item.field_full}
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      fontFamily: 'Roboto',
                      color: Colors.SteelBlue,
                    }}>
                    {moment(item.timestamp).format('M/D/YYYY - h:mm A')}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    width: '30%',
                    marginRight: 14,
                  }}>
                  {item.measurements.map(itm => (
                    <Text
                      style={{
                        fontSize: 18,
                        fontFamily: 'Roboto',
                        marginBottom: 4,
                        fontWeight: Platform.OS === 'android' ? 'bold' : '600',
                        color: Colors.Blue,
                      }}
                      key={itm.unit}>
                      {itm.value}{' '}
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: 'Roboto',
                          fontWeight: 'light',
                          color: Colors.SteelBlue,
                        }}>
                        {itm.unit}
                      </Text>
                    </Text>
                  ))}
                </View>

                <Icons.AntDesign
                  name={index === 0 ? 'checkcircleo' : 'checkcircle'}
                  color={Colors.Green}
                  size={22}
                />
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  height: 1,
                  width: '100%',
                  backgroundColor: Colors.LightGray,
                  alignSelf: 'center',
                }}
              />
            )}
          />
        </Card>
      </ScrollView>
      {isButtonVisible && (
        <FilledButton
          type="blue"
          label="Consultation 24/7"
          icon={
            <Icons.MaterialIcons
              name="health-and-safety"
              size={16}
              color={Colors.White}
            />
          }
          onPress={() => setShow(true)}
          style={styles.addBtn}
        />
      )}
      <BottomSheet isVisible={show} onBackdropPress={() => setShow(false)}>
        <View style={{paddingHorizontal: '6%', paddingTop: 12}}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: '500',
              color: Colors.Blue,
              marginBottom: 12,
            }}>
            Consultation 24/7
          </Text>
          <View
            style={{
              backgroundColor: Colors.GhostWhite,
              paddingHorizontal: 8,
              paddingVertical: 10,
              borderRadius: 10,
            }}>
            <Text style={{fontSize: 16, color: Colors.SteelBlue}}>
              Este servicio no está hecho para emergencias. Sí cree que está
              teniendo una, por favor contacte a{' '}
              <Text style={{color: Colors.Red, fontWeight: '600'}}>
                Emergencias
              </Text>
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              style={[
                styles.divContainer,
                {
                  borderColor:
                    selectedDiv === 'phone'
                      ? Colors.LightGreen
                      : Colors.GhostWhite,
                },
              ]}
              onPress={() => handleDivPress('phone')}>
              <Image
                source={StaticImage.CallIcon}
                style={{width: 30, height: 30, objectFit: 'contain'}}
              />
              <Text style={styles.divTitle}>Call from the phone</Text>
              <Text style={styles.divSubtitle}>
                *May carry costs with your operator.
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.divContainer,
                {
                  borderColor:
                    selectedDiv === 'video'
                      ? Colors.LightGreen
                      : Colors.GhostWhite,
                },
              ]}
              onPress={() => handleDivPress('video')}>
              <Image
                source={StaticImage.VideoCallIcon}
                style={{width: 30, height: 30, objectFit: 'contain'}}
              />
              <Text style={styles.divTitle}>Receive a video consultation</Text>
            </TouchableOpacity>
          </View>
          <View>
            <FilledButton
              label={'Continue'}
              type={'blue'}
              style={{width: '100%', alignSelf: 'center', marginTop: 20}}
              onPress={() => {
                setShow(false);
                navigation.navigate('VideoCallStart');
              }}
              activeOpacity={0.8}
              disabled={!selectedDiv} // Disable if no option is selected
            />
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

export default MyHealthHomeScreen;

const styles = StyleSheet.create({
  addBtn: {
    width: 200,
    position: 'absolute',
    bottom: 12,
    right: 16,
  },
  container: {
    backgroundColor: Colors.White,
    padding: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.Blue,
    marginBottom: 6,
    textAlign: 'center',
  },
  para: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.SteelBlue,
    marginBottom: 10,
    marginHorizontal: 15,
  },
  divContainer: {
    padding: 20,
    width: '48%',
    flexDirection: 'column',
    gap: 5,
    borderColor: Colors.GhostWhite,
    borderWidth: 2,
    borderRadius: 10,
  },
  divTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.Blue,
  },
  divSubtitle: {
    color: Colors.SteelBlue,
    fontSize: 12,
  },
});
