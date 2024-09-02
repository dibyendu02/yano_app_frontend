/* eslint-disable react/no-unstable-nested-components */
import {
  FlatList,
  Image,
  SafeAreaView,
  Share,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
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

const AddPatient = () => {
  const [email, setEmail] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

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
      const result = await Share.share({
        message: '',
      });
    } catch (error) {
      // alert(error.message);
    }
  };

  useEffect(() => {
    if (email) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email]);

  return (
    <View style={styles.container}>
      <HeaderWithButton
        title="Add patient"
        headerRightComponent={
          <FilledButton
            label={isClicked ? 'Add' : 'Find'}
            type="blue"
            style={styles.findButton}
            disabled={disabled}
            // onPress={() => navigate('EmailNotFoundPatient')}
            onPress={() => {
              isClicked ? navigate('TransitionScreen') : setIsClicked(true);
            }}
          />
        }
      />
      {!isClicked ? (
        <View style={styles.body}>
          <View style={styles.inputField}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.inputBox}
              value={email}
              onChangeText={setEmail}
              placeholder="Ej. paciente@email.com"
            />
          </View>
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
                      // console.log('create patient account');
                      navigate('CreatePatientAccount');
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
                    style={{height: 12, width: 10, objectFit: 'contain'}}
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
            <Text style={{fontSize: 16, color: Colors.SteelBlue}}>
              maria.clemente@gmail.com
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
  },
  label: {
    color: '#00263E',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
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
    justifyContent: 'space-between',
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
