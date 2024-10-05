import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../../../../components/header/Header';
import {healthParameterDetailsN, HSDGN} from '../../../../test/HealthStatsData';
import Card from '../../../../components/cards/Card';
import {IconName} from '../../../../assets/icon/IconNames';
import {Colors} from '../../../../constants/Colors';
import Icons from '../../../../assets/icon/Icon';
import moment from 'moment';
import {navigate} from '../../../../navigation/RootNavigation';
import {retrieveData} from '../../../../utils/Storage';
import {getBloodGlucoseDatabyUserId} from '../../../../api/GET/bloodGlucose';

const HealthParametersList = () => {
  const [userId, setUserId] = useState('');
  const [userType, setUserType] = useState('');
  const [token, setToken] = useState('');
  const [mergedData, setMergedData] = useState(HSDGN); // State to hold merged data

  const getUserData = async () => {
    const retrievedUserId = await retrieveData('userId');
    const retrievedUserType = await retrieveData('userType');
    const retrievedToken = await retrieveData('token');
    setUserId(retrievedUserId);
    setUserType(retrievedUserType);
    setToken(retrievedToken);
  };

  useEffect(() => {
    getUserData();
  }, []);

  // Function to group blood glucose data by month
  const groupDataByMonth = data => {
    const grouped = data.reduce((acc, item) => {
      const month = moment(item.createdAt).format('MMMM'); // Get the month name
      if (!acc[month]) {
        acc[month] = {
          month,
          sequence: moment(item.createdAt).month() + 1, // Get month number (1-12)
          data: [],
        };
      }
      acc[month].data.push({
        field: 'GL',
        field_full: 'Blood glucose',
        measurements: [
          {
            value: item.data.toString(),
            unit: item.unit,
          },
        ],
        measurement_time: item.measurement_time?.value || 'No Time Info', // Use measurement_time value
        timestamp: item.createdAt,
        isReviewed: false, // Set isReviewed based on your logic
        foodConsumed: item.foodConsumed, // Add foodConsumed
        note: item.note, // Add note
      });
      return acc;
    }, {});

    return Object.values(grouped).sort((a, b) => b.sequence - a.sequence); // Sort by sequence descending (latest month first)
  };

  const getUserBloodGlucose = async () => {
    try {
      const resData = await getBloodGlucoseDatabyUserId({userId, token});
      console.log('Blood Glucose Data:', resData);

      // Transform and group the blood glucose data
      const groupedBloodGlucoseData = groupDataByMonth(resData);

      // Merge the transformed blood glucose data with the existing HSDGN data
      setMergedData([...groupedBloodGlucoseData, ...HSDGN]);
    } catch (error) {
      console.log('Error fetching blood glucose data:', error);
    }
  };

  useEffect(() => {
    if (userId && token) {
      getUserBloodGlucose();
    }
  }, [userId, token]);

  return (
    <View style={styles.container}>
      <Header title="Your measurements" />
      <View style={{backgroundColor: Colors.GhostWhite, flex: 1}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={mergedData}
          style={{marginVertical: 6}}
          renderItem={({item, index: _index}) => (
            <Card key={item.month} title={item.month}>
              <FlatList
                scrollEnabled={false}
                data={item.data.sort(
                  (a, b) =>
                    moment(a.timestamp).isBefore(b.timestamp) ? 1 : -1, // Sort in ascending order by timestamp
                )}
                renderItem={({item: e, index: _i}) => (
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.itemContainer}
                    onPress={() =>
                      navigate('HealthParameterDetail', {
                        healthParameterDetail: {
                          ...healthParameterDetailsN[e.field], // Get the health parameter details from healthParameterDetailsN
                          data: [
                            ...e.measurements.map(measurement => ({
                              label: e.field_full,
                              value: measurement.value,
                              unit: measurement.unit,
                            })),
                            {
                              label: 'Food consumed',
                              value: e.foodConsumed || 'N/A',
                            },
                            {
                              label: 'Note',
                              value: e.note || 'No notes available',
                            },
                          ],
                          testTiming: '2024-09-28T08:51:09.734Z', // Pass the test timing if available
                        },
                        timestamp: e.timestamp, // Pass the timestamp for dynamic date display
                      })
                    }
                    key={e.field}>
                    <View style={{width: '50%'}}>
                      <Text style={styles.fieldFullText}>{e.field_full}</Text>
                      <Text style={styles.timestampText}>
                        {moment(e.timestamp).format('M/D/YYYY - h:mm A')}
                      </Text>
                    </View>
                    <View style={styles.measurementContainer}>
                      {e.measurements.map(itm => (
                        <Text style={styles.measurementText} key={itm.unit}>
                          {itm.value}{' '}
                          <Text style={styles.unitText}>{itm.unit}</Text>
                        </Text>
                      ))}
                      {e?.diagram && (
                        <Image source={e.diagram} style={styles.diagramImage} />
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
                  <View style={styles.itemSeparator} />
                )}
              />
            </Card>
          )}
        />
      </View>
    </View>
  );
};

export default HealthParametersList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    width: '100%',
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fieldFullText: {
    fontSize: 18,
    fontFamily: 'Roboto',
    marginBottom: 4,
    color: Colors.Blue,
    fontWeight: '800',
  },
  timestampText: {
    fontSize: 13,
    fontFamily: 'Roboto',
    color: Colors.Blue,
  },
  measurementContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    width: '30%',
    marginRight: 14,
  },
  measurementText: {
    fontSize: 18,
    fontFamily: 'Roboto',
    marginBottom: 4,
    fontWeight: Platform.OS === 'android' ? 'bold' : '600',
    color: Colors.Blue,
  },
  unitText: {
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight: 'light',
    color: Colors.SteelBlue,
  },
  diagramImage: {
    width: 61,
    height: 32,
    tintColor: Colors.Blue,
  },
  itemSeparator: {
    height: 1,
    width: '100%',
    backgroundColor: Colors.LightGray,
    alignSelf: 'center',
  },
});
