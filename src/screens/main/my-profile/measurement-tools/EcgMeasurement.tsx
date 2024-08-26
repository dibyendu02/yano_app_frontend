import {
  Image,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CommonMeasurementScreen from '../components/CommonMeasurementScreen';
import Header from '../../../../components/header/Header';
import MeasurementBox from '../components/MeasurementBox';
import {Colors} from '../../../../constants/Colors';
import {DummyImage} from '../../../../assets/dummy/images';
import {ShareIcon} from '../../../../assets/icon/IconNames';
import {StaticImage} from '../../../../assets/images';
import Card from '../../../../components/cards/Card';

const help = [
  {
    page: '1',
    text: 'Sit in a comfortable position with your back straight and your legs uncrossed.',
    img: StaticImage.SittingPosition,
  },
  {
    page: '2',
    text: 'Hold the device with your left hand and with your thumb touches the metal part at the top of the blood oxygen sensor.',
    img: StaticImage.ThumpTouchesTheMetalpart,
  },
  {
    page: '3',
    text: 'Your index and middle fingers should touch the metal on the back of the device.',
    img: StaticImage.MFingureTouchBackMetal,
  },
  {
    page: '4',
    text: 'With the index finger of the right hand, touch the body temperature sensor. The two hands should not touch.',
    img: StaticImage.TwoHandShouldNotTouch,
  },
  {
    page: '5',
    text: 'To start measuring press the "Start measuring" button.',
    img: StaticImage.StartMeasuring,
  },
];

const EcgMeasurement = () => {
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [values, setValues] = useState({
    spo2: 0,
    heartRate: 0,
  });
  const [timer, setTimer] = useState(31);

  const handleStartMeasurements = () => {
    setCount(0);
    setLoading(true);
    setTimer(31); // Start with a 30-second timer
    setValues({
      spo2: 100,
      heartRate: 80,
    });

    const interval = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer <= 27) {
          clearInterval(interval);
          setLoading(false);
          setCount(count + 1); // Increment count after the measurement completes
          return 0;
        } else {
          return prevTimer - 1;
        }
      });
    }, 1000); // Decrement every second
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
        count={count}
        element={
          <>
            <Header
              title="ECG"
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
                  style={{
                    backgroundColor: Colors.White,
                    width: '100%',
                    borderRadius: 10,
                    padding: 20,
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={timer == 31 ? DummyImage.grid : DummyImage.graph}
                    style={{
                      width: '100%',
                      height: 165,
                      objectFit: 'cover',
                    }}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      marginTop: 20,
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '500',
                        color: Colors.SteelBlue,
                      }}>
                      Gain: 10mm/mV
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '500',
                        color: Colors.SteelBlue,
                      }}>
                      Paper speed: 10mm/mV
                    </Text>
                  </View>
                </View>
                <View style={{padding: 15}}>
                  <View style={{padding: 0}}>
                    {count === 0 ? (
                      <View
                        style={{
                          padding: 10,
                          backgroundColor: Colors.White,
                          borderRadius: 8,
                          paddingVertical: 15,
                        }}>
                        <View
                          style={{
                            backgroundColor: Colors.LightGray,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            gap: 2,
                            borderRadius: 8,
                          }}>
                          <MeasurementBox
                            loading={loading}
                            fields={{
                              name: 'Heart Rate',
                              value: values.heartRate,
                              unit: 'Beats/Min',
                            }}
                            customStyles={{
                              width: '50.5%',
                              borderTopLeftRadius: 8,
                              borderBottomLeftRadius: 8,
                            }}
                          />
                          <MeasurementBox
                            loading={false}
                            fields={{
                              name: 'Time Left',
                              value: timer % 31,
                              unit: 'Seconds',
                            }}
                            customStyles={{
                              width: '49.5%',
                              borderTopRightRadius: 8,
                              borderBottomRightRadius: 8,
                            }}
                          />
                        </View>
                      </View>
                    ) : (
                      <View
                        style={{
                          paddingHorizontal: 20,
                          paddingTop: 20,
                          backgroundColor: Colors.White,
                          borderRadius: 10,
                          // borderWidth: 1,
                          // borderColor: Colors.LightGray,
                        }}>
                        <Text style={styles.title}>Sample details</Text>
                        <View style={styles.boxStyle}>
                          <Text style={styles.text}>ECG date:</Text>
                          <Text
                            style={[
                              styles.text,
                              {color: Colors.Blue, fontWeight: '600'},
                            ]}>
                            16/2/2022 - 13:45 PM
                          </Text>
                        </View>
                        <View style={styles.boxStyle}>
                          <Text style={styles.text}>Average heart rate:</Text>
                          <Text
                            style={[
                              styles.text,
                              {color: Colors.Blue, fontWeight: '600'},
                            ]}>
                            80 LPM
                          </Text>
                        </View>
                        <View
                          style={[
                            styles.boxStyle,
                            {
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            },
                          ]}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              gap: 6,
                            }}>
                            <Text style={styles.text}>RR Max:</Text>
                            <Text
                              style={[
                                styles.text,
                                {color: Colors.Blue, fontWeight: '600'},
                              ]}>
                              804
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              gap: 6,
                            }}>
                            <Text style={styles.text}>RR Min:</Text>
                            <Text
                              style={[
                                styles.text,
                                {color: Colors.Blue, fontWeight: '600'},
                              ]}>
                              693
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              gap: 6,
                            }}>
                            <Text style={styles.text}>HRV:</Text>
                            <Text
                              style={[
                                styles.text,
                                {color: Colors.Blue, fontWeight: '600'},
                              ]}>
                              28
                            </Text>
                          </View>
                        </View>
                        <View style={styles.boxStyle}>
                          <Text style={styles.text}>Respiratory rate:</Text>
                          <Text
                            style={[
                              styles.text,
                              {color: Colors.Blue, fontWeight: '600'},
                            ]}>
                            19
                          </Text>
                        </View>
                        <View style={[styles.boxStyle, {borderBottomWidth: 0}]}>
                          <Text style={styles.text}>Mood:</Text>
                          <Text
                            style={[
                              styles.text,
                              {color: Colors.Blue, fontWeight: '600'},
                            ]}>
                            Relaxed
                          </Text>
                        </View>
                      </View>
                    )}
                  </View>
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

                  {/* card add here after data  */}
                  {/* {count !== 0 && <Card></Card>} */}
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

export default EcgMeasurement;

const styles = StyleSheet.create({
  border: {
    borderWidth: 1,
    borderColor: Colors.LightGray,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.Blue,
    marginBottom: 6,
  },
  boxStyle: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    marginVertical: 10,
    borderBottomWidth: 1,
    borderColor: Colors.LightGray,
    paddingBottom: 10,
  },
  text: {
    fontSize: 16,
    color: Colors.SteelBlue,
    // marginRight: 5,
  },
});
