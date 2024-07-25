import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function MonitoringPatientHold() {
  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <AntDesign name="arrowleft" size={28} color={'black'} />
        <Text style={styles.navbarTitle}>Monitored Patient</Text>
      </View>

      <View style={styles.patientProfileDetails}>
        <FontAwesome5 name="user-circle" size={80} color={'black'} />
        <Text style={styles.patientName}>María Clemente</Text>
        <Text style={styles.instructionText}>
          {`You will have access to their measurements\nand health history once the patient has\naccepted the request.`}
        </Text>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.stopMonitoringButton}>
          <Ionicons name="exit-outline" size={20} color={'red'} />
          <TouchableOpacity>
            <Text style={styles.monitoringText}>stop Monitoring</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  navbarTitle: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    paddingLeft: 15,
  },
  patientProfileDetails: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    width: '100%',
    marginTop: 40,
  },
  patientName: {
    color: 'black',
    fontSize: 19,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    marginTop: 10,
    marginBottom: 8,
  },
  instructionText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  stopMonitoringButton: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'red',
    padding: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
    height: 50,
  },
  monitoringText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'red',
    marginLeft: 5,
  },
});
