import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CommonVideoCallLayout from './components/CommonVideoCallLayout'
import CustomBottomModal from '../../../components/bottom-sheet/CommonButtonModal' 
import MeasurementBox from '../my-profile/components/MeasurementBox'
import { Colors } from '../../../constants/Colors'
import { DummyImage } from '../../../assets/dummy/images' 
import CommonLayoutModal from './components/CommonLayoutModal'

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
        <CommonLayoutModal heading="Heart Rate" loading={loading} onPress={handleStartMeasurements} >
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
                  unit: 'Beats/min'
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
            <View>
              {count !== 0 &&
                <View style={{
                  padding: 20,
                  backgroundColor: Colors.White,
                  borderRadius: 10,
                  marginVertical: 20,
                }} >
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10
                  }}>
                    <View style={{
                      width: 20,
                      height: 20,
                      borderRadius: 20,
                      backgroundColor: Colors.Green
                    }} ></View>
                    <Text style={{
                      fontSize: 20,
                      fontWeight: '600',
                      color: Colors.Blue
                    }} >Normal blood pressure</Text>
                  </View>
                  <View>
                    <Image
                      source={DummyImage.bp}
                      width={400}
                      style={{
                        width: '100%', 
                        marginTop: 30
                      }}
                    />
                  </View>
                </View>
              }
            </View>
          </>
        </CommonLayoutModal> 
      </CustomBottomModal>
    </CommonVideoCallLayout>
  )
}

export default HeartRateModal