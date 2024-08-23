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

const BloodPressureModal = ({
  setTypeofMeasurement,
}: {
  setTypeofMeasurement: any;
}) => {
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

  return (
    // <CustomBottomModal
    //   isVisible={true}
    //   onBackdropPress={() => setTypeofMeasurement('')}>
    <CommonLayoutModalLocal
      heading="Blood pressure"
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
            // justifyContent: 'space-between',
            // gap: 2,
            marginBottom: 12,
          }}>
          <MeasurementBox
            loading={loading}
            fields={{
              name: 'Systolic',
              value: values.systolic,
              unit: 'mmHg',
            }}
            customStyles={{
              borderWidth: 1,
              borderColor: Colors.LightGray,
              borderTopLeftRadius: 8,
              borderBottomLeftRadius: 8,
              width: '34%',
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
              borderWidth: 1,
              borderColor: Colors.LightGray,
              width: '34%',
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
              borderWidth: 1,
              borderColor: Colors.LightGray,
              borderRadius: 8,
              width: '30%',
              marginLeft: 5,
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
                Normal blood pressure
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

export default BloodPressureModal;

const styles = StyleSheet.create({
  border: {
    borderWidth: 1,
    borderColor: Colors.LightGray,
  },
});
