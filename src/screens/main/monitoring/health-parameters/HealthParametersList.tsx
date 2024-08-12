/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
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
import React from 'react';
import Header from '../../../../components/header/Header';
import {
  healthParameterDetailsN,
  HSDG,
  HSDGN,
} from '../../../../test/HealthStatsData';
import Card from '../../../../components/cards/Card';
import { IconName } from '../../../../assets/icon/IconNames';
import { Colors } from '../../../../constants/Colors';
import Icons from '../../../../assets/icon/Icon';
import moment from 'moment';
import { navigate } from '../../../../navigation/RootNavigation';

const HealthParametersList = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Your measurements"
      // headerRightComponent={
      //   <Icons.MaterialIcons
      //     name="checklist-rtl"
      //     color={Colors.Blue}
      //     size={25}
      //   />
      // }
      />
      <View style={{ backgroundColor: Colors.GhostWhite, flex: 1 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={HSDGN}
          style={{ marginVertical: 6 }}
          renderItem={({ item, index: _index }) => (
            <Card key={item.month} title={item.month}>
              <FlatList
                scrollEnabled={false}
                data={item.data}
                renderItem={({ item: e, index: _i }) => (
                  <TouchableOpacity
                    activeOpacity={0.5}
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
                        healthParameterDetail: healthParameterDetailsN[e.field],
                      })
                    }
                    key={e.field}>
                    <View style={{ width: '50%' }}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontFamily: 'Roboto',
                          marginBottom: 4,
                          color: Colors.Blue,
                          fontWeight: '800',
                        }}>
                        {e.field_full}
                      </Text>
                      <Text
                        style={{
                          fontSize: 13,
                          fontFamily: 'Roboto',
                          color: Colors.Blue,
                        }}>
                        {moment(e.timestamp).format('M/D/YYYY - h:mm A')}
                      </Text>
                    </View>
                    <View>
                      {e.measurements.map(itm => (
                        <Text
                          style={{
                            fontSize: 18,
                            fontFamily: 'Roboto',
                            marginBottom: 4,
                            fontWeight: '500',
                          }}
                          key={itm.unit}>
                          {itm.value}{' '}
                          <Text
                            style={{
                              fontSize: 16,
                              fontFamily: 'Roboto',
                              fontWeight: 'light',
                            }}>
                            {itm.unit}
                          </Text>
                        </Text>
                      ))}
                      {e?.diagram && (
                        <Image source={e.diagram}
                          style={{ width: 61, height: 32 }}
                        />
                      )}
                    </View>

                    {e?.isReviewed ? (
                      <Icons.AntDesign
                        name={IconName.CheckCircle}
                        color={Colors.Green}
                        size={22}
                      />
                    ) : (
                      <Icons.AntDesign
                        name={'checkcircleo'}
                        color={Colors.Grey}
                        size={22}
                      />
                    )}
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
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default HealthParametersList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
