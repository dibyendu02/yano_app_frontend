/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../../../../components/header/Header';
import Icons from '../../../../assets/icon/Icon';
import {Colors} from '../../../../constants/Colors';
import Card from '../../../../components/cards/Card';
import {CardStyles} from '../../../../components/cards/CardStyle';
import {GlucoseDetail} from '../../../../test/HealthStatsData';

const HealthParameterDetail = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header
        title="Glucose Level"
        headerRightComponent={
          <Icons.Feather name="share-2" color={Colors.Blue} size={25} />
        }
      />
      <View style={{flex: 1, backgroundColor: Colors.GhostWhite}}>
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
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>Normal</Text>
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
            data={GlucoseDetail}
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
                    fontSize: 17,
                    fontFamily: 'Roboto',
                    marginBottom: 4,
                    fontWeight: '500',
                  }}>
                  {item.value}{' '}
                  {item.unit && (
                    <Text
                      style={{
                        fontSize: 15,
                        fontFamily: 'Roboto',
                        fontWeight: 'light',
                        color: Colors.SteelBlue,
                      }}>
                      {item.unit}
                    </Text>
                  )}
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
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              paddingVertical: 14,
              width: '100%',
            }}>
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
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HealthParameterDetail;

const styles = StyleSheet.create({});
