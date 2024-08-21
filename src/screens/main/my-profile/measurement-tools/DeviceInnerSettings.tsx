import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import {Colors} from '../../../../constants/Colors';
import Header from '../../../../components/header/Header';
import DeviceItems from '../components/DeviceItems';
import MeasurementChangeCard from '../UiUpdateComponents/MeasurementChangeCard';
import ECGSettingsGainCard from '../UiUpdateComponents/ECGSettingsGainCard';
import {title} from 'process';
import {Switch} from 'react-native-paper';

const DeviceInnerSettings = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [items, setItems] = useState({});
  const [selectedPaperSpeed, setSelectedPaperSpeed] = useState('25 mm/s');
  const [selectedGain, setSelectedGain] = useState('10 mm/mv');
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const toggleNotification = () =>
    setNotificationEnabled(previousState => !previousState);

  const handlePressPaperSpeed = () => {
    const item = {
      title: 'Paper speed',
      unit1: '25 mm/s',
      unit2: '50 mm/s',
    };
    setItems(item);
    setIsClicked(true);
  };

  const handlePressGain = () => {
    const item = {
      title: 'Gain',
      unit1: '5 mm/mv',
      unit2: '10 mm/mv',
      unit3: '20 mm/mv',
    };
    setItems(item);
    setIsClicked(true);
  };

  const handleModalClose = (value, selectedValue) => {
    if (items.title === 'Paper speed') {
      setSelectedPaperSpeed(selectedValue);
    } else if (items.title === 'Gain') {
      setSelectedGain(selectedValue);
    }
    setIsClicked(value);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.GhostWhite,
        position: 'relative',
      }}>
      <Header title={'ECG Settings'} />
      <ScrollView style={{paddingVertical: 12, width: '94%', margin: 'auto'}}>
        <View>
          <View style={styles.container}>
            <DeviceItems
              name="Paper speed"
              subtitle={selectedPaperSpeed}
              customStyle={{
                borderBottomWidth: 1,
                borderBottomColor: Colors.LightGray,
              }}
              onPress={() => handlePressPaperSpeed()}
            />
            <DeviceItems
              name="Gain"
              subtitle={selectedGain}
              onPress={() => handlePressGain()}
            />
          </View>
          <View
            style={{
              backgroundColor: Colors.White,
              paddingHorizontal: 20,
              paddingVertical: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: 10,
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                color: Colors.Blue,
              }}>
              Low performance mode
            </Text>
            <Switch
              trackColor={{false: Colors.LightGray, true: Colors.LighterGreen}}
              thumbColor={
                notificationEnabled ? Colors.LightGreen : Colors.White
              }
              ios_backgroundColor={Colors.LightBlack}
              onValueChange={toggleNotification}
              value={notificationEnabled}
            />
          </View>
        </View>
      </ScrollView>

      {isClicked && items && (
        <View style={styles.afterClick}>
          <ECGSettingsGainCard
            title={`${items?.title}`}
            active={handleModalClose}
            items={items}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default DeviceInnerSettings;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    borderRadius: 10,
    height: 'auto',
    overflow: 'hidden',
    marginBottom: 12,
  },
  afterClick: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: 1,
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
});
