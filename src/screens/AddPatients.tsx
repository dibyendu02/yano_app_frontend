import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import arrow from '../assets/image/arrow_back.png';
import PatientElements from '../components/PatientElements';

const AddPatients = ({navigation}) => {
  const [email, setEmail] = useState('');

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.Navbar}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={arrow}
              style={{height: 30, width: 30, paddingTop: 2}}
            />
          </TouchableOpacity>
          <Text style={styles.navbarText}>Add Patient</Text>
        </View>

        <TouchableOpacity
          style={[
            styles.findButton,
            {backgroundColor: email ? '#00263E' : '#99a8b2'},
          ]}
          onPress={() => navigation.navigate('EmailNotFoundPatient')}
          disabled={!email}>
          <Text style={{color: 'white', fontWeight: '600'}}>Find</Text>
        </TouchableOpacity>
      </View>
      <View style={{paddingHorizontal: 10, marginTop: 15}}>
        <View style={styles.inputField}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.inputBox}
            value={email}
            onChangeText={setEmail}
            placeholder="john@gmail.com"
            placeholderTextColor="gray"
          />
        </View>
      </View>

      <View
        style={{
          marginHorizontal: 10,
          backgroundColor: 'white',
          borderRadius: 8,
        }}>
        {/* Add measurement details here */}
        <Text
          style={{
            paddingLeft: 18,
            paddingTop: 15,
            color: '#3D5A6C',
            fontWeight: '600',
          }}>
          OTHER OPTIONS
        </Text>
        <PatientElements
          name="Scan QR Code"
          icon="qr-code-scanner"
          iconsname="MaterialIcons"
          color="#76BC21"
        />
        <PatientElements
          name="Invite Patient"
          icon="share-google"
          iconsname="EvilIcons"
          color="#76BC21"
        />
        <PatientElements
          name="Create Patient Account"
          icon="person-add-alt"
          iconsname="MaterialIcons"
          color="#76BC21"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  Navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  navbarText: {
    color: '#00263E',
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 20,
  },
  findButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  inputField: {
    marginBottom: 15,
    width: '100%',
  },
  label: {
    color: '#00263E',
    fontWeight: 'bold',
  },
  inputBox: {
    height: 50,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 5,
    backgroundColor: 'white',
    borderColor: '#E9E9E9',
    borderWidth: 1,
    width: '100%',
  },
});

export default AddPatients;
