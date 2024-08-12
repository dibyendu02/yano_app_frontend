import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CommonVideoCallLayout from './components/CommonVideoCallLayout'
import CustomBottomModal from '../../../components/bottom-sheet/CommonButtonModal'
import MeasurementBox from '../my-profile/components/MeasurementBox'
import { Colors } from '../../../constants/Colors'
import { DummyImage } from '../../../assets/dummy/images'
import CommonLayoutModal from './components/CommonLayoutModal'
import CommonLayoutModalLocal from './CommonLayOutModal'
import { StaticImage } from '../../../assets/images'


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
const HeartRateModal = () => {
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState(0)

  const [values, setValues] = useState({
    spo2: 0,
    heartRate: 0
  })
  const handleStartMeasurements = () => {
    setLoading(true);
    const interval = setInterval(() => {
      setLoading(false);
      setValues({
        spo2: 100,
        heartRate: 74
      })
      setCount(count + 1)
    }, 3000);
    return () => clearInterval(interval);
  }

  return (
    <CommonVideoCallLayout>
      <CustomBottomModal
        isVisible={true}
        onBackdropPress={() => (<></>)}
      >
        <CommonLayoutModalLocal heading="Heart Rate" loading={loading} onPress={handleStartMeasurements}
          help={help}
        >
          <>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: 2,
              marginBottom: 20
            }}>
              <MeasurementBox
                loading={loading}
                fields={{
                  name: 'Heart Rate',
                  value: values.heartRate,
                  unit: 'Beats/Min'
                }}
                customStyles={{
                  width: '60%',
                  borderWidth: 1,
                  borderColor: Colors.LightGray,
                }}
              />
              <MeasurementBox
                loading={loading}
                fields={{
                  name: 'Blood Oxygen',
                  value: values.spo2,
                  unit: 'SpO2H'
                }}
                customStyles={{
                  width: '40%',
                  borderWidth: 1,
                  borderColor: Colors.LightGray,
                }}
              />
            </View>
          </>
        </CommonLayoutModalLocal>
      </CustomBottomModal>
    </CommonVideoCallLayout>
  )
}

export default HeartRateModal