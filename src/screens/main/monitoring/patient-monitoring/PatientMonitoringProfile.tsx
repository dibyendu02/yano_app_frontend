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
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Foundation from 'react-native-vector-icons/Foundation';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PatientElements from '../../../../components/PatientElements';
import Header from '../../../../components/header/Header';
import {Colors} from '../../../../constants/Colors';
import Card from '../../../../components/cards/Card';
import {DummyImage} from '../../../../assets/dummy/images';
import {measurements, userData} from '../../../../test/Data';
import Icons from '../../../../assets/icon/Icon';
import {IconName} from '../../../../assets/icon/IconNames';
import {navigate} from '../../../../navigation/RootNavigation';

let data1 = [
  {
    label: userData.gender,
    icon: <Foundation name="female-symbol" size={20} color={'#76BC21'} />,
  },
  {
    label: userData.age,
    icon: <Fontisto name="date" size={20} color={'#76BC21'} />,
  },
  {
    label: userData.blood,
    icon: <MaterialIcons name="bloodtype" size={20} color={'#76BC21'} />,
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

export default function PatientMonitoringProfile({}) {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Monitored patient" />

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <Card>
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

          <TouchableOpacity style={styles.addButton}>
            <FontAwesome5 name="file-medical-alt" size={15} color="white" />
            <Text style={styles.addButtonText}>Measure vital signs</Text>
          </TouchableOpacity>
        </Card>

        <Card
          title="last measurements"
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
                View More
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
            style={{width: '100%'}}
            renderItem={({item, index: _index}) => (
              <View
                style={{
                  width: '100%',
                  paddingVertical: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{width: '50%'}}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: 'Roboto',
                      marginBottom: 4,
                    }}>
                    {item.mType}
                  </Text>
                  <Text style={{fontSize: 13, fontFamily: 'Roboto'}}>
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
                <Icons.AntDesign
                  name={IconName.CheckCircle}
                  color={Colors.Green}
                  size={22}
                />
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

        <Card>
          <View style={{width: '100%'}}>
            <PatientElements
              name="Medical history"
              icon="file-medical"
              iconsname="FontAwesome5"
              color="#76BC21"
              onPress={() => navigate('MedicalHistory')}
            />
            <PatientElements
              name="Health thresholds"
              icon="history-edu"
              iconsname="MaterialIcons"
              color="#76BC21"
              onPress={() => navigate('HealthThresholdHomeScreen')}
            />
            <PatientElements
              name="Reminders"
              icon="bell-plus"
              iconsname="MaterialCommunityIcons"
              color="#76BC21"
              onPress={() => navigate('RemainderScreen')}
            />
          </View>
        </Card>
      </ScrollView>
      <View>
        <View style={styles.basicDetails}>
          <View style={styles.stopMonitoringButton}>
            <Icons.Ionicons name="exit-outline" size={20} color={'red'} />
            <TouchableOpacity>
              <Text style={styles.monintoring}>stop Monitoring</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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

  separator: {
    width: 1,
    height: 20,
    backgroundColor: Colors.Black,
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
