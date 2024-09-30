import React, {useState} from 'react';
import {
  FlatList,
  Image,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import Header from '../../../../components/header/Header';
import Icons from '../../../../assets/icon/Icon';
import {Colors} from '../../../../constants/Colors';
import {CardStyles} from '../../../../components/cards/CardStyle';
import {navigate} from '../../../../navigation/RootNavigation';
import {StaticImage} from '../../../../assets/images';
import moment from 'moment';

// @ts-ignore
const HealthParameterDetail = ({route}) => {
  const [isReviewed, setIsReviewed] = useState(false);

  console.log(route?.params);

  // Retrieve healthParameterDetail, timestamp, and testTiming from route params
  let healthParameterDetail = route?.params?.healthParameterDetail;
  let timestamp = route?.params?.timestamp;
  let testTiming =
    healthParameterDetail?.field === 'GL' ? route?.params?.testTiming : null;

  // Format the timestamp into a readable date string
  const formattedDate = moment(timestamp).format('MMMM D, YYYY - h:mm A');

  // Check if the blood glucose value is normal or abnormal
  const checkBloodGlucoseLevel = () => {
    if (healthParameterDetail?.field === 'GL') {
      const glucoseValue = parseFloat(healthParameterDetail?.data[0]?.value);
      const isFasting = testTiming?.toLowerCase().includes('fasting');
      if (isFasting) {
        return glucoseValue >= 70 && glucoseValue <= 100
          ? 'Normal'
          : 'Abnormal';
      } else {
        return glucoseValue >= 70 && glucoseValue <= 140
          ? 'Normal'
          : 'Abnormal';
      }
    }
    return 'Normal'; // Default for other health parameters
  };

  const healthStatus = checkBloodGlucoseLevel();

  return (
    <View style={{flex: 1}}>
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
        style={{
          flex: 1,
          backgroundColor: Colors.GhostWhite,
          paddingTop: healthParameterDetail?.field !== 'ECG' ? 8 : 0,
        }}>
        {healthParameterDetail?.field !== 'ECG' ? (
          <View style={[CardStyles.container]}>
            <View style={{width: '100%', padding: 20}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    height: 10,
                    width: 10,
                    borderRadius: 5,
                    backgroundColor:
                      healthStatus === 'Normal' ? Colors.Green : Colors.Red,
                    marginRight: 4,
                  }}
                />
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: Colors.Blue,
                  }}>
                  {healthStatus === 'Normal'
                    ? healthParameterDetail?.field === 'BP'
                      ? 'Normal blood pressure'
                      : 'Normal'
                    : 'Abnormal'}
                </Text>
              </View>
              {/* Display the dynamic date here */}
              <Text style={{fontSize: 12, color: Colors.SteelBlue}}>
                {formattedDate}
                {testTiming ? ` - Test Timing: ${testTiming}` : ''}
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
                  <View style={{width: item.label === 'Note' ? '20%' : '50%'}}>
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
                  <View style={{width: item.label === 'Note' && '80%'}}>
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
                      {item.unit && (
                        <Text
                          style={{
                            fontSize: 16,
                            fontFamily: 'Roboto',
                            fontWeight: 'light',
                            color: Colors.SteelBlue,
                          }}>
                          {item.unit}
                        </Text>
                      )}
                    </Text>
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
              onPress={() => {
                healthParameterDetail?.field == 'GL'
                  ? navigate('BloodGlucoseStats')
                  : navigate('HealthStats');
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
            </TouchableOpacity>
          </View>
        ) : (
          <View>{/* ECG Specific Content */}</View>
        )}
      </View>
    </View>
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
