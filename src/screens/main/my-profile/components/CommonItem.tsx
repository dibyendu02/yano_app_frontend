import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {Colors} from '../../../../constants/Colors';
import {
  BatteryCharge,
  BluetoothConnected,
  BluetoothDisconnected,
  NextIcon,
} from '../../../../assets/icon/IconNames';
import {staticIcons} from '../../../../assets/image';

type props = {
  name: string;
  leftIcon: React.ReactNode;
  isConnected?: boolean;
  onPress: () => void;
};

const CommonItem: FC<props> = ({
  onPress,
  name,
  leftIcon,
  isConnected = false,
}) => {
  return (
    <>
      <View
        style={{
          backgroundColor: Colors.White,
          borderRadius: 10,
          padding: 20,
          marginBottom: 12,
        }}>
        <TouchableOpacity
          onPress={onPress}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderColor: Colors.LightGray,
            paddingBottom: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 20,
            }}>
            {leftIcon}
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                color: Colors.Blue,
                width: '75%',
              }}>
              {name}
            </Text>
          </View>
          <View>
            <Image
              source={staticIcons.nextIcon}
              style={{height: 12, width: 10, objectFit: 'contain'}}
            />
          </View>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: 20,
          }}>
          {isConnected ? (
            <TouchableOpacity
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 10,
              }}>
              <BluetoothDisconnected />
              <Text style={styles.textStyle}>Disconnected</Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity
                style={[
                  styles.connectBtn,
                  {borderRightWidth: 2, borderColor: Colors.LightGray},
                ]}>
                <BluetoothConnected />
                <Text style={styles.textStyle}>Connected</Text>
              </TouchableOpacity>
              <View style={[styles.connectBtn]}>
                <BatteryCharge />
                <Text style={styles.textStyle}>83%</Text>
              </View>
            </>
          )}
        </View>
      </View>
    </>
  );
};

export default CommonItem;

const styles = StyleSheet.create({
  connectBtn: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  textStyle: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.Blue,
  },
});
