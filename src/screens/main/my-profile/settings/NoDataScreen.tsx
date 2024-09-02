import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../../../constants/Colors';
import Header from '../../../../components/header/Header';
import FilledButton from '../../../../components/buttons/FilledButton';
import {DownloadIcon} from '../../../../assets/icon/IconNames';
import EmptyScreen from '../../../healthCondition/components/EmptyScreen';
import {Image} from 'react-native';
import {StaticImage} from '../../../../assets/images';

const NoDataScreen = () => {
  const [downloaded, setDownloaded] = useState(false);
  const downloadData = true;
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.GhostWhite,
        position: 'relative',
      }}>
      <Header title={'Download your data'} />
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          gap: 5,
          //   justifyContent: 'center',
          paddingTop: '60%',
          alignItems: 'center',
        }}>
        <Image source={StaticImage.ListEmpty} />
        <Text style={{fontSize: 20, fontWeight: 'bold', color: Colors.Blue}}>
          No data yet
        </Text>
        <Text style={{fontSize: 16, color: Colors.SteelBlue}}>
          Your data is collected from Yano.
        </Text>
      </View>
    </View>
  );
};

export default NoDataScreen;

const styles = StyleSheet.create({
  versionBox: {
    width: '100%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: Colors.White,
    marginVertical: 20,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.Blue,
    marginBottom: 10,
    textAlign: 'left',
  },
});
