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
import CommonMeasurementScreen from '../components/CommonMeasurementScreen';
import Header from '../../../../components/header/Header';
import MeasurementBox from '../components/MeasurementBox';
import {Colors} from '../../../../constants/Colors';
import {DummyImage} from '../../../../assets/dummy/images';
import {ShareIcon} from '../../../../assets/icon/IconNames';
import {StaticImage} from '../../../../assets/images';
const help = [
  {
    page: '1',
    text: 'Point the temperature sensor at the center of the forehead.',
    img: StaticImage.CentreToForeHead,
  },
  {
    page: '2',
    text: 'Keep the device at a distance of 1-2 cm from the skin.',
    img: StaticImage.TwoCmFromForeHead,
  },
  {
    page: '3',
    text: 'To start measuring press the "Start measuring" button.',
    img: StaticImage.StartMeasuring,
  },
];
const BodyTemperatureMeasurement = () => {
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

  const [values, setValues] = useState(0);
  const handleStartMeasurements = () => {
    setLoading(true);
    const interval = setInterval(() => {
      setLoading(false);
      setValues(37.1);
      setCount(count + 1);
    }, 3000);
    return () => clearInterval(interval);
  };
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Body Temperature: ${values}°C`,
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
        element={
          <>
            <Header
              title="Body temperature"
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
                        name: '',
                        value: values,
                        unit: '°C',
                      }}
                      customStyles={{
                        width: '100%',
                        borderRadius: 8,
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
                          Normal
                        </Text>
                      </View>
                      <View style={{position: 'relative', height: 60}}>
                        <Image
                          source={DummyImage.bodyTemp}
                          width={400}
                          style={{
                            width: '100%',
                            // height: '100%',
                            marginTop: 20,
                            objectFit: 'contain',
                            position: 'absolute',
                            bottom: -80,
                          }}
                        />
                      </View>
                    </View>
                  )}
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

export default BodyTemperatureMeasurement;

const styles = StyleSheet.create({});
