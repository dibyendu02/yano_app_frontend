import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import Header from '../../../../components/header/Header';
import {Colors} from '../../../../constants/Colors';
import {patientList} from '../../../../test/Data';
import PatientListItem from '../components/PatientListItem';
import Card from '../../../../components/cards/Card';
import FilledButton from '../../../../components/buttons/FilledButton';
import Icons from '../../../../assets/icon/Icon';
import {navigate} from '../../../../navigation/RootNavigation';
import {retrieveData} from '../../../../utils/Storage';
import {useFocusEffect} from '@react-navigation/native';
import {getPatientsUnderDoctorData} from '../../../../api/GET/patientsUnderDoctor';

const PatientMonitoringList = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [userId, setUserId] = useState('');
  const [patientsData, setPatientsData] = useState([]);

  const getUserData = async () => {
    const retrievedUserId = await retrieveData('userId');
    setUserId(retrievedUserId);
  };

  useEffect(() => {
    getUserData();
  }, []);

  const getPatientsData = useCallback(async () => {
    try {
      if (userId) {
        const res = await getPatientsUnderDoctorData({userId});
        setPatientsData(res?.patients || []);
        console.log(res?.patients);
      }
    } catch (error) {
      console.error(error);
    }
  }, [userId]);

  useFocusEffect(
    useCallback(() => {
      getPatientsData();
    }, [getPatientsData]),
  );
  return (
    <View style={styles.container}>
      <Header
        title="Monitoring"
        showBackIcon={false}
        headerRightComponent={
          <TouchableOpacity onPress={() => navigate('NotificationAlerts')}>
            <Icons.Ionicons
              name="notifications"
              size={25}
              color={Colors.Blue}
            />
          </TouchableOpacity>
        }
      />
      <View style={styles.contentContainer}>
        <Card>
          <FlatList
            data={patientsData}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index: _index}) => (
              <PatientListItem
                customStyle={{
                  paddingTop: _index === 0 ? 0 : 16,
                  paddingBottom: _index === patientsData.length - 1 ? 0 : 16,
                }}
                name={item?.firstName + ' ' + item?.lastName}
                patientData={item}
              />
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            onScrollBeginDrag={() => setIsScrolling(true)}
            onScrollEndDrag={() => setIsScrolling(false)}
            onMomentumScrollEnd={() => setIsScrolling(false)}
          />
        </Card>
        {!isScrolling && (
          <FilledButton
            type="blue"
            label="Add patient"
            activeOpacity={1}
            onPress={() => navigate('AddPatient')}
            icon={
              <Icons.MaterialIcons name="add" color={Colors.White} size={25} />
            }
            style={styles.floatingBtn}
          />
        )}
      </View>
    </View>
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
    position: 'relative',
    paddingVertical: 6,
  },
  separator: {
    backgroundColor: Colors.LightGray,
    height: 1,
    width: '100%',
  },
  floatingBtn: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    width: '40%',
    borderRadius: 10,
  },
});
