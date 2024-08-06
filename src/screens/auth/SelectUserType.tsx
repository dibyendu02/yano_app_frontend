/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../../components/header/Header';
import {navigate} from '../../navigation/RootNavigation';
import {AuthScreen} from '../../navigation/auth/AuthScreens';
import {Colors} from '../../constants/Colors';
import {CardStyles} from '../../components/cards/CardStyle';
import {StaticImage} from '../../assets/images';
import FilledButton from '../../components/buttons/FilledButton';
import {UserType} from '../../constants/enums';
import UserContext from '../../contexts/UserContext'; // Adjust the path accordingly

const Config = [
  {
    id: UserType.Patient,
    label: 'Patient',
    img: StaticImage.PatientLogo,
  },
  {
    id: UserType.Doctor,
    label: 'Healthcare\nprovider',
    img: StaticImage.ProviderLogo,
  },
];

const SelectUserType = () => {
  const {PatientLogin, ProviderLogin} = useContext(UserContext);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleContinue = () => {
    if (selectedRole === UserType.Patient) {
      PatientLogin();
    } else if (selectedRole === UserType.Doctor) {
      ProviderLogin();
    }
    navigate(AuthScreen.Registration);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header
        title=""
        headerRightComponent={
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.text}>Already Registered?</Text>
            <TouchableOpacity onPress={() => navigate(AuthScreen.Login)}>
              <Text style={styles.loginButton}>Log in</Text>
            </TouchableOpacity>
          </View>
        }
      />
      <View style={{flex: 1, backgroundColor: Colors.GhostWhite, padding: 14}}>
        <Text style={styles.headerText}>What type of user are you?</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          {Config.map(item => (
            <TouchableOpacity
              key={item.label}
              activeOpacity={0.6}
              style={[
                CardStyles.container,
                styles.selectionCardContainer,
                {
                  borderColor: Colors.LightGreen,
                  borderWidth: selectedRole && item.id === selectedRole ? 2 : 0,
                },
              ]}
              onPress={() => setSelectedRole(item.id)}>
              <Image source={item.img} />
              <Text style={styles.selectionCardContainerText}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <FilledButton
        type="blue"
        label="Continue"
        disabled={!selectedRole}
        style={{width: '90%', marginVertical: 10, alignSelf: 'center'}}
        onPress={handleContinue}
      />
    </SafeAreaView>
  );
};

export default SelectUserType;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: Colors.Blue,
    marginRight: 8,
  },
  loginButton: {
    borderWidth: 1,
    borderColor: Colors.Black,
    borderRadius: 8,
    color: Colors.Blue,
    fontWeight: 'bold',
    padding: 10,
  },
  selectionCardContainer: {
    width: '48%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectionCardContainerText: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10,
  },
  headerText: {
    color: Colors.Blue,
    fontWeight: 'bold',
    fontSize: 24,
    fontFamily: 'Roboto',
    marginBottom: 30,
  },
});
