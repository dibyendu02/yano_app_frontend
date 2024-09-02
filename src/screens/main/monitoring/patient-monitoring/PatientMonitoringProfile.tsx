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
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PatientElements from '../../../../components/PatientElements';
import Header from '../../../../components/header/Header';
import {Colors} from '../../../../constants/Colors';
import Card from '../../../../components/cards/Card';
import {DummyImage} from '../../../../assets/dummy/images';
import {measurements, userData} from '../../../../test/Data';
import Icons from '../../../../assets/icon/Icon';
import {navigate} from '../../../../navigation/RootNavigation';
import {StaticImage} from '../../../../assets/images';
import {staticIcons} from '../../../../assets/image';
import CardLocal from './CardLocal';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {healthParameterDetailsN, HSDGN} from '../../../../test/HealthStatsData';

let data1 = [
  {
    label: userData.gender,
    icon: (
      <Foundation name="female-symbol" size={20} color={Colors.LightGreen} />
    ),
  },
  {
    label: userData.age,
    icon: (
      <Image
        source={StaticImage.CalenderIcon}
        style={{height: 20, width: 20, tintColor: Colors.LightGreen}}
      />
    ),
  },
  {
    label: userData.blood,
    icon: (
      <Image source={StaticImage.BloodIcon} style={{height: 20, width: 20}} />
    ),
  },
];

let data2 = [
  {
    label: userData.height,
    icon: <MaterialIcons name="height" size={20} color={Colors.LightGreen} />,
  },
  {
    label: userData.weight,
    icon: (
      <Foundation name="female-symbol" size={20} color={Colors.LightGreen} />
    ),
  },
];

export default function PatientMonitoringProfile({}) {
  const [isClicked, setIsClicked] = useState(false);
  const navigation = useNavigation();

  // useEffect(() => {
  //   console.log('data ');
  //   console.log(HSDGN[0]);
  // }, []);
  return (
    <View style={styles.container}>
      <Header title="Monitored patient" />

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <Card
        // contentContainerStyle={{backgroundColor: 'grey'}}
        >
          <Image
            source={DummyImage.user}
            style={{
              height: 80,
              width: 80,
              borderRadius: 40,
            }}
          />
          <Text style={styles.patientName}>María Clemente</Text>
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

          <View
            style={{
              // backgroundColor: 'red',
              width: '105%',
              borderTopWidth: 1,
              borderBlockColor: Colors.LightGray,
              marginTop: 10,
              padding: 10,
              height: 75,
            }}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigate('MeasurementTools')}>
              <Icons.MaterialIcons
                name="monitor-heart"
                size={20}
                color={Colors.White}
              />
              <Text style={styles.addButtonText}>Measure vital signs</Text>
            </TouchableOpacity>
          </View>
        </Card>

        <Card
          title="Last Measurements"
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
              onPress={() => navigate('PatientHealthParameters')}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  fontFamily: 'Roboto',
                  color: Colors.SteelBlue,
                }}>
                See more
              </Text>
            </TouchableOpacity>
          }>
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

        <Card contentContainerStyle={{marginBottom: 50}}>
          <View style={{width: '100%'}}>
            <TouchableOpacity onPress={() => navigate('MedicalHistory')}>
              <View style={[styles.container1, {paddingTop: 8}]}>
                <Image
                  source={require('../../../../assets/image/receipt_long.png')}
                  style={{height: 22, width: 22}}
                />
                <Text style={styles.name}>Medical history</Text>
                <Image
                  source={staticIcons.nextIcon}
                  style={{height: 12, width: 10, objectFit: 'contain'}}
                />
              </View>
            </TouchableOpacity>
            <View
              style={{
                height: 1,
                width: '100%',
                backgroundColor: Colors.LightGray,
                alignSelf: 'center',
              }}
            />
            <TouchableOpacity
              onPress={() => navigate('HealthThresholdHomeScreen')}>
              <View style={styles.container1}>
                <Image
                  source={require('../../../../assets/image/data_thresholding.png')}
                  style={{height: 22, width: 22}}
                />
                <Text style={styles.name}>Health thresholds</Text>
                <Image
                  source={staticIcons.nextIcon}
                  style={{height: 12, width: 10, objectFit: 'contain'}}
                />
              </View>
            </TouchableOpacity>
            <View
              style={{
                height: 1,
                width: '100%',
                backgroundColor: Colors.LightGray,
                alignSelf: 'center',
              }}
            />
            <TouchableOpacity onPress={() => navigate('RemainderScreen')}>
              <View style={[styles.container1, {paddingBottom: 8}]}>
                <Image
                  source={require('../../../../assets/image/notification_add.png')}
                  style={{height: 22, width: 22}}
                />
                <Text style={styles.name}>Reminders</Text>
                <Image
                  source={staticIcons.nextIcon}
                  style={{height: 12, width: 10, objectFit: 'contain'}}
                />
              </View>
            </TouchableOpacity>
          </View>
        </Card>
        <TouchableOpacity
          onPress={() => setIsClicked(true)}
          style={styles.stopMonitoringButton}>
          <Icons.Ionicons name="exit-outline" size={20} color={'red'} />
          <Text style={styles.monintoring}>Stop Monitoring</Text>
        </TouchableOpacity>
      </ScrollView>
      {isClicked && (
        <View style={styles.deletbuttonclick}>
          <CardLocal
            title={'Want to Stop monitoring your patient?'}
            children={
              'After doing so, you will not be able to access your medical history, nor receive alerts about your health.'
            }
            active={setIsClicked}
            action={() => navigation.goBack()}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  body: {
    flex: 1,
    paddingTop: 6,
    backgroundColor: Colors.GhostWhite,
  },
  separator: {
    width: 1,
    height: 20,
    backgroundColor: Colors.Black,
    marginHorizontal: 8,
  },
  patientName: {
    color: 'black',
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
    color: 'black',
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
    width: '94%',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: Colors.GhostWhite,
    height: 60,
  },
  monintoring: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'red',
    marginLeft: 5,
  },
  container1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  name: {
    color: '#00263E',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    marginLeft: 15,
    flex: 1,
  },
  afterLogoutBtnClick: {
    // backgroundColor: Colors.LightBlack,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: 1,
    flex: 1,
    alignItems: 'center',
    padding: 20,
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
