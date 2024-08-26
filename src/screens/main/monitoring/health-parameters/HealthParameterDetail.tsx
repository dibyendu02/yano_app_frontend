/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../../../../components/header/Header';
import Icons from '../../../../assets/icon/Icon';
import {Colors} from '../../../../constants/Colors';
import {CardStyles} from '../../../../components/cards/CardStyle';
import FilledButton from '../../../../components/buttons/FilledButton';
import {DummyImage} from '../../../../assets/dummy/images';
import Card from '../../../../components/cards/Card';
import {navigate} from '../../../../navigation/RootNavigation';
import {StaticImage} from '../../../../assets/images';

//@ts-ignore
const HealthParameterDetail = ({route}) => {
  const [isReviewed, setIsReviewed] = useState(false);

  let healthParameterDetail = route?.params?.healthParameterDetail;

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header
        title={healthParameterDetail?.field_full}
        headerRightComponent={
          <TouchableOpacity
            onPress={() => {
              Share.share({
                message: `Check out my ${healthParameterDetail?.field_full} health parameter details on the Health App`,
              });
            }}>
            <Image
              source={StaticImage.SharerIcon}
              style={{height: 25, width: 25}}
            />
          </TouchableOpacity>
        }
      />
      <View
        style={{flex: 1, backgroundColor: Colors.GhostWhite, paddingTop: 10}}>
        {healthParameterDetail?.field !== 'ECG' ? (
          <View style={[CardStyles.container]}>
            <View style={{width: '100%', padding: 20}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    height: 10,
                    width: 10,
                    borderRadius: 5,
                    backgroundColor: Colors.Green,
                    marginRight: 4,
                  }}
                />
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: Colors.Blue,
                  }}>
                  {/* {'Normal' + ' ' + healthParameterDetail?.field_full} */}
                  {healthParameterDetail?.field == 'BP'
                    ? `Normal blood pressure`
                    : `Normal`}
                </Text>
              </View>
              <Text style={{fontSize: 12, color: Colors.SteelBlue}}>
                October 7, 2022 - 5:13 PM
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                height: 1,
                backgroundColor: Colors.LightGray,
              }}
            />
            <FlatList
              data={healthParameterDetail?.data || []}
              scrollEnabled={false}
              style={{width: '100%', paddingHorizontal: 20}}
              renderItem={({item, index: _index}) => (
                <View
                  style={{
                    width: '100%',
                    paddingVertical: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{width: '50%'}}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: 'Roboto',
                        marginBottom: 4,
                        color: Colors.SteelBlue,
                        fontWeight: '500',
                      }}>
                      {item.label}
                    </Text>
                  </View>

                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: 'Roboto',
                      marginBottom: 4,
                      fontWeight: Platform.OS === 'android' ? 'bold' : '600',
                      color: Colors.Blue,
                    }}
                    key={item.unit}>
                    {item.value}{' '}
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: 'Roboto',
                        fontWeight: 'light',
                        color: Colors.SteelBlue,
                      }}>
                      {item.unit}
                    </Text>
                  </Text>
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
            <View
              style={{
                width: '100%',
                height: 1,
                backgroundColor: Colors.LightGray,
              }}
            />
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                paddingVertical: 14,
                width: '100%',
              }}
              onPress={() => navigate('HealthStats')}>
              <View style={{flexDirection: 'row'}}>
                <Icons.MaterialIcons
                  name="query-stats"
                  color={Colors.CeruleanBlue}
                  size={20}
                />
                <Text style={{color: Colors.CeruleanBlue, marginLeft: 6}}>
                  See stats
                </Text>
              </View>
              <Icons.MaterialIcons
                name="navigate-next"
                size={30}
                color={Colors.Blue}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <View
              style={{
                backgroundColor: Colors.White,
                width: '100%',
                padding: 10,
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <ImageBackground
                source={DummyImage.ECG}
                style={{
                  width: '100%',
                  height: 200,
                }}
                resizeMode="contain">
                <Icons.Ionicons
                  name="resize"
                  size={30}
                  color={Colors.Black}
                  style={{position: 'absolute', right: '5%', top: '5%'}}
                />
              </ImageBackground>

              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 20,
                  width: '90%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={styles.dataLabel}>Gain: 10mm/mV</Text>
                <Text style={styles.dataLabel}>Paper speed: 10mm/mV</Text>
              </View>
            </View>

            <Card>
              <FlatList
                data={healthParameterDetail?.data || []}
                scrollEnabled={false}
                style={{width: '100%', paddingHorizontal: 20}}
                ListHeaderComponent={
                  <Text
                    style={{
                      fontSize: 16,
                      color: Colors.Blue,
                      fontWeight: '600',
                    }}>
                    Sample Details
                  </Text>
                }
                renderItem={({item, index: _index}) => (
                  <View
                    style={{
                      width: '100%',
                      paddingVertical: 20,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        width: '100%',
                        justifyContent: 'space-between',
                        flexDirection: !Array.isArray(item) ? 'column' : 'row',
                      }}>
                      {!Array.isArray(item) ? (
                        <Text
                          style={{
                            fontFamily: 'Roboto',
                            color: Colors.SteelBlue,
                            fontWeight: '500',
                          }}>
                          {item.label + ': '}
                          <Text
                            style={{
                              fontFamily: 'Roboto',
                              fontWeight: 'bold',
                            }}>
                            {item.value}
                            {' ' + item.unit}
                          </Text>
                        </Text>
                      ) : (
                        item.map(e => (
                          <Text
                            style={{
                              flexShrink: 12,
                              fontFamily: 'Roboto',
                              color: Colors.SteelBlue,
                              fontWeight: '500',
                            }}
                            key={e.label}>
                            {e.label + ': '}
                            <Text
                              style={{
                                fontFamily: 'Roboto',
                                fontWeight: 'bold',
                              }}>
                              {e.value}
                              {' ' + e.unit}
                            </Text>
                          </Text>
                        ))
                      )}
                    </View>
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
          </View>
        )}
      </View>
      {/* <FilledButton
        label={isReviewed ? 'Revised measurement' : 'Mark as reviewed'}
        icon={
          isReviewed && (
            <Icons.AntDesign
              name="checkcircle"
              size={20}
              color={Colors.White}
            />
          )
        }
        type={isReviewed ? 'green' : 'blue'}
        style={{width: '92%', alignSelf: 'center', marginVertical: 14}}
        onPress={() => setIsReviewed(!isReviewed)}
        activeOpacity={0.8}
      /> */}
    </SafeAreaView>
  );
};

export default HealthParameterDetail;

const styles = StyleSheet.create({
  dataLabel: {
    color: Colors.Blue,
    fontSize: 12,
    marginHorizontal: 4,
  },
});
