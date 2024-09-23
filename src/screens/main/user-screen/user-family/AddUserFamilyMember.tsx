import React, {useEffect, useState} from 'react';
import {
  FlatList,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CommonLayout from '../../../../components/CommonLayout';
import FilledButton from '../../../../components/buttons/FilledButton';
import CommonHeader from '../../../healthCondition/components/CommonHeader';
import CustomInputField from '../../../../components/formComp/CustomInputField';
import {useForm} from 'react-hook-form';
import Icons from '../../../../assets/icon/Icon';
import {Colors} from '../../../../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import {findPatientByEmail} from '../../../../api/POST/addPatient'; // Import API call
import {retrieveData} from '../../../../utils/Storage';

const menuData = [
  {
    id: '1',
    icon: (
      <Icons.MaterialIcons
        name="qr-code-scanner"
        size={25}
        color={Colors.LightGreen}
      />
    ),
    text: 'Scan QR code',
    path: 'AddFamilyQr',
  },
  {
    id: '2',
    icon: (
      <Icons.MaterialIcons name="share" size={25} color={Colors.LightGreen} />
    ),
    text: 'Invite family member',
    path: 'invite',
  },
  {
    id: '3',
    icon: (
      <Icons.MaterialIcons
        name="person-add"
        size={25}
        color={Colors.LightGreen}
      />
    ),
    text: 'Create family member account',
    path: 'CreateFamilyMember',
  },
];

const AddUserFamilyMember = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const [isComplete, setIsComplete] = useState(false);
  const [searchError, setSearchError] = useState(''); // To show not found message
  const navigation = useNavigation();
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');

  const getUserData = async () => {
    const retrievedUserId = await retrieveData('userId');
    const retrievedToken = await retrieveData('token');
    // const retrievedUserType = await retrieveData('userType');

    setUserId(retrievedUserId);
    setToken(retrievedToken);
    // setUserType(retrievedUserType);
  };

  useEffect(() => {
    getUserData();
  }, []);

  // Handle the form submission
  const onSubmit = async data => {
    try {
      // Reset previous error message
      setSearchError('');

      // Search the patient by email
      const response = await findPatientByEmail({
        data: {email: data.email},
        token,
      });

      if (response?.userData) {
        // Navigate to EditFamilyMembers with the found userData
        navigation.replace('EditFamilyMembers', {userData: response.userData});
      } else {
        // If not found, set an error message
        setSearchError(
          `No se encontró un paciente asociado a: ‘${data.email}’`,
        );
        setIsComplete(true);
      }
    } catch (error) {
      setSearchError(`Error occurred: ${error.message}`);
    }
  };

  return (
    <CommonLayout>
      {!isComplete ? (
        <CommonHeader
          title={'Add family member'}
          rightComp1={
            <FilledButton
              type="blue"
              label="Save"
              onPress={handleSubmit(onSubmit)} // Submit the form
              style={{
                width: 70,
                paddingVertical: 10,
                borderRadius: 10,
              }}
            />
          }
        />
      ) : (
        <CommonHeader
          title="Agregar paciente"
          leftIcon={
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icons.AntDesign name="close" size={32} color={Colors.Black} />
            </TouchableOpacity>
          }
          rightComp1={
            <FilledButton
              type="blue"
              label="Agregar"
              onPress={() => setIsComplete(true)}
              style={{
                width: 90,
                paddingVertical: 10,
                borderRadius: 10,
              }}
            />
          }
        />
      )}
      <View
        style={{paddingVertical: 12, width: '94%', marginHorizontal: 'auto'}}>
        {!isComplete ? (
          <CustomInputField
            name="email"
            label="Email of family member"
            placeholder="Ej. paciente@email.com"
            control={control}
            rules={{required: 'Email is required'}}
          />
        ) : (
          <View
            style={{
              paddingBottom: 20,
            }}>
            {searchError ? (
              <Text
                style={{
                  textAlign: 'center',
                  color: Colors.SteelBlue,
                }}>
                {searchError}
              </Text>
            ) : (
              <Text
                style={{
                  textAlign: 'center',
                  color: Colors.SteelBlue,
                }}>
                No se encontró un paciente asociado a: ‘{searchError}’
              </Text>
            )}
          </View>
        )}

        <View
          style={{
            backgroundColor: Colors.White,
            borderRadius: 10,
            overflow: 'hidden',
          }}>
          <Text
            style={{
              color: Colors.SteelBlue,
              fontSize: 12,
              fontWeight: '600',
              paddingHorizontal: 20,
              paddingTop: 10,
              textTransform: 'uppercase',
            }}>
            Other options
          </Text>
          <View>
            <FlatList
              data={menuData}
              style={{
                paddingHorizontal: 20,
                paddingVertical: 10,
              }}
              renderItem={({item, index: _i}) => (
                <TouchableOpacity
                  onPress={() => {
                    if (item.path === 'invite') {
                      Share.share({message: 'Join Yano using this link'});
                    } else navigation.replace(item.path);
                  }}
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 14,
                    paddingBottom: _i == menuData.length - 1 ? 6 : 14,
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View style={{width: 25, marginRight: 5}}>{item.icon}</View>

                    <Text
                      style={{
                        color: Colors.Blue,
                        fontSize: 16,
                        fontWeight: '600',
                        marginLeft: 6,
                      }}>
                      {item.text}
                    </Text>
                  </View>
                  <Icons.MaterialIcons
                    name="navigate-next"
                    size={30}
                    color={Colors.Blue}
                  />
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => <View style={styles.separate} />}
            />
          </View>
        </View>
      </View>
    </CommonLayout>
  );
};

export default AddUserFamilyMember;

const styles = StyleSheet.create({
  separate: {
    backgroundColor: Colors.LightGray,
    height: 1,
    width: '100%',
  },
  separator: {
    width: 1,
    height: 20,
    backgroundColor: Colors.Black,
    marginHorizontal: 8,
  },
});
