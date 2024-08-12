import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CommonVideoCallLayout from './components/CommonVideoCallLayout'
import CustomBottomModal from '../../../components/bottom-sheet/CommonButtonModal'
import { Colors } from '../../../constants/Colors'
import StripCodeScroll from '../monitoring/measurements/components/StripCodeScroll'
import Header from '../../../components/header/Header'
import FilledButton from '../../../components/buttons/FilledButton'

const GlucoseLevelModal = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState(0)
  const [code, setCode] = useState('C20');

  const [values, setValues] = useState({
    systolic: 0,
    diastolic: 0,
    heartRate: 0
  })
  const handleStartMeasurements = () => {
    setLoading(true);
    const interval = setInterval(() => {
      setLoading(false);
      setValues({
        systolic: 119,
        diastolic: 78,
        heartRate: 73
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
        <>
          <Header title={'Blood Glucose'} />
          <View
            style={{
              backgroundColor: 'white',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              margin: 15,
              borderRadius: 10,
              padding: 15,
            }}>
            <Text
              style={{
                color: Colors.SteelBlue,
                fontSize: 16,
                marginBottom: 20,
                fontWeight: '500',
              }}>
              Select the test strip code, then press the next button.
            </Text>
            <StripCodeScroll setCode={setCode} />
          </View>
          <View style={styles.addBtn}>
            <FilledButton
              label={'Back'}
              // icon={
              // }
              type={'lightGrey'}
              style={{ width: '48%', alignSelf: 'center', marginVertical: 14 }}
              onPress={() => navigation.goBack()}
              activeOpacity={0.8}
            />
            <FilledButton
              label={'Next'}
              // icon={
              // }
              type={'blue'}
              style={{ width: '48%', alignSelf: 'center', marginVertical: 14 }}
              onPress={() => navigation.navigate('BloodGlucoseStep1')}
              activeOpacity={0.8}
            />
          </View>
        </>
      </CustomBottomModal>
    </CommonVideoCallLayout >
  )
}

export default GlucoseLevelModal

const styles = StyleSheet.create({
  border: {
    borderWidth: 1,
    borderColor: Colors.LightGray,
  },
  addBtn: {
    // position: 'absolute',
    // bottom: 0,
    // left: 0,
    width: '100%',
    backgroundColor: Colors.White,
    padding: 10,
    paddingHorizontal: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})