import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../../../components/header/Header';
import {Settings} from '../../../../assets/settings/SettingItem';
import {LogoutIcon} from '../../../../assets/icon/IconNames';
import {Colors} from '../../../../constants/Colors';
import MeasurementItems from '../components/MeasurementItems';
import UserContext from '../../../../contexts/UserContext';

const SettingHomeScreen = () => {
  const {logout} = useContext(UserContext);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.GhostWhite,
        position: 'relative',
      }}>
      <Header title={'Settings'} />
      <ScrollView>
        <View style={{padding: 20}}>
          <MeasurementItems data={Settings} />
          <View style={styles.versionBox}>
            <View style={{borderBottomWidth: 1, borderColor: Colors.LightGray}}>
              <Text style={styles.title}>Version information</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingBottom: 20,
                }}>
                <Text style={styles.versionText}>Version</Text>
                <Text style={styles.versionText}>1.5</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.logoutBtn} onPress={() => logout()}>
              <LogoutIcon />
              <Text
                style={{color: Colors.Red, fontSize: 20, fontWeight: '500'}}>
                Log out
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingHomeScreen;

const styles = StyleSheet.create({
  versionBox: {
    width: '100%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: Colors.White,
    marginVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.Blue,
    marginBottom: 10,
  },
  versionText: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.SteelBlue,
  },
  logoutBtn: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
    paddingTop: 20,
  },
});
