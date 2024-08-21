import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Share,
} from 'react-native';
import React, {useState} from 'react';
import CommonMeasurementScreen from '../components/CommonMeasurementScreen';
import Header from '../../../../components/header/Header';
import MeasurementBox from '../components/MeasurementBox';
import {Colors} from '../../../../constants/Colors';
import {StaticImage} from '../../../../assets/images';

const help = [
  {
    page: '1',
    text: 'For best results make sure you are in a place with low light.',
    img: StaticImage.stopFromSunLight,
  },
  {
    page: '2',
    text: 'Adjust your position and keep still.',
    img: StaticImage.SittingPosition,
  },
  {
    page: '3',
    text: 'Keep the monitor on a flat surface.',
    img: StaticImage.FlatSurface,
  },
  {
    page: '4',
    text: 'Put the pad of your middle finger on the sensor at the top of the monitor.',
    img: StaticImage.TouchTheSensor,
  },
  {
    page: '5',
    text: 'To start measuring press the "Start measuring" button.',
    img: StaticImage.StartMeasuring,
  },
];

const HeartRateMeasurement = () => {
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [values, setValues] = useState({
    spo2: 0,
    heartRate: 0,
  });

  const handleStartMeasurements = () => {
    setLoading(true);
    const interval = setInterval(() => {
      setLoading(false);
      setValues({
        spo2: 100,
        heartRate: 74,
      });
      setCount(count + 1);
    }, 3000);
    return () => clearInterval(interval);
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Heart Rate: ${values.heartRate} Beats/Min, Blood Oxygen: ${values.spo2} SpO2H`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <CommonMeasurementScreen
        loading={loading}
        onPress={() => handleStartMeasurements()}
        element={
          <>
            <Header
              title="Heart rate"
              headerRightComponent={
                <TouchableOpacity onPress={onShare}>
                  <Image
                    source={StaticImage.SharerIcon}
                    style={{width: 24, height: 24}}
                  />
                </TouchableOpacity>
              }
            />
            <ScrollView>
              <View>
                <View
                  style={{paddingVertical: 12, width: '94%', margin: 'auto'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      gap: 2,
                    }}>
                    <MeasurementBox
                      loading={loading}
                      fields={{
                        name: '',
                        value: values.heartRate,
                        unit: 'Beats/Min',
                      }}
                      customStyles={{
                        width: '65%',
                        borderTopLeftRadius: 8,
                        borderBottomLeftRadius: 8,
                      }}
                    />
                    <MeasurementBox
                      loading={loading}
                      fields={{
                        name: 'Blood oxygen',
                        value: values.spo2,
                        unit: 'SpO2H',
                      }}
                      customStyles={{
                        width: '35%',
                        borderTopRightRadius: 8,
                        borderBottomRightRadius: 8,
                      }}
                    />
                  </View>
                  {/* You can uncomment this part if you need to display additional content after a measurement is taken */}
                  {/* {count !== 0 && (
                    <View
                      style={{
                        padding: 20,
                        backgroundColor: Colors.White,
                        borderRadius: 10,
                        marginVertical: 20,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 10,
                        }}>
                        <View
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: 20,
                            backgroundColor: Colors.Green,
                          }}></View>
                        <Text
                          style={{
                            fontSize: 20,
                            fontWeight: '600',
                            color: Colors.Blue,
                          }}>
                          Normal blood pressure
                        </Text>
                      </View>
                      <View>
                        <Image
                          source={DummyImage.bp}
                          width={400}
                          style={{
                            width: '100%',
                            // height: 10,
                            marginTop: 30,
                          }}
                        />
                      </View>
                    </View>
                  )} */}
                </View>
              </View>
            </ScrollView>
          </>
        }
        help={help}
      />
    </>
  );
};

export default HeartRateMeasurement;

const styles = StyleSheet.create({});
