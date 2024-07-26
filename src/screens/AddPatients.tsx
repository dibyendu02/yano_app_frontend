import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import arrow from '../assets/image/arrow_back.png';

const AddPatients = ({navigation}) => {
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

        <TouchableOpacity style={styles.findButton}>
          <Text style={{color: 'white', fontWeight: '600'}}>Find</Text>
        </TouchableOpacity>
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
    color: 'black',
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 20,
  },
  findButton: {
    backgroundColor: '#99a8b2',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
});

export default AddPatients;
