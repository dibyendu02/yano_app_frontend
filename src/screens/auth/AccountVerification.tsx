/* eslint-disable react-native/no-inline-styles */
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../constants/Colors';
import Header from '../../components/header/Header';
import FilledButton from '../../components/buttons/FilledButton';
import {TouchableOpacity} from 'react-native';
import {RadioButton} from 'react-native-paper';

const AccountVerification = () => {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const Options = [
    {
      key: 'Email',
      label: 'Email verification',
      description:
        'We will send you a 6-digit verification code to pedro.anzola@gmail.com',
    },
    {
      key: 'Mobile',
      label: 'Mobile verification',
      description:
        'We will send you a 6-digit verification code to \n+58 4126798909',
    },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Account Verification" />
      <View style={styles.body}>
        <Text
          style={{
            color: Colors.Blue,
            fontSize: 16,
            lineHeight: 21,
          }}>
          For your safety, we want to make sure it's {'\n'}really you. Select a
          method to verify your {'\n'}account.
        </Text>
        {Options.map(item => (
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              width: '100%',
              backgroundColor: Colors.White,
              padding: 16,
              marginVertical: 10,
              borderRadius: 8,
              borderWidth: 2,
              borderColor:
                item.key === selectedKey
                  ? Colors.LightGreen
                  : Colors.Transparent,
            }}
            key={item.key}
            onPress={() => setSelectedKey(item.key)}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <RadioButton.Android
                value={item.key}
                status={item.key === selectedKey ? 'checked' : 'unchecked'}
                color={Colors.LightGreen}
                uncheckedColor={Colors.Grey}
                pointerEvents="none"
              />
              <Text style={{fontSize: 16, color: Colors.Blue}}>
                {item.label}
              </Text>
            </View>
            <Text
              style={{
                color: Colors.SteelBlue,
                fontWeight: '400',
                marginLeft: 35,
              }}>
              {item.description}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <FilledButton
        label="Send Code"
        type="blue"
        style={{width: '90%', alignSelf: 'center', marginTop: 20}}
      />
    </SafeAreaView>
  );
};

export default AccountVerification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  body: {
    flex: 1,
    backgroundColor: Colors.GhostWhite,
    padding: 16,
  },
});
