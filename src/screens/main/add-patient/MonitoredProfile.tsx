// MonitoredProfile.tsx
import React from 'react';
import {View, Text, Image, StyleSheet, SafeAreaView} from 'react-native';
import {Colors} from '../../../constants/Colors';
import Card from '../../../components/cards/Card';
import {DummyImage} from '../../../assets/dummy/images';
import Header from '../../../components/header/Header';
import FilledButton from '../../../components/buttons/FilledButton';

const MonitoredProfile = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Monitored Patient"
        // headerRightComponent={
        //   <FilledButton
        //     label="Add"
        //     type="blue"
        //     style={styles.findButton}
        //     disabled={disabled}
        //     // onPress={() => navigate('EmailNotFoundPatient')}
        //     onPress={() => {
        //       isClicked ? navigate('TransitionScreen') : setIsClicked(true);
        //     }}
        //   />
        // }
      />
      <View style={styles.body}>
        <Card
          contentContainerStyle={{
            backgroundColor: Colors.White,
            marginTop: 20,
          }}>
          <Image source={DummyImage.user} style={{height: 70, width: 70}} />
          <Text
            style={{
              fontSize: 18,
              color: Colors.Blue,
              fontWeight: 'semibold',
              marginTop: 10,
            }}>
            María Clemente
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: Colors.SteelBlue,
              textAlign: 'center',
              width: '85%',
            }}>
            You have access to their measurements and health history once the
            patient has accepted the request.
          </Text>
        </Card>
      </View>
    </SafeAreaView>
  );
};

export default MonitoredProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.GhostWhite,
  },
  body: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
});
