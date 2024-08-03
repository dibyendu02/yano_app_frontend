import React, {useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CommonLayout from '../../../../components/CommonLayout';
import Header from '../../../../components/header/Header';
import {
  IconName,
  NotificationIcon,
  PlusIcon,
} from '../../../../assets/icon/IconNames';
import {Colors} from '../../../../constants/Colors';
import ItemWithTileSubtile from '../../../../components/ItemWithTileSubtitle';
import Icons from '../../../../assets/icon/Icon';
import Card from '../../../../components/cards/Card';
import {navigate} from '../../../../navigation/RootNavigation';
import {measurements} from '../../../../test/Data';
import FilledButton from '../../../../components/buttons/FilledButton';
import OutlineButton from '../../../../components/buttons/OutlineButton';
import BottomSheet from '../../../../components/bottom-sheet/BottomSheet';
import {StaticImage} from '../../../../assets/images';

const MyHealthHomeScreen = ({navigation}) => {
  const [show, setShow] = useState(false);
  const [selectedDiv, setSelectedDiv] = useState(null);

  const handleDivPress = div => {
    setSelectedDiv(div);
  };

  return (
    <CommonLayout>
      <Header
        title="Hi, Pedro"
        headerRightComponent={
          <TouchableOpacity style={{position: 'relative'}}>
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
      <ScrollView>
        <View style={{padding: 15}}>
          <View style={styles.container}>
            <Text style={styles.title}>Do you have one of our devices?</Text>
            <Text style={styles.para}>
              Connect your Yano device and start taking control of your health.
            </Text>
            <OutlineButton
              type="blue"
              icon={<PlusIcon size={16} color={Colors.Blue} />}
              label="Connect Device"
              onPress={() => navigate('Subscription')}
              style={{marginTop: 10}}
            />
          </View>
          <ItemWithTileSubtile
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
              navigation.navigate('WhatToMeasure');
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
                      color: Colors.Blue,
                      fontWeight: 'bold',
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
                    marginBottom: 4,
                    color: Colors.Blue,
                    fontWeight: 'bold',
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
      </ScrollView>
      <FilledButton
        type="blue"
        label="Consultation 24/7"
        icon={
          <Icons.MaterialIcons
            name="health-and-safety"
            size={24}
            color={Colors.White}
          />
        }
        onPress={() => setShow(true)}
        style={styles.addBtn}
      />
      <BottomSheet isVisible={show} onBackdropPress={() => setShow(false)}>
        <View style={{padding: 20}}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '800',
              color: Colors.Blue,
              marginBottom: 10,
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
              marginTop: 15,
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
              <Image source={StaticImage.CallIcon} />
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
              <Image source={StaticImage.VideoCallIcon} />
              <Text style={styles.divTitle}>Receive a video consultation</Text>
            </TouchableOpacity>
          </View>
          <View>
            <FilledButton
              label={'Continue'}
              type={'blue'}
              style={{width: '100%', alignSelf: 'center', marginVertical: 14}}
              onPress={() => {
                setShow(false);
                navigation.navigate('PatientVideoCall');
              }}
              activeOpacity={0.8}
            />
          </View>
        </View>
      </BottomSheet>
    </CommonLayout>
  );
};

export default MyHealthHomeScreen;

const styles = StyleSheet.create({
  addBtn: {
    width: 200,
    position: 'absolute',
    bottom: 40,
    right: 20,
  },
  container: {
    backgroundColor: Colors.White,
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.Blue,
    marginBottom: 6,
    textAlign: 'center',
  },
  para: {
    textAlign: 'center',
    fontSize: 14,
    color: Colors.SteelBlue,
    marginBottom: 10,
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
    fontSize: 18,
    fontWeight: '700',
    color: Colors.Blue,
  },
  divSubtitle: {
    color: Colors.SteelBlue,
    fontSize: 16,
  },
});
