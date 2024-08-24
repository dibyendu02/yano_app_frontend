import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CommonVideoCallLayout from './components/CommonVideoCallLayout';
import CustomBottomModal from '../../../components/bottom-sheet/CommonButtonModal';
import {Colors} from '../../../constants/Colors';
import StripCodeScroll from '../monitoring/measurements/components/StripCodeScroll';
import Header from '../../../components/header/Header';
import FilledButton from '../../../components/buttons/FilledButton';
import {useNavigation} from '@react-navigation/native';
import RadioButton from '../monitoring/measurements/components/RadioButton';
import CommonHeaderLocal from './components/CompoundHeaderLocal';
import Icons from '../../../assets/icon/Icon';
import {StaticImage} from '../../../assets/images';
import {DummyImage} from '../../../assets/dummy/images';
import {UTurnIcon} from '../../../assets/icon/IconNames';
import BloodGlucoseLayoutModalLocal from './BloodGlucoseLayoutModal';

const GlucoseLevelModal = ({setTypeofMeasurement}: any) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [code, setCode] = useState('C20');
  const [time, setTime] = useState('');

  const [step, setStep] = useState('start');

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

  useEffect(() => {
    setTimeout(() => {
      if (step == 'step3') setStep('measurement');
      if (step == 'measurement') setStep('result');
    }, 2000);
  }, [step]);

  return (
    // <CustomBottomModal
    //   isVisible={true}
    //   onBackdropPress={() => setTypeofMeasurement('')}>
    <BloodGlucoseLayoutModalLocal
      heading="Blood glucose"
      onBackPress={() => {
        setTypeofMeasurement('start');
      }}>
      <View style={{paddingLeft: 0}}>
        {step == 'start' && (
          <View
            style={{
              backgroundColor: Colors.White,
              // marginTop: 12,
              width: '96%',
              margin: 'auto',
              borderRadius: 10,
              paddingRight: 15,
            }}>
            <Text
              style={{
                color: Colors.SteelBlue,
                fontSize: 16,
                marginBottom: 20,
                fontWeight: '500',
              }}>
              Please choose the measurement time, then press the next button.
            </Text>
            <RadioButton
              label="Before breakfast"
              value="before-breakfast"
              selectedValue={time}
              onValueChange={setTime}
            />
            <View
              style={{width: '100%', height: 1, backgroundColor: '#E9E9E9'}}
            />
            <RadioButton
              label="After breakfast"
              value="after-breakfast"
              selectedValue={time}
              onValueChange={setTime}
            />
            <View
              style={{width: '100%', height: 1, backgroundColor: '#E9E9E9'}}
            />
            <RadioButton
              label="Before lunch"
              value="before-lunch"
              selectedValue={time}
              onValueChange={setTime}
            />
            <View
              style={{width: '100%', height: 1, backgroundColor: '#E9E9E9'}}
            />
            <RadioButton
              label="After lunch"
              value="after-lunch"
              selectedValue={time}
              onValueChange={setTime}
            />
            <View
              style={{width: '100%', height: 1, backgroundColor: '#E9E9E9'}}
            />
            <RadioButton
              label="Before dinner"
              value="before-dinner"
              selectedValue={time}
              onValueChange={setTime}
            />
            <View
              style={{width: '100%', height: 2, backgroundColor: '#E9E9E9'}}
            />
            <RadioButton
              label="After dinner"
              value="after-dinner"
              selectedValue={time}
              onValueChange={setTime}
            />
          </View>
        )}
        {step == 'strips' && (
          <View
            style={{
              backgroundColor: 'white',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              // marginTop: 12,
              width: '100%',
              margin: 'auto',
              borderRadius: 10,
              padding: 15,
              paddingLeft: 0,
              paddingTop: 0,
            }}>
            <Text
              style={{
                color: Colors.SteelBlue,
                fontSize: 16,
                marginBottom: 20,
                fontWeight: '500',
                marginRight: 20,
              }}>
              Select the test strip code, then press the next button.
            </Text>
            <StripCodeScroll setCode={setCode} />
          </View>
        )}
        {step == 'step1' && (
          <View
            style={{
              backgroundColor: 'white',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              // marginTop: 12,
              width: '100%',
              margin: 'auto',
              borderRadius: 10,
              padding: 15,
              paddingLeft: 0,
              paddingTop: 0,
            }}>
            <Text
              style={{
                color: Colors.Blue,
                fontSize: 18,
                marginBottom: 20,
                fontWeight: '400',
              }}>
              Insert the test strip into the receiving hole, then press next.
            </Text>
            <View>
              <Image
                source={StaticImage.InsertTheStrip}
                style={{
                  height: 296,
                  width: 296,
                }}
              />
            </View>
          </View>
        )}
        {step == 'step2' && (
          <View
            style={{
              backgroundColor: 'white',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              // marginTop: 12,
              width: '105%',
              margin: 'auto',
              borderRadius: 10,
              padding: 15,
              paddingLeft: 0,
              paddingTop: 0,
            }}>
            <Text
              style={{
                color: Colors.Blue,
                fontSize: 18,
                marginBottom: 20,
                fontWeight: '400',
              }}>
              Take a drop of blood from one of your fingers using a lancing
              device.
            </Text>
            <View>
              <Image
                source={StaticImage.TakeADropOfBlood}
                style={{
                  height: 296,
                  width: 296,
                }}
              />
            </View>
          </View>
        )}
        {step == 'step3' && (
          <View
            style={{
              backgroundColor: 'white',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              // marginTop: 12,
              width: '105%',
              margin: 'auto',
              borderRadius: 10,
              padding: 15,
              paddingLeft: 0,
              paddingTop: 0,
            }}>
            <Text
              style={{
                color: Colors.Blue,
                fontSize: 18,
                marginBottom: 20,
                fontWeight: '400',
              }}>
              Touch the tip of the test strip to the drop of blood until the
              receiving window is completely filled. The measurement will start
              automatically when the blood is detected.
            </Text>
            <View>
              <Image
                source={StaticImage.Blood_detected}
                style={{
                  height: 296,
                  width: 296,
                }}
              />
            </View>
          </View>
        )}

        {step == 'measurement' && (
          <View
            style={{
              backgroundColor: 'white',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              // marginTop: 12,
              width: '100%',
              margin: 'auto',
              borderRadius: 10,
              padding: 15,
              paddingLeft: 0,
              paddingTop: 0,
            }}>
            <Text
              style={{
                color: Colors.SteelBlue,
                fontSize: 16,
                marginBottom: 20,
                fontWeight: '500',
              }}>
              The blood sample was detected. Wait a few seconds to get the
              result.
            </Text>
            <ActivityIndicator size={'large'} color={Colors.Blue} />
          </View>
        )}

        {step == 'result' && (
          <>
            <View
              style={{
                backgroundColor: 'white',
                // marginVertical: 12,
                width: '96%',
                margin: 'auto',
                height: 90,
                borderRadius: 8,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1.4,
                borderColor: Colors.LightGray,
              }}>
              <Text
                style={{fontSize: 40, fontWeight: '600', color: Colors.Blue}}>
                5.0
              </Text>
              <Text style={{color: Colors.SteelBlue}}>mmol/L</Text>
            </View>
            <View
              style={{
                backgroundColor: 'white',
                marginHorizontal: 10,
                height: 120,
                borderRadius: 8,
                flexDirection: 'column',
                padding: 15,
                //   alignItems: 'center',
                //   justifyContent: 'center',
                borderWidth: 1.4,
                borderColor: Colors.LightGray,
                marginTop: 12,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 10,
                  // alignItems: 'center',
                  position: 'relative',
                  height: '120%',
                }}>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 30,
                    backgroundColor: Colors.Green,
                  }}
                />
                <Text
                  style={{fontSize: 18, fontWeight: '600', color: Colors.Blue}}>
                  Normal glucose level
                </Text>
              </View>
              <Image
                source={DummyImage.bloodOxygen}
                style={{
                  marginTop: 15,
                  width: '100%',
                  objectFit: 'contain',
                  position: 'absolute',
                  bottom: -60,
                  left: 20,
                }}
              />
            </View>
          </>
        )}
        <View
          style={[
            styles.addBtn,
            {justifyContent: step == 'start' ? 'flex-end' : 'space-between'},
            // {justifyContent: step == 'step3' ? 'flex-start' : 'space-between'},
          ]}>
          {(step == 'strips' ||
            step == 'step1' ||
            step == 'step2' ||
            step == 'step3') && (
            <FilledButton
              label={'Back'}
              // icon={
              // }
              type={'lightGrey'}
              style={{width: '48%', alignSelf: 'center', marginVertical: 14}}
              onPress={() => {
                if (step == 'strips') setStep('start');
                if (step == 'step1') setStep('strips');
                if (step == 'step2') setStep('step1');
                if (step == 'step3') setStep('step2');
              }}
              activeOpacity={0.8}
            />
          )}
          {(step == 'start' ||
            step == 'strips' ||
            step == 'step1' ||
            step == 'step2') && (
            <FilledButton
              label={'Next'}
              // icon={
              // }
              type={'blue'}
              style={{width: '48%', alignSelf: 'center', marginVertical: 14}}
              onPress={() => {
                if (step == 'start') setStep('strips');
                if (step == 'strips') setStep('step1');
                if (step == 'step1') setStep('step2');
                if (step == 'step2') setStep('step3');
                // if (step == 'step3') setStep('measurement');
              }}
              activeOpacity={0.8}
            />
          )}

          {step == 'measurement' && (
            <FilledButton
              label={'Stop measurement'}
              onPress={() => setStep('start')}
              type={'red'}
              style={{width: '100%', alignSelf: 'center', marginVertical: 14}}
              activeOpacity={0.8}
            />
          )}
          {step == 'result' && (
            <FilledButton
              label={'Start again'}
              icon={<UTurnIcon color="white" />}
              type={'blue'}
              style={{width: '100%', alignSelf: 'center', marginBottom: 12}}
              onPress={() => setStep('start')}
              activeOpacity={0.8}
            />
          )}
        </View>
      </View>
    </BloodGlucoseLayoutModalLocal>
    // </CustomBottomModal>
  );
};

export default GlucoseLevelModal;

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
    paddingHorizontal: 15,
    flexDirection: 'row',
    // justifyContent: step == 'start' ? 'flex-end' 'space-between',
  },
});
