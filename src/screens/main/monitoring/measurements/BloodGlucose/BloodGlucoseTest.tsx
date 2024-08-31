import {
  ActivityIndicator,
  Image,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../../../../components/header/Header';
import {Colors} from '../../../../../constants/Colors';
import FilledButton from '../../../../../components/buttons/FilledButton';
import RadioButton from '../components/RadioButton';
import StripCodeScroll from '../components/StripCodeScroll';
import {StaticImage} from '../../../../../assets/images';
import {UTurnIcon} from '../../../../../assets/icon/IconNames';
import Scale from '../../../../../assets/measurements/images/bloodGlucose.png';

const BloodGlucoseTest = ({navigation}: any) => {
  const [step, setStep] = useState('landing');
  const [time, setTime] = useState('');
  const [code, setCode] = useState('C20');
  const [stopClicked, setStopClicked] = useState(false);
  const [value, setValue] = useState('0');

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Blood glucose: ${value} mmol/L`,
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

  useEffect(() => {
    if (step == 'step3')
      setTimeout(() => {
        setStep('measurement');
      }, 2000);

    //loading time would be implemented in future
    if (step == 'measurement')
      setTimeout(() => {
        setStep('result');
        setValue('5.0');
      }, 3000);

    if (stopClicked) setStep('start');
  }, [step, stopClicked]);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.GhostWhite,
        position: 'relative',
      }}>
      <Header
        title={'Blood glucose'}
        headerRightComponent={
          <TouchableOpacity onPress={onShare}>
            <Image
              source={StaticImage.SharerIcon}
              style={{width: 24, height: 24}}
            />
          </TouchableOpacity>
        }
      />
      {step == 'landing' && (
        <View
          style={{
            backgroundColor: 'white',
            marginTop: 12,
            width: '94%',
            margin: 'auto',
            height: 120,
            borderRadius: 8,
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 50, color: Colors.SteelBlue}}>_ _</Text>
          <Text style={{color: Colors.SteelBlue}}>mmol/L</Text>
        </View>
      )}
      {step == 'start' && (
        <View
          style={{
            backgroundColor: Colors.White,
            marginTop: 12,
            width: '94%',
            margin: 'auto',
            borderRadius: 8,
            padding: 15,
          }}>
          <Text
            style={{
              color: Colors.Blue,
              fontSize: 16,
              marginBottom: 20,
              fontWeight: '500',
              paddingRight: '15%',
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
            marginTop: 12,
            width: '94%',
            margin: 'auto',
            borderRadius: 8,
            padding: 15,
            paddingBottom: 40,
          }}>
          <Text
            style={{
              color: Colors.Blue,
              fontSize: 18,
              marginBottom: 20,
              // fontWeight: '500',
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
            marginTop: 12,
            width: '94%',
            margin: 'auto',
            borderRadius: 8,
            padding: 15,
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
            marginTop: 12,
            width: '94%',
            margin: 'auto',
            borderRadius: 8,
            padding: 15,
            paddingHorizontal: 0,
          }}>
          <Text
            style={{
              color: Colors.Blue,
              fontSize: 18,
              marginBottom: 20,
              fontWeight: '400',
              paddingHorizontal: 20,
              paddingLeft: 5,
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
            marginTop: 12,
            width: '94%',
            margin: 'auto',
            borderRadius: 8,
            padding: 15,
          }}>
          <Text
            style={{
              color: Colors.Blue,
              fontSize: 18,
              marginBottom: 20,
              fontWeight: '400',
            }}>
            Touch the tip of the test strip to the drop of blood {'\n'}
            until the receiving window is completely filled. The measurement
            will start automatically when the blood is detected.
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
            margin: 15,
            borderRadius: 8,
            padding: 15,
            paddingHorizontal: 10,
          }}>
          <Text
            style={{
              color: Colors.Blue,
              fontSize: 16,
              marginBottom: 20,
              // fontWeight: '500',
            }}>
            The blood sample was detected. Wait a few seconds to get the result.
          </Text>
          <ActivityIndicator size={'large'} color={Colors.Blue} />
        </View>
      )}

      {step == 'result' && (
        <View>
          <View
            style={{
              backgroundColor: 'white',
              marginVertical: 12,
              width: '94%',
              margin: 'auto',
              height: 120,
              borderRadius: 8,
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 40, fontWeight: '600', color: Colors.Blue}}>
              {value}
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
              source={Scale}
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
        </View>
      )}

      {/* buttons */}

      <View style={styles.addBtn}>
        {step == 'landing' && (
          <FilledButton
            label={'Start measuring'}
            type={'blue'}
            // style={{width: '92%', alignSelf: 'center', marginVertical: 14}}
            onPress={() =>
              // navigation.navigate('BloodGlucoseTestTime')
              setStep('start')
            }
            activeOpacity={0.8}
          />
        )}
        {(step == 'start' ||
          step == 'strips' ||
          step == 'step1' ||
          step == 'step2' ||
          step == 'step3') && (
          <View
            style={[
              // styles.addBtn,
              {
                // paddingLeft: 25,
                flexDirection: 'row',
                justifyContent: 'space-between',
                // gap: 10,
              },
            ]}>
            <FilledButton
              label={'Back'}
              type={'lightGrey'}
              style={{
                width: '48%',
                // alignSelf: 'center',
                // , marginVertical: 14
              }}
              onPress={() => {
                if (step == 'start') setStep('landing');
                if (step == 'strips') setStep('start');
                if (step == 'step1') setStep('strips');
                if (step == 'step2') setStep('step1');
                if (step == 'step3') setStep('step2');
              }}
              activeOpacity={0.8}
            />
            {step != 'step3' && (
              <FilledButton
                label={'Next'}
                type={'blue'}
                style={{width: '48%'}}
                onPress={() => {
                  if (step == 'start') {
                    setStep('strips');
                    setStopClicked(false);
                  }
                  if (step == 'strips') setStep('step1');
                  if (step == 'step1') setStep('step2');
                  if (step == 'step2') setStep('step3');
                }}
                activeOpacity={0.8}
              />
            )}
          </View>
        )}
        {step == 'measurement' && (
          <FilledButton
            label={'Stop measurement'}
            // icon={
            // }
            type={'red'}
            style={{width: '100%', alignSelf: 'center'}}
            activeOpacity={0.8}
            onPress={() => {
              setStopClicked(true);
              setStep('start');
            }}
          />
        )}
        {step == 'result' && (
          <FilledButton
            label={'Start again'}
            icon={<UTurnIcon color="white" />}
            type={'blue'}
            style={{width: '100%', alignSelf: 'center'}}
            onPress={() => setStep('start')}
            activeOpacity={0.8}
          />
        )}
      </View>
    </View>
  );
};

export default BloodGlucoseTest;

const styles = StyleSheet.create({
  addBtn: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: Colors.White,
    padding: 10,
  },
});
