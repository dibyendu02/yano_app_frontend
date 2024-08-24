import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CommonVideoCallLayout from './components/CommonVideoCallLayout';
import CustomBottomModal from '../../../components/bottom-sheet/CommonButtonModal';
import MeasurementBox from '../my-profile/components/MeasurementBox';
import {Colors} from '../../../constants/Colors';
import {DummyImage} from '../../../assets/dummy/images';
import CommonLayoutModal from './components/CommonLayoutModal';
import {StaticImage} from '../../../assets/images';
import CommonLayoutModalLocal from './CommonLayOutModal';

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

const ECGModal = ({setTypeofMeasurement}: {setTypeofMeasurement: any}) => {
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

  return (
    // <CustomBottomModal
    //   isVisible={true}
    //   onBackdropPress={() => setTypeofMeasurement('')}>
    <CommonLayoutModalLocal
      heading="ECG"
      loading={loading}
      help={help}
      onPress={handleStartMeasurements}
      onBackPress={() => {
        setTypeofMeasurement('start');
      }}>
      <>
        <View
          style={{
            backgroundColor: Colors.White,
            width: '100%',
            borderRadius: 10,
            // paddingVertical: 20,
          }}>
          <Image
            source={DummyImage.graph}
            style={{
              width: '100%',
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
        <View style={{marginVertical: 12}}>
          {count === 0 ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                // gap: 2,
                // padding: 12,
                paddingTop: 12,
                borderWidth: 1,
                borderColor: Colors.LightGray,
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
                  width: '50%',
                  borderRightWidth: 1,
                  borderColor: Colors.LightGray,
                  borderTopLeftRadius: 8,
                  borderBottomLeftRadius: 8,
                  height: '70%',
                  paddingVertical: 0,
                }}
              />
              <MeasurementBox
                loading={loading}
                fields={{
                  name: 'Time Left',
                  value: values.spo2,
                  unit: 'Seconds',
                }}
                customStyles={{
                  // borderWidth: 1,
                  // borderColor: Colors.LightGray,
                  borderTopRightRadius: 8,
                  borderBottomRightRadius: 8,
                  width: '50%',
                  paddingVertical: 0,
                  paddingBottom: 12,
                }}
              />
            </View>
          ) : (
            <View
              style={{
                paddingHorizontal: 20,
                paddingTop: 20,
                backgroundColor: Colors.White,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: Colors.LightGray,
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
      </>
    </CommonLayoutModalLocal>
    // </CustomBottomModal>
  );
};

export default ECGModal;

const styles = StyleSheet.create({
  border: {
    borderWidth: 1,
    borderColor: Colors.LightGray,
  },
  title: {
    fontSize: 20,
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
  },
});
