import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {Colors} from '../../../../constants/Colors';
import Header from '../../../../components/header/Header';
import {ScrollView} from 'react-native';
import {Control, FieldValues, useForm} from 'react-hook-form';
import FilledButton from '../../../../components/buttons/FilledButton';
import CustomPasswordField from '../../../../components/formComp/CustomPasswordField';
import emergencyHome from '../../../../assets/image/emergencyHome.png';
import UserContext from '../../../../contexts/UserContext';
import {deletePatientData} from '../../../../api/DELETE/manageData';
import {deletePatientAccount} from '../../../../api/POST/manageData';
import {retrieveData} from '../../../../utils/Storage';

const DeleteAccount = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors, isValid},
    watch,
  } = useForm();
  const password = watch('password', '');

  const onSubmit = (value: string) => {
    console.log(value);
  };
  const {logout} = useContext(UserContext);
  const [userId, setUserId] = useState('');
  const [userType, setUserType] = useState('');
  const [token, setToken] = useState('');

  const getUserData = async () => {
    const retrievedToken = await retrieveData('token');
    const retrievedUserId = await retrieveData('userId');
    const retrievedUserType = await retrieveData('userType');

    setToken(retrievedToken);
    setUserId(retrievedUserId);
    setUserType(retrievedUserType);
  };

  useEffect(() => {
    getUserData();
  }, []);

  const deleteUserAccount = async () => {
    try {
      const data = {password};
      const res = await deletePatientAccount({userId, data, token});
      console.log(res);
    } catch (error) {
      // Alert(error.message)
      console.log(error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.GhostWhite,
        position: 'relative',
      }}>
      <Header title={'Delete this account'} />
      <ScrollView
        style={{
          //   paddingVertical: 12,
          width: '94%',
          margin: 'auto',
          marginTop: -5,
          //   backgroundColor: 'red',
        }}>
        <View>
          <View style={styles.versionBox}>
            <View style={styles.confirmationContainer}>
              <Image
                source={emergencyHome}
                style={[styles.confirmationImage, {tintColor: Colors.Red}]}
              />
              <Text style={styles.title}>If you delete this account:</Text>
            </View>

            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: Colors.LightGray,
                paddingBottom: 20,
                marginBottom: 20,
                paddingLeft: 20,
                paddingRight: 10,
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    paddingStart: 20,
                    fontSize: 16,
                    color: Colors.SteelBlue,
                  }}>
                  •
                </Text>
                <Text style={styles.list}>
                  The account will be deleted from Yano and all your devices.
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    paddingStart: 20,
                    fontSize: 16,
                    color: Colors.SteelBlue,
                  }}>
                  •
                </Text>
                <Text style={styles.list}>
                  Your health history will be erased.
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    paddingStart: 20,
                    fontSize: 16,
                    color: Colors.SteelBlue,
                  }}>
                  •
                </Text>
                <Text style={styles.list}>
                  Your measurements will be erased.
                </Text>
              </View>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 18,
                  color: Colors.SteelBlue,
                  marginBottom: 10,
                }}>
                To delete your account please enter your password.
              </Text>
              <CustomPasswordField
                name="password"
                label="Password"
                control={control as unknown as Control<FieldValues, object>}
              />
              <FilledButton
                label="Delete account"
                disabled={password.length < 6}
                type="red"
                onPress={() => {
                  deleteUserAccount();
                  logout();
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DeleteAccount;

const styles = StyleSheet.create({
  versionBox: {
    width: '100%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: Colors.White,
    marginVertical: 20,
  },
  confirmationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.Red,
  },
  list: {
    paddingStart: 10,
    fontSize: 16,
    color: Colors.SteelBlue,
    marginBottom: 8,
  },
  confirmationImage: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
});
