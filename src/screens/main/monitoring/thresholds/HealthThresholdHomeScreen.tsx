import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../../../constants/Colors';
import Header from '../../../../components/header/Header';
import SwitchButton from '../../../../components/formComp/SwitchButton';
import PatientElements from '../../../../components/PatientElements';
import {navigate} from '../../../../navigation/RootNavigation';

const thresholdsItems = [
  {
    name: 'Heart rate',
    path: 'HeartRate',
  },
  {
    name: 'Blood oxygen',
    path: 'BloodOxygen',
  },
  {
    name: 'Blood pressure',
    path: 'BloodPressure',
  },
  {
    name: 'Body temperature',
    path: 'BodyTemperature',
  },
  {
    name: 'Glucose level',
    path: 'GlucoseLevel',
  },
];

const HealthThresholdHomeScreen = () => {
  const [value, setValue] = useState(false);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.GhostWhite,
        position: 'relative',
      }}>
      <Header title={'Health thresholds'} />
      <ScrollView style={{paddingVertical: 12, width: '94%', margin: 'auto'}}>
        <View>
          <SwitchButton
            customStyle={{paddingHorizontal: 16, paddingVertical: 20}}
            label={'Activate health thresholds'}
            getValue={(val: boolean) => setValue(val)}
          />
          <View
            style={{
              marginVertical: 12,
              borderRadius: 10,
              overflow: 'hidden',
              opacity: value ? 1 : 0.5,
            }}>
            {thresholdsItems.map((item, i) => (
              <PatientElements
                key={i}
                name={item.name}
                color="black"
                customStyle={{
                  paddingVertical: 18.5,
                  paddingHorizontal: 16,
                  borderRadius: 0,
                  borderBottomWidth: 1,
                  borderBottomColor: Colors.LightGray,
                }}
                customTextStyle={{
                  marginLeft: 0,
                }}
                onPress={() => value && navigate(item.path)}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HealthThresholdHomeScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.White,
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    color: Colors.Blue,
    fontWeight: '600',
  },
});
