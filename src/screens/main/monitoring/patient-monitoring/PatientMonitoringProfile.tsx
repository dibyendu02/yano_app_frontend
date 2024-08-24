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
import React, { useState } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PatientElements from '../../../../components/PatientElements';
import Header from '../../../../components/header/Header';
import { Colors } from '../../../../constants/Colors';
import Card from '../../../../components/cards/Card';
import { DummyImage } from '../../../../assets/dummy/images';
import { measurements, userData } from '../../../../test/Data';
import Icons from '../../../../assets/icon/Icon';
import { navigate } from '../../../../navigation/RootNavigation';
import { StaticImage } from '../../../../assets/images';
import { staticIcons } from '../../../../assets/image';
import CardLocal from './CardLocal';
import { useNavigation } from '@react-navigation/native';

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
        style={{ height: 20, width: 20, tintColor: Colors.LightGreen }}
      />
    ),
  },
  {
    label: userData.blood,
    icon: (
      <Image source={StaticImage.BloodIcon} style={{ height: 20, width: 20 }} />
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

export default function PatientMonitoringProfile({ }) {
  const [isClicked, setIsClicked] = useState(false);
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
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
              measurements.length >= 2
                ? measurements.filter((e, i) => i < 2)
                : []
            }
            scrollEnabled={false}
            style={{ width: '100%' }}
            renderItem={({ item, index }) => (
              <View
                style={{
                  width: '100%',
                  paddingVertical: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{ width: '50%' }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'Roboto',
                      marginBottom: 4,
                      fontWeight: 'bold',
                      color: Colors.Blue,
                    }}>
                    {item.mType}
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      fontFamily: 'Roboto',
                      color: Colors.Blue,
                    }}>
                    {item.dt}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: 'Roboto',
                    marginBottom: 4,
                    fontWeight: '500',
                  }}>
                  {item.amt}{' '}
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'Roboto',
                      fontWeight: 'light',
                    }}>
                    mmol/L
                  </Text>
                </Text>
                {index === 0 ? (
                  <Icons.AntDesign
                    name="checkcircleo"
                    color={Colors.Green}
                    size={22}
                  />
                ) : (
                  <Icons.AntDesign
                    name="checkcircle"
                    color={Colors.Green}
                    size={22}
                  />
                )}
              </View>
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

        <Card contentContainerStyle={{ marginBottom: 50 }}>
          <View style={{ width: '100%' }}>
            <TouchableOpacity onPress={() => navigate('MedicalHistory')}>
              <View style={styles.container1}>
                <Image
                  source={require('../../../../assets/image/receipt_long.png')}
                  style={{ height: 22, width: 22 }}
                />
                <Text style={styles.name}>Medical history</Text>
                <Image
                  source={staticIcons.nextIcon}
                  style={{ height: 12, width: 10, objectFit: 'contain' }}
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
                  style={{ height: 22, width: 22 }}
                />
                <Text style={styles.name}>Health thresholds</Text>
                <Image
                  source={staticIcons.nextIcon}
                  style={{ height: 12, width: 10, objectFit: 'contain' }}
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
              <View style={styles.container1}>
                <Image
                  source={require('../../../../assets/image/notification_add.png')}
                  style={{ height: 22, width: 22 }}
                />
                <Text style={styles.name}>Reminders</Text>
                <Image
                  source={staticIcons.nextIcon}
                  style={{ height: 12, width: 10, objectFit: 'contain' }}
                />
              </View>
            </TouchableOpacity>
            {/* <PatientElements
              name="Medical history"
              icon="file-medical"
              iconsname="FontAwesome5"
              color="#76BC21"
              onPress={() => navigate('MedicalHistory')}
            /> */}
            {/* <PatientElements
              name="Health thresholds"
              icon="history-edu"
              iconsname="MaterialIcons"
              color="#76BC21"
              onPress={() => navigate('HealthThresholdHomeScreen')}
            /> */}
            {/* <PatientElements
              name="Reminders"
              icon="bell-plus"
              iconsname="MaterialCommunityIcons"
              color="#76BC21"
              onPress={() => navigate('RemainderScreen')}
            /> */}
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
    backgroundColor: 'white',
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
    width: '95%',
    marginHorizontal: '2%',
    zIndex: 1,
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 12,
  },
});
