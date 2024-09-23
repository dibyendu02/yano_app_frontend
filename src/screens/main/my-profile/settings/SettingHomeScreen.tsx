import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../../../components/header/Header';
import {Settings} from '../../../../assets/settings/SettingItem';
import {LogoutIcon} from '../../../../assets/icon/IconNames';
import {Colors} from '../../../../constants/Colors';
import MeasurementItems from '../components/MeasurementItems';
import UserContext from '../../../../contexts/UserContext';
import Card from '../UiUpdateComponents/Card';

const SettingHomeScreen = () => {
  const [isClicked, setIsClicked] = useState(false);
  const {logout} = useContext(UserContext);

  const logoutBtn = () => {
    setIsClicked(true);
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.GhostWhite,
        position: 'relative',
      }}>
      <View>
        <Header title={'Settings'} />
        <ScrollView>
          <View style={{width: '94%', margin: 'auto', marginTop: 12}}>
            <MeasurementItems data={Settings} />
            <View style={styles.versionBox}>
              <View
                style={{borderBottomWidth: 1, borderColor: Colors.LightGray}}>
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
              <TouchableOpacity
                style={styles.logoutBtn}
                onPress={() => logoutBtn()}>
                <LogoutIcon />
                <Text
                  style={{color: Colors.Red, fontSize: 16, fontWeight: '400'}}>
                  Log out
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>

      {isClicked && (
        <View style={styles.afterLogoutBtnClick}>
          <Card
            title={'Log out'}
            children={'Are you sure you want to log out of Yano?'}
            active={setIsClicked}
            action={logout}
          />
        </View>
      )}
    </View>
  );
};

export default SettingHomeScreen;

const styles = StyleSheet.create({
  versionBox: {
    width: '100%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: Colors.White,
    marginVertical: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.Blue,
    marginBottom: 10,
  },
  versionText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.SteelBlue,
  },
  logoutBtn: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
    paddingTop: 20,
  },
  afterLogoutBtnClick: {
    // backgroundColor: Colors.LightBlack,
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
