import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CommonVideoCallLayout from './components/CommonVideoCallLayout';
import CustomBottomModal from '../../../components/bottom-sheet/CommonButtonModal';
import MeasurementBox from '../my-profile/components/MeasurementBox';
import {Colors} from '../../../constants/Colors';
import {DummyImage} from '../../../assets/dummy/images';
import CommonLayoutModal from './components/CommonLayoutModal';
import CommonLayoutModalLocal from './CommonLayOutModal';
import {StaticImage} from '../../../assets/images';

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

const BloodOxygenModal = ({
  setTypeofMeasurement,
}: {
  setTypeofMeasurement: any;
}) => {
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
      heading="Blood oxygen"
      loading={loading}
      onPress={handleStartMeasurements}
      onBackPress={() => {
        setTypeofMeasurement('start');
      }}
      help={help}>
      <>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            // gap: 2,
            marginBottom: 12,
          }}>
          <MeasurementBox
            loading={loading}
            fields={{
              // name: 'SpO2H',
              value: values.spo2,
              unit: 'SpO2H',
            }}
            customStyles={{
              width: '70%',
              borderWidth: 1,
              borderColor: Colors.LightGray,
              borderTopLeftRadius: 8,
              borderBottomLeftRadius: 8,
            }}
          />
          <MeasurementBox
            loading={loading}
            fields={{
              name: 'Heart Rate',
              value: values.heartRate,
              unit: 'Beats/Min',
            }}
            customStyles={{
              borderWidth: 1,
              borderColor: Colors.LightGray,
              borderTopRightRadius: 8,
              borderBottomRightRadius: 8,
              width: '30%',
            }}
          />
        </View>
        {count !== 0 && (
          <View
            style={{
              paddingHorizontal: 20,
              backgroundColor: Colors.White,
              borderRadius: 10,
              // marginVertical: 11,
              marginBottom: 12,
              borderWidth: 1.4,
              borderColor: Colors.LightGray,
              paddingVertical: 10,
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
                  fontSize: 18,
                  fontWeight: '600',
                  color: Colors.Blue,
                }}>
                Normal level
              </Text>
            </View>
            <View>
              <Image
                source={DummyImage.bloodOxygen}
                width={400}
                style={{
                  width: '100%',
                  // height: 10,
                  marginTop: -50,
                  objectFit: 'contain',
                  marginBottom: -70,
                }}
              />
            </View>
          </View>
        )}
      </>
    </CommonLayoutModalLocal>
    // </CustomBottomModal>
  );
};

export default BloodOxygenModal;

const styles = StyleSheet.create({
  border: {
    borderWidth: 1,
    borderColor: Colors.LightGray,
  },
});
