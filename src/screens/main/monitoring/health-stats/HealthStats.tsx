/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../../../components/header/Header';
import {Colors} from '../../../../constants/Colors';
import {CardStyles} from '../../../../components/cards/CardStyle';
import {LineChart} from 'react-native-gifted-charts';
import Icons from '../../../../assets/icon/Icon';
import moment from 'moment';
import {StaticImage} from '../../../../assets/images';

enum TimePeriod {
  Day = 'Day',
  Week = 'Week',
  Month = 'Month',
  Year = 'Year',
}

enum RelativeDate {
  Today = 'Today',
  Tomorrow = 'Tomorrow',
  Yesterday = 'Yesterday',
}

const OPTIONS = [
  TimePeriod.Day,
  TimePeriod.Week,
  TimePeriod.Month,
  TimePeriod.Year,
];

interface DataItem {
  label: string;
  value: number;
}

const dayData: DataItem[] = [
  {label: '12 AM', value: 70},
  {label: '6 AM', value: 85},
  {label: '12 PM', value: 60},
  {label: '6 PM', value: 80},
];

const weeklyData: DataItem[] = [
  {label: 'S', value: 70},
  {label: 'M', value: 85},
  {label: 'T', value: 60},
  {label: 'W', value: 80},
  {label: 'T', value: 75},
  {label: 'F', value: 90},
  {label: 'S', value: 65},
];

const monthlyData: DataItem[] = [
  {label: '1', value: 70},
  {label: '5', value: 85},
  {label: '10', value: 60},
  {label: '15', value: 80},
  {label: '20', value: 75},
  {label: '25', value: 90},
  {label: '30', value: 65},
];

const yearlyData: DataItem[] = [
  {label: 'J', value: 70},
  {label: 'F', value: 85},
  {label: 'M', value: 60},
  {label: 'A', value: 80},
  {label: 'M', value: 75},
  {label: 'J', value: 90},
  {label: 'J', value: 65},
  {label: 'A', value: 70},
  {label: 'S', value: 85},
  {label: 'O', value: 60},
  {label: 'N', value: 80},
  {label: 'D', value: 75},
];

