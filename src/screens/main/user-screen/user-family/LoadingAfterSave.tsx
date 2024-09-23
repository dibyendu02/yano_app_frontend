import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Colors} from '../../../../constants/Colors';
import {navigate} from '../../../../navigation/RootNavigation';

const LoadingAfterSave = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.goBack();
    }, 1000);
  }, [navigation]);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.Blue,
      }}>
      <ActivityIndicator
        size={50}
        color={Colors.White}
        style={{
          marginBottom: 20,
        }}
      />
      <Text
        style={{
          fontSize: 20,
          fontWeight: '600',
          color: Colors.White,
          textAlign: 'center',
          marginBottom: 8,
        }}>
        Cargando perfil del familiar
      </Text>
      <Text
        style={{
          fontSize: 16,
          fontWeight: '500',
          color: Colors.LightGray,
          textAlign: 'center',
        }}>
        Podrás acceder a su historial de salud y recibir notificaciones.
      </Text>
    </View>
  );
};

export default LoadingAfterSave;

const styles = StyleSheet.create({});
