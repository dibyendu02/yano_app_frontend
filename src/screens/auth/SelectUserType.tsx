/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import {
  Image,
  Platform,
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
    navigate(AuthScreen.Registration, {userType: selectedRole});
  };

  const handlePress = (role: string) => {
    setSelectedRole(role);
    if (role === UserType.Patient) {
      PatientLogin();
    } else if (role === UserType.Doctor) {
      ProviderLogin();
    }
  };

  return (
    <View style={{flex: 1}}>
      <Header
        title=""
        headerRightComponent={
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.text}>Already registered?</Text>
            <TouchableOpacity onPress={() => navigate(AuthScreen.Login)}>
              <Text style={styles.loginButton}>Log in</Text>
            </TouchableOpacity>
          </View>
        }
        
      />
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.GhostWhite,
          paddingHorizontal: '5%',
          // paddingVertical: 10,
        }}>
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
              onPress={() => handlePress(item.id)}>
              <Image source={item.img} style={{width: 64, height: 64}} />
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
        style={{width: '92%', marginVertical: 10, alignSelf: 'center'}}
        onPress={handleContinue}
      />
    </View>
  );
};

export default SelectUserType;

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: Colors.Blue,
    marginRight: 15,
  },
  loginButton: {
    borderWidth: 1,
    borderColor: Colors.Black,
    borderRadius: 8,
    color: Colors.Blue,
    fontWeight: 'bold',
    padding: 10,
    paddingHorizontal: 15,
    fontSize: 15,
  },
  selectionCardContainer: {
    width: '48%',
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectionCardContainerText: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10,
    color: Colors.Blue,
    fontSize: 18,
  },
  headerText: {
    color: Colors.Blue,
    fontWeight: 'bold',
    fontSize: 26,
    fontFamily: 'Roboto',
    marginVertical: 25,
  },
});
