import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../../../../components/header/Header';
import {Colors} from '../../../../constants/Colors';
import {CardStyles} from '../../../../components/cards/CardStyle';
import {LineChart} from 'react-native-gifted-charts';
import Icons from '../../../../assets/icon/Icon';
import moment from 'moment';
import {StaticImage} from '../../../../assets/images';
import {retrieveData} from '../../../../utils/Storage';
import {getBloodGlucoseDatabyUserId} from '../../../../api/GET/bloodGlucose';

enum TimePeriod {
  Day = 'Day',
  Week = 'Week',
  Month = 'Month',
  Year = 'Year',
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

const BloodGlucoseStats = () => {
  const [statData, setStatData] = useState<DataItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [formattedText, setFormattedText] = useState('Today');
  const [chartSpacing, setChartSpacing] = useState(90);
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');
  const [standardDeviation, setStandardDeviation] = useState(0);
  const [average, setAverage] = useState(0);
  const [highestValue, setHighestValue] = useState(0);
  const [lowestValue, setLowestValue] = useState(0);

  // States to track dates for navigation
  const [dayDate, setDayDate] = useState(moment());
  const [weekDate, setWeekDate] = useState(moment());
  const [monthDate, setMonthDate] = useState(moment());
  const [yearDate, setYearDate] = useState(moment());

  const getUserDetails = async () => {
    const retrievedUserId = await retrieveData('userId');
    const retrievedToken = await retrieveData('token');
    setUserId(retrievedUserId);
    setToken(retrievedToken);
  };

  const fetchBloodGlucoseData = async (date?: moment.Moment) => {
    try {
      if (!userId || !token) return;
      const resData = await getBloodGlucoseDatabyUserId({userId, token});
      if (resData.length > 0) {
        processDataForTimePeriod(resData, OPTIONS[selectedIndex], date);
      } else {
        setStatData([]); // No data available
      }
    } catch (error) {
      console.error('Error fetching blood glucose data:', error);
    }
  };

  const processDataForTimePeriod = (
    data: any[],
    period: TimePeriod,
    date?: moment.Moment,
  ) => {
    const now = date || moment();
    let filteredData: any[] = [];
    let formattedData: DataItem[] = [];

    switch (period) {
      case TimePeriod.Day:
        filteredData = data.filter(item =>
          moment(item.createdAt).isSame(now, 'day'),
        );
        formattedData = filteredData.map(item => ({
          label: moment(item.createdAt).format('h A'), // Label by hour
          value: parseFloat(item.data),
        }));
        break;

      case TimePeriod.Week:
        filteredData = data.filter(item =>
          moment(item.createdAt).isSame(now, 'week'),
        );
        formattedData = calculateAverageForWeek(filteredData);
        break;

      case TimePeriod.Month:
        filteredData = data.filter(item =>
          moment(item.createdAt).isSame(now, 'month'),
        );
        formattedData = calculateAverageForMonth(filteredData);
        break;

      case TimePeriod.Year:
        filteredData = data.filter(item =>
          moment(item.createdAt).isSame(now, 'year'),
        );
        formattedData = calculateAverageForYear(filteredData);
        break;
    }
    setStatData(formattedData);
    calculateMetrics(formattedData); // Calculate metrics after setting data
  };

  const calculateAverageForWeek = (data: any[]) => {
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    let weeklyData = days.map(day => ({
      label: day,
      value: 0,
    }));
    let groupedData = groupDataBy(data, 'day');

    weeklyData = weeklyData.map((item, index) => {
      const dayData = groupedData[index];
      if (dayData) {
        const avg =
          dayData.reduce((sum, item) => sum + item.data, 0) / dayData.length;
        return {label: item.label, value: avg};
      }
      return item;
    });

    return weeklyData.filter(item => item.value > 0);
  };

  const calculateAverageForMonth = (data: any[]) => {
    const daysInMonth = moment().daysInMonth();
    let monthlyData = Array.from({length: daysInMonth}, (_, i) => ({
      label: (i + 1).toString(),
      value: 0,
    }));
    let groupedData = groupDataBy(data, 'date');

    monthlyData = monthlyData.map((item, index) => {
      const dayData = groupedData[index];
      if (dayData) {
        const avg =
          dayData.reduce((sum, item) => sum + item.data, 0) / dayData.length;
        return {label: item.label, value: avg};
      }
      return item;
    });

    return monthlyData.filter(item => item.value > 0);
  };

  const calculateAverageForYear = (data: any[]) => {
    const months = moment.monthsShort();
    let yearlyData = months.map(month => ({
      label: month.charAt(0).toUpperCase(),
      value: 0,
    }));
    let groupedData = groupDataBy(data, 'month');

    yearlyData = yearlyData.map((item, index) => {
      const monthData = groupedData[index];
      if (monthData) {
        const avg =
          monthData.reduce((sum, item) => sum + item.data, 0) /
          monthData.length;
        return {label: item.label, value: avg};
      }
      return item;
    });

    return yearlyData.filter(item => item.value > 0);
  };

  const groupDataBy = (data: any[], type: 'day' | 'date' | 'month') => {
    return data.reduce((acc, item) => {
      let key;
      switch (type) {
        case 'day':
          key = moment(item.createdAt).weekday();
          break;
        case 'date':
          key = moment(item.createdAt).date() - 1; // zero-based index
          break;
        case 'month':
          key = moment(item.createdAt).month();
          break;
      }
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, []);
  };

  const calculateMetrics = (data: DataItem[]) => {
    if (data.length === 0) {
      setAverage(0);
      setStandardDeviation(0);
      setHighestValue(0);
      setLowestValue(0);
      return;
    }
    const values = data.map(item => item.value);
    const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
    const variance =
      values.reduce((sum, val) => sum + Math.pow(val - avg, 2), 0) /
      values.length;
    const stdDev = Math.sqrt(variance);
    setAverage(avg);
    setStandardDeviation(stdDev);
    setHighestValue(Math.max(...values));
    setLowestValue(Math.min(...values));
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  useEffect(() => {
    if (userId && token) {
      fetchBloodGlucoseData();
    }
  }, [userId, token]);

  useEffect(() => {
    fetchBloodGlucoseData();
  }, [selectedIndex]);

  const handleOptionChange = (index: number) => {
    setSelectedIndex(index);
    let _formattedText = '';
    switch (OPTIONS[index]) {
      case TimePeriod.Day:
        _formattedText = 'Today'; // Adjust text based on the selected day date if needed
        break;
      case TimePeriod.Week:
        _formattedText = `This Week`; // Adjust text based on the selected week date if needed
        break;
      case TimePeriod.Month:
        _formattedText = `This Month`; // Adjust text based on the selected month date if needed
        break;
      case TimePeriod.Year:
        _formattedText = `This Year`; // Adjust text based on the selected year date if needed
        break;
    }
    setFormattedText(_formattedText); // Update the formatted text
  };

  const navigateDate = (direction: number) => {
    let newDate;
    let _formattedText = '';

    switch (OPTIONS[selectedIndex]) {
      case TimePeriod.Day:
        newDate = dayDate.add(direction, 'day');
        setDayDate(newDate);
        _formattedText = newDate.format('D MMMM');
        break;
      case TimePeriod.Week:
        newDate = weekDate.add(direction, 'week');
        setWeekDate(newDate);
        const startOfWeek = newDate.startOf('week').format('D MMM');
        const endOfWeek = newDate.endOf('week').format('D MMM');
        _formattedText = `${startOfWeek} - ${endOfWeek}`;
        break;
      case TimePeriod.Month:
        newDate = monthDate.add(direction, 'month');
        setMonthDate(newDate);
        _formattedText = newDate.format('MMMM YYYY');
        break;
      case TimePeriod.Year:
        newDate = yearDate.add(direction, 'year');
        setYearDate(newDate);
        _formattedText = newDate.format('YYYY');
        break;
    }
    setFormattedText(_formattedText);
    fetchBloodGlucoseData(newDate); // Fetch new data based on navigation
  };

  return (
    <View style={{flex: 1}}>
      <Header
        title="Blood glucose"
        headerRightComponent={
          <View style={{flexDirection: 'row', gap: 16}}>
            <TouchableOpacity
              onPress={() => {
                Share.share({
                  message: 'Blood Glucose stats',
                });
              }}>
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
                  onPress={() => navigateDate(-1)}
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
                  onPress={() => navigateDate(1)}
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
              {statData.length > 0 ? (
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
                    yAxisLabelContainerStyle={{width: 30}}
                    yAxisOffset={80}
                    stepValue={40}
                    maxValue={200}
                    height={200}
                    customDataPoint={(
                      item: {value: number},
                      _index: number,
                    ) => (
                      <View
                        style={{
                          height: 10,
                          width: 10,
                          borderRadius: 10,
                          borderColor: Colors.Blue,
                          backgroundColor: Colors.White,
                          borderWidth: 2,
                          alignSelf: 'center',
                        }}
                      />
                    )}
                  />
                </View>
              ) : (
                <View style={{padding: 20, alignItems: 'center'}}>
                  <Text style={{color: Colors.Blue, fontSize: 16}}>
                    No data available for the selected period.
                  </Text>
                </View>
              )}
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
                <Text style={{color: Colors.Blue}}>Blood glucose</Text>
                <Text
                  style={{
                    color: Colors.Blue,
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  {average.toFixed(0) + ' '}
                  <Text
                    style={{
                      fontWeight: 'normal',
                    }}>
                    mg/dL
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
                <Text style={{color: Colors.Blue}}>Blood glucose</Text>
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
                    mg/dL
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
                <Text style={{color: Colors.Blue}}>Blood glucose</Text>
                <Text
                  style={{
                    color: Colors.Blue,
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  {highestValue + ' '}
                  <Text
                    style={{
                      fontWeight: 'normal',
                    }}>
                    mg/dL
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
                <Text style={{color: Colors.Blue}}>Blood glucose</Text>
                <Text
                  style={{
                    color: Colors.Blue,
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  {lowestValue + ' '}
                  <Text
                    style={{
                      fontWeight: 'normal',
                    }}>
                    mg/dL
                  </Text>
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default BloodGlucoseStats;

const styles = StyleSheet.create({});
