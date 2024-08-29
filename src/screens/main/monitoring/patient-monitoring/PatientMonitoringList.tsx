import React, {useState} from 'react';
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

const PatientMonitoringList = () => {
  const [isScrolling, setIsScrolling] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
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
            data={patientList}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index: _index}) => (
              <PatientListItem
                customStyle={{
                  paddingTop: _index === 0 ? 0 : 16,
                  paddingBottom: _index === patientList.length - 1 ? 0 : 16,
                }}
                name={item.name}
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
