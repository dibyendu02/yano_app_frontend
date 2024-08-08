/* eslint-disable react/no-unstable-nested-components */
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../../../components/header/Header';
import { Colors } from '../../../constants/Colors';
import { navigate } from '../../../navigation/RootNavigation';
import FilledButton from '../../../components/buttons/FilledButton';
import Card from '../../../components/cards/Card';
import Icons from '../../../assets/icon/Icon';

const AddPatient = () => {
  const [email, setEmail] = useState('');
  const [disabled, setDisabled] = useState(false);

  const OPTIONS = [
    {
      label: 'Scan QR Code',
      icon: (
        <Icons.MaterialIcons
          name="qr-code-scanner"
          color={Colors.LightGreen}
          size={25}
        />
      ),
    },
    {
      label: 'Invite Patient',
      icon: (
        <Icons.EvilIcons
          name="share-google"
          color={Colors.LightGreen}
          size={30}
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

  useEffect(() => {
    if (email) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email]);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Add Patient"
        headerRightComponent={
          <FilledButton
            label="Find"
            type="blue"
            style={styles.findButton}
            disabled={disabled}
            onPress={() => navigate('EmailNotFoundPatient')}
          />
        }
      />
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
            renderItem={({ item, index: _index }) => (
              <TouchableOpacity
                style={styles.optionItemContainer}
                onPress={() => {
                  if (item.label === 'Create Patient Account') {
                    // console.log('create patient account');
                    navigate('CreatePatientAccount');
                  }
                }}>
                <View style={styles.optionItemLeftContainer}>
                  {item?.icon && item.icon}
                  <Text style={styles.label}>{item.label}</Text>
                </View>
                <Icons.MaterialIcons
                  name="navigate-next"
                  size={25}
                  color={Colors.Blue}
                />
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </Card>
      </View>
    </SafeAreaView>
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
    fontSize: 18,
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
  },
});
