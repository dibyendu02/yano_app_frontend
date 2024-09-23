import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../../../components/header/Header';
import {Colors} from '../../../../constants/Colors';
import MeasurementItems from '../components/MeasurementItems';
import {mangeDataList} from '../../../../assets/settings/SettingItem';
import {Card} from 'react-native-paper';
import DeleteAllDataCard from '../UiUpdateComponents/DeleteAllDataCard';
import {useIsFocused} from '@react-navigation/native';

const ManageYourData = () => {
  const [isCardActive, setIsCardActive] = useState(false);
  const isFocused = useIsFocused();
  const toggleCard = () => {
    setIsCardActive(!isCardActive);
  };
  // useEffect(() => {
  //   if (Platform.OS === 'android') {
  //     if (isFocused) {
  //       StatusBar.setTranslucent(true);
  //       StatusBar.setBarStyle('dark-content');
  //       StatusBar.setBackgroundColor('rgba(0, 0, 0, 0)');
  //     } else {
  //       StatusBar.setTranslucent(false);
  //       StatusBar.setBarStyle('dark-content');
  //       StatusBar.setBackgroundColor('rgba(0, 0, 0, 0)');
  //     }
  //   }
  // }, [isFocused]);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.GhostWhite,
        position: 'relative',
      }}>
      <Header title={'Manage your data'} />
      <ScrollView>
        <View style={{paddingVertical: 12, width: '94%', margin: 'auto'}}>
          <MeasurementItems data={mangeDataList} active={toggleCard} />
        </View>
      </ScrollView>
      {isCardActive && (
        <View style={styles.afterClick}>
          <DeleteAllDataCard
            title={`Permanently delete all your health data?`}
            children={
              'This will remove all your medical history, measurements and basic health information from our servers.'
            }
            active={toggleCard}
            // items={items}
          />
        </View>
      )}
    </View>
  );
};

export default ManageYourData;

const styles = StyleSheet.create({
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
