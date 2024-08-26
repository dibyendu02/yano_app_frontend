import {
  Image,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../../../../components/header/Header';
import {Colors} from '../../../../constants/Colors';
import CommonMeasurementScreen from '../components/CommonMeasurementScreen';
import MeasurementBox from '../components/MeasurementBox';
import {DummyImage} from '../../../../assets/dummy/images';
import {StaticImage} from '../../../../assets/images';

const help = [
  {
    page: '1',
    text: 'Sit in a comfortable position with your back straight and your legs uncrossed.',
    img: StaticImage.SittingPosition,
  },
  {
    page: '2',
    text: 'Remove clothing from the upper part of the elbow. The device must make direct contact with the skin.',
    img: StaticImage.RemovingElbowCloth,
  },
  {
    page: '3',
    text: 'Insert your left arm into the cuff, then wrap it around your arm.',
    img: StaticImage.WrapAroundSolder,
  },
  {
    page: '4',
    text: 'The device should be placed against the inside of the arm.',
    img: StaticImage.AgainstInsideTheArm,
  },
  {
    page: '5',
    text: 'To take your blood pressure, place your arm on a table and hold it at the level of your heart.',
    img: StaticImage.PlaceTheArmOnTheTable,
  },
  {
    page: '6',
    text: 'To start measuring press the "Start measuring" button.',
    img: StaticImage.StartMeasuring,
  },
];

const BloodPressureScreen = () => {
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [values, setValues] = useState({
    systolic: 0,
    diastolic: 0,
    heartRate: 0,
  });

  const handleStartMeasurements = () => {
    setLoading(true);
    const interval = setInterval(() => {
      setLoading(false);
      setValues({
        systolic: 119,
        diastolic: 78,
        heartRate: 73,
      });
      setCount(count + 1);
    }, 3000);
    return () => clearInterval(interval);
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Blood Pressure Measurements:\nSystolic: ${values.systolic} mmHg\nDiastolic: ${values.diastolic} mmHg\nHeart Rate: ${values.heartRate} Beats/Min`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Shared with activity type of result.activityType
        } else {
          // Shared
        }
      } else if (result.action === Share.dismissedAction) {
        // Dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <CommonMeasurementScreen
      loading={loading}
      onPress={handleStartMeasurements}
      count={count}
      element={
        <>
          <Header
            title="Blood pressure"
            headerRightComponent={
              <TouchableOpacity onPress={onShare}>
                <Image
                  source={StaticImage.SharerIcon}
                  style={{width: 24, height: 24}}
                />
              </TouchableOpacity>
            }
          />
          <ScrollView
            style={{paddingVertical: 12, width: '94%', margin: 'auto'}}>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  gap: 2,
                }}>
                <MeasurementBox
                  loading={loading}
                  fields={{
                    name: 'Systolic',
                    value: values.systolic,
                    unit: 'mmHg',
                  }}
                  customStyles={{
                    borderTopLeftRadius: 8,
                    borderBottomLeftRadius: 8,
                    width: '34.5%',
                  }}
                />
                <MeasurementBox
                  loading={loading}
                  fields={{
                    name: 'Diastolic',
                    value: values.diastolic,
                    unit: 'mmHg',
                  }}
                  customStyles={{
                    borderTopRightRadius: 8,
                    borderBottomRightRadius: 8,
                  }}
                />
                <MeasurementBox
                  loading={loading}
                  fields={{
                    name: 'Heart rate',
                    value: values.heartRate,
                    unit: 'Beats/Min',
                  }}
                  customStyles={{
                    marginLeft: 5,
                    borderRadius: 8,
                    width: '30%',
                  }}
                />
              </View>

              {count !== 0 && (
                <View
                  style={{
                    padding: 20,
                    backgroundColor: Colors.White,
                    borderRadius: 10,
                    marginVertical: 12,
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
                  <View style={{position: 'relative', height: 120}}>
                    <Image
                      source={DummyImage.bp}
                      width={400}
                      style={{
                        width: '100%',
                        // height: '100%',
                        marginTop: 20,
                        objectFit: 'contain',
                        position: 'absolute',
                        bottom: -100,
                      }}
                    />
                  </View>
                </View>
              )}
            </View>
          </ScrollView>
        </>
      }
      help={help}
    />
  );
};

export default BloodPressureScreen;

const styles = StyleSheet.create({
  heading: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  value: {
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 6,
    color: Colors.Blue,
  },
  unit: {
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
  },
});
