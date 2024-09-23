/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Share,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import Header from '../../../components/header/Header';
import {Colors} from '../../../constants/Colors';
import {navigate} from '../../../navigation/RootNavigation';
import FilledButton from '../../../components/buttons/FilledButton';
import Card from '../../../components/cards/Card';
import Icons from '../../../assets/icon/Icon';
import {DummyImage} from '../../../assets/dummy/images';
import {StaticImage} from '../../../assets/images';
import {staticIcons} from '../../../assets/image';
import HeaderWithButton from './component/HeaderWithButton';
import {addPatient, findPatient} from '../../../api/POST/doctor';
import {retrieveData} from '../../../utils/Storage';
import {useNavigation} from '@react-navigation/native';

const AddPatient = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const [patientData, setPatientData] = useState(null);
  const [addingPatient, setAddingPatient] = useState(false);
  const [patientAlreadyExist, setPatientAlreadyExist] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);
  const [isPatientAdded, setIsPatientAdded] = useState(false);

  const OPTIONS = [
    {
      label: 'Scan QR Code',
      icon: (
        <Image
          source={staticIcons.QRCodeScanner}
          style={{width: 24, height: 24, tintColor: Colors.LightGreen}}
        />
      ),
    },
    {
      label: 'Invite Patient',
      icon: (
        <Image
          source={StaticImage.SharerIcon}
          style={{width: 24, height: 24, tintColor: Colors.LightGreen}}
        />
      ),
    },
    {
      label: 'Create Patient Account',
      icon: (
        <Icons.MaterialIcons
          name="person-add-alt"
          color={Colors.LightGreen}
          size={25}
        />
      ),
    },
  ];

  const onShare = async () => {
    try {
      await Share.share({
        message: '',
      });
    } catch (error) {
      // Handle error
    }
  };

  const handleFindPatient = async () => {
    if (!isClicked) {
      try {
        const token = await retrieveData('token');
        const response = await findPatient({data: {email}, token});
        if (response) {
          setIsClicked(true);
          setPatientData(response);
        }
      } catch (error) {
        console.log(error);
        setUserNotFound(true);
      }
    } else {
      setAddingPatient(true);
      try {
        const token = await retrieveData('token');
        const userId = await retrieveData('userId');

        const response = await addPatient({
          data: {id: patientData?._id},
          token,
          userId,
        });

        console.log('response', response);
        if (response) {
          setIsPatientAdded(true);
          setPatientData(response.userData);
        }
      } catch (error) {
        setIsClicked(false);
        setPatientAlreadyExist(true);
      } finally {
        setTimeout(() => {
          setAddingPatient(false);
        }, 2000);
      }
    }
  };

  useEffect(() => {
    if (email) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email]);

  // Redirect to 'Tabs' screen after displaying patient data
  useEffect(() => {
    if (isPatientAdded) {
      const timer = setTimeout(() => {
        navigation.navigate('tabs');
      }, 3000); // Delay in milliseconds

      return () => clearTimeout(timer); // Cleanup the timer on unmount
    }
  }, [isPatientAdded, navigation]);

  if (addingPatient) {
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

  if (isPatientAdded) {
    console.log('patient added now');
    console.log(patientData);

    return (
      <View style={styles.container}>
        <Header title="Monitored Patient" />

        <View style={styles.body}>
          <Card
            contentContainerStyle={{
              backgroundColor: Colors.White,
              marginTop: 20,
            }}>
            <Image
              source={
                patientData?.userImg?.secure_url
                  ? {uri: patientData?.userImg?.secure_url}
                  : DummyImage.user
              }
              style={{
                height: 70,
                width: 70,
                borderRadius: 100,
                resizeMode: 'cover',
              }}
            />
            <Text
              style={{
                fontSize: 18,
                color: Colors.Blue,
                fontWeight: '600',
                marginTop: 10,
              }}>
              {patientData &&
                `${patientData?.firstName} ${patientData?.lastName}`}
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
      <HeaderWithButton
        title="Add patient"
        headerRightComponent={
          !userNotFound &&
          !patientAlreadyExist && (
            <FilledButton
              label={isClicked ? 'Add' : 'Find'}
              type="blue"
              style={styles.findButton}
              disabled={disabled}
              onPress={handleFindPatient}
            />
          )
        }
      />
      {!isClicked ? (
        <View style={styles.body}>
          {patientAlreadyExist && (
            <View style={styles.inputField}>
              <Text
                style={{
                  color: '#00263E',
                  textAlign: 'center',
                  marginHorizontal: 20,
                  paddingHorizontal: 16,
                  fontSize: 16,
                }}>
                Patient already added
              </Text>
            </View>
          )}

          {userNotFound && (
            <View style={styles.inputField}>
              <Text
                style={{
                  color: '#00263E',
                  textAlign: 'center',
                  marginHorizontal: 20,
                  paddingHorizontal: 16,
                  fontSize: 16,
                }}>
                No patient found associated with: {email}
              </Text>
            </View>
          )}

          {!patientAlreadyExist && !userNotFound && (
            <View style={styles.inputField}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.inputBox}
                value={email}
                onChangeText={setEmail}
                placeholder="E.g., patient@example.com"
              />
            </View>
          )}
          <Card title="OTHER OPTIONS">
            <FlatList
              data={OPTIONS}
              renderItem={({item, index: _index}) => (
                <TouchableOpacity
                  style={[
                    styles.optionItemContainer,
                    {paddingBottom: _index == OPTIONS.length - 1 ? 0 : 16},
                  ]}
                  onPress={() => {
                    if (item.label === 'Scan QR Code') {
                      navigate('PatientQRCode');
                    }
                    if (item.label === 'Create Patient Account') {
                      navigation.replace('CreatePatientAccount');
                    }
                    if (item.label === 'Invite Patient') {
                      onShare();
                    }
                  }}>
                  <View style={styles.optionItemLeftContainer}>
                    {item?.icon && item.icon}
                    <Text style={styles.label}>{item.label}</Text>
                  </View>
                  <Image
                    source={staticIcons.nextIcon}
                    style={{height: 12, width: 10, resizeMode: 'contain'}}
                  />
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          </Card>
        </View>
      ) : (
        <View style={styles.body}>
          <Card
            contentContainerStyle={{
              backgroundColor: Colors.White,
              marginTop: 20,
            }}>
            <Image
              source={
                patientData?.userImg?.secure_url
                  ? {uri: patientData?.userImg?.secure_url}
                  : DummyImage.user
              }
              style={{
                height: 70,
                width: 70,
                borderRadius: 100,
                resizeMode: 'cover',
              }}
            />
            <Text
              style={{
                fontSize: 18,
                color: Colors.Blue,
                fontWeight: '600',
                marginTop: 10,
              }}>
              {patientData &&
                `${patientData?.firstName} ${patientData?.lastName}`}
            </Text>
            <Text style={{fontSize: 16, color: Colors.SteelBlue}}>
              {patientData && patientData?.email}
            </Text>
          </Card>
        </View>
      )}
    </View>
  );
};

export default AddPatient;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    backgroundColor: Colors.GhostWhite,
    alignItems: 'center',
  },
  label: {
    color: '#00263E',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 15,
    flex: 1,
  },
  optionItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    paddingVertical: 16,
  },
  optionItemLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
  },
  separator: {
    backgroundColor: Colors.LightGray,
    height: 1,
    width: '100%',
  },
  inputLabel: {
    color: '#00263E',
    fontWeight: 'bold',
  },
  inputBox: {
    height: 60,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 5,
    backgroundColor: 'white',
    borderColor: '#E9E9E9',
    borderWidth: 1,
    width: '100%',
    color: Colors.Blue,
  },
  inputField: {
    marginVertical: 10,
    width: '94%',
    alignSelf: 'center',
  },
  findButton: {
    width: '55%',
    paddingVertical: 10,
  },
});
