import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons'
export default function MonitoringPatientHold() {
  return (
    <View style={styles.Container}>
         <View style={styles.navbar}>
        <AntDesign name='arrowleft' size={28} color={'black'} />
        <Text style={styles.navbarTitle}>Monitored Patient</Text>
      </View>

      <View style={styles.patientProfileDetails}>
      <FontAwesome5 name='user-circle' size={80} color={'black'} />
      <Text style={styles.patientName}>María Clemente</Text>
      <Text>{`You will have access to their measurements\n     and health history once the patient has       \n                     accepted the request.`}</Text>
      </View>

      <View style={{flexDirection :'row' , borderWidth : 1, borderColor : 'red', alignSelf : 'center',padding : 10, width : 300, justifyContent : 'center',alignItems : 'center', borderRadius : 10,backgroundColor : 'white',height : 50, marginTop : 330}}>
          <Ionicons name='exit-outline' size={20} color={'red'}/>
          <TouchableOpacity>
            <Text style={styles.monintoring}>
                stop Monitoring
            </Text>
          </TouchableOpacity>
          </View>
    </View>
  )
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 10,

      },
      navbar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
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
        width : '100%',
        marginTop : 40

      },
      patientName: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Roboto',
        marginTop: 10,
        marginBottom: 20,
      },
      monintoring :{
        fontSize : 13,
        fontWeight : 'bold',
        color : 'red'
      }
})