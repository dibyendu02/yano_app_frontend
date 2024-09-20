import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, ActivityIndicator} from 'react-native';
import {Colors} from '../../../constants/Colors';
import Card from '../../../components/cards/Card';
import {DummyImage} from '../../../assets/dummy/images';
import HeaderLocal from './component/HeaderLocal';
import FilledButton from '../../../components/buttons/FilledButton';
import {navigate} from '../../../navigation/RootNavigation';
import {addPatient} from '../../../api/POST/doctor';
import {retrieveData} from '../../../utils/Storage';

const AfterQR = ({route}) => {
  // Fetch userData from route.params
  const {userData} = route.params || {};

  // State variables
  const [addingPatient, setAddingPatient] = useState(false);
  const [patientAdded, setPatientAdded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddPatient = async () => {
    setAddingPatient(true);
    try {
      const token = await retrieveData('token');
      const userId = await retrieveData('userId');

      const response = await addPatient({
        data: {id: userData?._id},
        token,
        userId,
      });

      if (response) {
        setPatientAdded(true);
        // Redirect to tabs screen after a short delay
        setTimeout(() => {
          navigate('tabs');
        }, 2000);
      }
    } catch (error) {
      console.log('Error adding patient:', error);
      setErrorMessage('Failed to add patient.');
    } finally {
      setAddingPatient(false);
    }
  };

  if (addingPatient) {
    // Show loading screen
    return (
      <View style={{flex: 1, backgroundColor: Colors.Blue}}>
        <View
          style={{
            flexDirection: 'column',
            gap: 5,
            alignItems: 'center',
            paddingHorizontal: 28,
            marginTop: '80%',
          }}>
          <ActivityIndicator color={Colors.White} size={35} />
          <Text style={{fontSize: 20, color: 'white', fontWeight: '600'}}>
            Loading patient information
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: 'rgba(255,255,255, 0.6)',
              textAlign: 'center',
            }}>
            You will be able to access their health history and receive
            notifications.
          </Text>
        </View>
      </View>
    );
  }

  if (patientAdded) {
    // Show success screen
    return (
      <View style={styles.container}>
        <HeaderLocal title="Monitored Patient" />
        <View style={styles.body}>
          <Card
            contentContainerStyle={{
              backgroundColor: Colors.White,
              marginTop: 20,
            }}>
            <Image
              source={
                userData?.userImg?.secure_url
                  ? {uri: userData?.userImg?.secure_url}
                  : DummyImage.user
              }
              style={{
                height: 70,
                width: 70,
                borderRadius: 100,
              }}
            />
            <Text
              style={{
                fontSize: 18,
                color: Colors.Blue,
                fontWeight: '600',
                marginTop: 10,
              }}>
              {userData.firstName} {userData.lastName}
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: Colors.SteelBlue,
                textAlign: 'center',
                width: '90%',
              }}>
              You have access to their measurements and health history once the
              patient has accepted the request.
            </Text>
          </Card>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HeaderLocal
        title="Add patient"
        headerRightComponent={
          <FilledButton
            label="Add"
            type="blue"
            style={{
              width: 70,
              paddingVertical: 10,
              borderRadius: 10,
            }}
            onPress={handleAddPatient}
          />
        }
        customStyle={{paddingBottom: 2, paddingTop: 45}}
      />
      <View style={styles.body}>
        <Card
          contentContainerStyle={{
            backgroundColor: Colors.White,
            marginTop: 12,
          }}>
          <Image
            source={
              userData.userImg
                ? {uri: userData.userImg?.secure_url}
                : DummyImage.user
            }
            style={{
              height: 80,
              width: 80,
              borderRadius: 40,
            }}
          />
          <Text
            style={{
              fontSize: 18,
              color: Colors.Blue,
              fontWeight: '600',
              marginTop: 10,
            }}>
            {userData.firstName + ' ' + userData.lastName}
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: Colors.SteelBlue,
              textAlign: 'center',
              width: '85%',
            }}>
            {userData.email}
          </Text>
          {errorMessage ? (
            <Text style={{color: 'red', marginTop: 10}}>{errorMessage}</Text>
          ) : null}
        </Card>
      </View>
    </View>
  );
};

export default AfterQR;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.GhostWhite,
  },
  body: {
    flex: 1,
    alignItems: 'center',
  },
});
