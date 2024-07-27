/* eslint-disable react/no-unstable-nested-components */
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import React from 'react';
import Header from '../../../components/header/Header';
import {Colors} from '../../../constants/Colors';
import {patientList} from '../../../test/Data';
import PatientListItem from './components/PatientListItem';
import Card from '../../../components/cards/Card';

const PatientMonitoringList = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Monitoring" showBackIcon={false} />
      <View style={styles.contentContainer}>
        <Card>
          <FlatList
            data={patientList}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index: _index}) => (
              <PatientListItem name={item.name} />
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </Card>
      </View>
    </SafeAreaView>
  );
};

export default PatientMonitoringList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.GhostWhite,
    width: '100%',
  },
  separator: {
    backgroundColor: Colors.LightGray,
    height: 1,
    width: '100%',
  },
});
