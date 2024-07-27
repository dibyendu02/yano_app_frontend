import {SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import {Colors} from '../../constants/Colors';
import Header from '../../components/header/Header';
import FilledButton from '../../components/buttons/FilledButton';
import HealthConditionItems from './components/HealthConditionItems';
import {PlusIcon} from '../../assets/icon/IconNames';
import EmptyHealthCondition from './components/EmptyHealthCondition';

const HealthConditionHomeScreen = ({navigation}: any) => {
  const data = [
    {
      id: 1,
      title: 'Hypertension',
      date: '12/12/2021',
      status: 'Active',
      treatedBy: 'Dr. John Doe',
      medicine: 'Medicine Name',
      additionalNotes: 'Additional Notes',
    },
  ];
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.LightGray,
        position: 'relative',
      }}>
      <Header title="Health Condition" />
      <HealthConditionItems data={data} navigation={navigation} />
      {/* <EmptyHealthCondition/> */}
      <FilledButton
        label="Add"
        icon={<PlusIcon />}
        onPress={() => navigation.navigate('AddHealthCondition')}
        style={styles.addBtn}
      />
    </SafeAreaView>
  );
};

export default HealthConditionHomeScreen;

const styles = StyleSheet.create({
  addBtn: {
    width: 100,
    position: 'absolute',
    bottom: 40,
    right: 20,
  },
});