const HealthStats = () => {
  const [dayDate, setDayDate] = useState(moment());
  const [weekDate, setWeekDate] = useState(moment());
  const [monthDate, setMonthDate] = useState(moment());
  const [yearDate, setYearDate] = useState(moment());

  const [statData, setStatData] = useState<DataItem[]>(dayData);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [formattedText, setFormattedText] = useState('Today');
  const [chartSpacing, setChartSpacing] = useState(90);

  const [standardDeviation, setStandardDeviation] = useState(0);

  const calculateStandardDeviation = () => {
    let aValues = statData.map(e => e.value);
    const mean =
      aValues.reduce((sum, value) => sum + value, 0) / aValues.length;
    const variance =
      aValues.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) /
      aValues.length;
    const _standardDeviation = Math.sqrt(variance);
    setStandardDeviation(_standardDeviation);
  };

  useEffect(() => {
    calculateStandardDeviation();
  }, [statData]);

  const getFormattedText = (value?: number): string => {
    let newDate = moment();
    let _formattedText = '';

    switch (OPTIONS[selectedIndex]) {
      case TimePeriod.Day:
        newDate =
          value === -1
            ? dayDate.subtract(1, 'day')
            : value === 1
            ? dayDate.add(1, 'day')
            : dayDate;
        setDayDate(newDate);

        if (newDate.isSame(moment(), 'day')) {
          _formattedText = 'Today';
        } else if (newDate.isSame(moment().subtract(1, 'day'), 'day')) {
          _formattedText = 'Yesterday';
        } else if (newDate.isSame(moment().add(1, 'day'), 'day')) {
          _formattedText = 'Tomorrow';
        } else {
          _formattedText = newDate.format('D MMMM');
        }
        break;

      case TimePeriod.Week:
        newDate =
          value === -1
            ? weekDate.subtract(1, 'week')
            : value === 1
            ? weekDate.add(1, 'week')
            : weekDate;
        setWeekDate(newDate);

        const startOfWeek = newDate.startOf('week').format('D MMM');
        const endOfWeek = newDate.endOf('week').format('D MMM');
        _formattedText = `${startOfWeek} - ${endOfWeek}`;
        break;

      case TimePeriod.Month:
        newDate =
          value === -1
            ? monthDate.subtract(1, 'month')
            : value === 1
            ? monthDate.add(1, 'month')
            : monthDate;
        setMonthDate(newDate);

        _formattedText = newDate.format('MMMM YYYY');
        break;

      case TimePeriod.Year:
        newDate =
          value === -1
            ? yearDate.subtract(1, 'year')
            : value === 1
            ? yearDate.add(1, 'year')
            : yearDate;
        setYearDate(newDate);

        _formattedText = newDate.format('YYYY');
        break;
    }

    if (value !== undefined) {
      const randomData = generateRandomData();
      setStatData(randomData);
    }

    setFormattedText(_formattedText);
    return _formattedText;
  };

  useEffect(() => {
    getFormattedText();
  }, [selectedIndex]);

  const getRandomValue = (min = 60, max = 100) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const generateRandomData = (minValue = 60, maxValue = 100): DataItem[] => {
    return statData.map(item => ({
      ...item,
      value: getRandomValue(minValue, maxValue),
    }));
  };

  const handleOptionChange = (index: number) => {
    switch (OPTIONS[index]) {
      case TimePeriod.Day:
        setStatData(dayData);
        setChartSpacing(90);
        break;
      case TimePeriod.Week:
        setStatData(weeklyData);
        setChartSpacing(50);
        break;
      case TimePeriod.Month:
        setStatData(monthlyData);
        setChartSpacing(50);
        break;
      case TimePeriod.Year:
        setStatData(yearlyData);
        setChartSpacing(27);
        break;
    }
    setSelectedIndex(index);
    getFormattedText();
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header
        title="Heart rate"
        headerRightComponent={
          <View style={{flexDirection: 'row', gap: 16}}>
            <TouchableOpacity>
              <Image
                source={StaticImage.FilterIcon}
                style={{height: 28, width: 28, objectFit: 'contain'}}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={StaticImage.SharerIcon}
                style={{height: 25, width: 25}}
              />
            </TouchableOpacity>
          </View>
        }
      />
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.GhostWhite,
          alignItems: 'center',
        }}>
        <View style={{flex: 1, width: '100%'}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={[
                CardStyles.container,
                {
                  flexDirection: 'row',
                  padding: 6,
                  marginTop: 8,
                  justifyContent: 'space-around',
                },
              ]}>
              {OPTIONS.map((option, index: number) => (
                <TouchableOpacity
                  style={{
                    width: '24%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 10,
                    backgroundColor:
                      selectedIndex === index ? Colors.Blue : Colors.White,
                    borderRadius: 6,
                  }}
                  activeOpacity={0.8}
                  key={option}
                  onPress={() => handleOptionChange(index)}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: selectedIndex === index ? '600' : '400',
                      color:
                        selectedIndex === index ? Colors.White : Colors.Blue,
                    }}>
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={[CardStyles.container]}>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  paddingHorizontal: 10,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingVertical: 10,
                }}>
                <Icons.MaterialIcons
                  name="navigate-before"
                  size={30}
                  color={Colors.Blue}
                  onPress={() => getFormattedText(-1)}
                  suppressHighlighting
                />
                <Text
                  style={{color: Colors.Blue, fontSize: 16, fontWeight: '600'}}>
                  {formattedText}
                </Text>
                <Icons.MaterialIcons
                  name="navigate-next"
                  size={30}
                  color={Colors.Blue}
                  onPress={() => getFormattedText(1)}
                  suppressHighlighting
                />
              </View>
              <View
                style={{
                  width: '100%',
                  height: 1,
                  backgroundColor: Colors.LightGray,
                }}
              />
              <View
                style={{
                  width: '90%',
                  overflow: 'hidden',
                  marginVertical: 20,
                }}>
                <LineChart
                  data={statData}
                  color={Colors.LightBlue}
                  thickness={2}
                  spacing={chartSpacing}
                  xAxisColor={Colors.White}
                  yAxisColor={Colors.White}
                  yAxisTextStyle={{color: Colors.Grey}}
                  xAxisLabelTextStyle={{color: Colors.Grey}}
                  yAxisLabelContainerStyle={{width: 24}}
                  yAxisOffset={40}
                  stepValue={10}
                  maxValue={80}
                  height={200}
                  customDataPoint={(item: {value: number}, _index: number) => (
                    <View
                      style={{
                        height: 10,
                        width: 10,
                        borderRadius: 10,
                        borderColor:
                          item?.value <= 20
                            ? Colors.Green
                            : item?.value > 20 && item?.value < 50
                            ? Colors.Orange
                            : Colors.Red,
                        backgroundColor: Colors.White,
                        borderWidth: 2,
                        alignSelf: 'center',
                      }}
                    />
                  )}
                />
              </View>
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
                  paddingVertical: 16,
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  width: '100%',
                  paddingHorizontal: 16,
                }}>
                <View
                  style={{
                    height: 3,
                    width: 12,
                    backgroundColor: Colors.LightBlue,
                    marginHorizontal: 6,
                  }}
                />
                <Text
                  style={{
                    color: Colors.Grey,
                    fontSize: 12,
                    fontWeight: 'bold',
                  }}>
                  HEART RATE
                </Text>
              </View>
            </View>
            <View style={{width: '100%'}}>
              <Text
                style={{
                  fontSize: 14,
                  color: Colors.Blue,
                  fontWeight: 'bold',
                  marginLeft: 14,
                  marginTop: 25,
                  marginBottom: 8,
                }}>
                AVERAGE
              </Text>
              <View
                style={[
                  CardStyles.container,
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 15,
                    paddingHorizontal: 16,
                  },
                ]}>
                <Text style={{color: Colors.Blue}}>Heart Rate</Text>
                <Text
                  style={{
                    color: Colors.Blue,
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  {(
                    statData
                      .map(e => e.value)
                      .reduce((sum, value) => sum + value, 0) / statData.length
                  ).toFixed(0) + ' '}
                  <Text
                    style={{
                      fontWeight: 'normal',
                    }}>
                    LPM
                  </Text>
                </Text>
              </View>
            </View>

            <View style={{width: '100%'}}>
              <Text
                style={{
                  fontSize: 14,
                  color: Colors.Blue,
                  fontWeight: 'bold',
                  marginLeft: 14,
                  marginTop: 20,
                  marginBottom: 10,
                }}>
                STANDARD DEVIATION
              </Text>
              <View
                style={[
                  CardStyles.container,
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 15,
                    paddingHorizontal: 16,
                  },
                ]}>
                <Text style={{color: Colors.Blue}}>Heart Rate</Text>
                <Text
                  style={{
                    color: Colors.Blue,
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  {standardDeviation.toFixed(2) + ' '}
                  <Text
                    style={{
                      fontWeight: 'normal',
                    }}>
                    LPM
                  </Text>
                </Text>
              </View>
            </View>

            <View style={{width: '100%'}}>
              <Text
                style={{
                  fontSize: 14,
                  color: Colors.Blue,
                  fontWeight: 'bold',
                  marginLeft: 14,
                  marginTop: 20,
                  marginBottom: 10,
                }}>
                HIGHEST VALUE
              </Text>
              <View
                style={[
                  CardStyles.container,
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 15,
                    paddingHorizontal: 16,
                  },
                ]}>
                <Text style={{color: Colors.Blue}}>Heart Rate</Text>
                <Text
                  style={{
                    color: Colors.Blue,
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  {Math.max(...statData.map(e => e.value)) + ' '}
                  <Text
                    style={{
                      fontWeight: 'normal',
                    }}>
                    LPM
                  </Text>
                </Text>
              </View>
            </View>

            <View style={{width: '100%'}}>
              <Text
                style={{
                  fontSize: 14,
                  color: Colors.Blue,
                  fontWeight: 'bold',
                  marginLeft: 14,
                  marginTop: 20,
                  marginBottom: 10,
                }}>
                LOWEST VALUE
              </Text>
              <View
                style={[
                  CardStyles.container,
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 15,
                    paddingHorizontal: 16,
                    marginBottom: 30,
                  },
                ]}>
                <Text style={{color: Colors.Blue}}>Heart Rate</Text>
                <Text
                  style={{
                    color: Colors.Blue,
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  {Math.min(...statData.map(e => e.value)) + ' '}
                  <Text
                    style={{
                      fontWeight: 'normal',
                    }}>
                    LPM
                  </Text>
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HealthStats;

const styles = StyleSheet.create({});
