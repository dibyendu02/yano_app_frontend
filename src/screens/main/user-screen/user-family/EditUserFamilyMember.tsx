import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CommonLayout from '../../../../components/CommonLayout';
import {DummyImage} from '../../../../assets/dummy/images';
import CustomSelectLocal from './customSheetLocal';
import {useForm} from 'react-hook-form';
import {Colors} from '../../../../constants/Colors';
import CommonHeader from '../../../healthCondition/components/CommonHeader';
import FilledButton from '../../../../components/buttons/FilledButton';
import {navigate} from '../../../../navigation/RootNavigation';
import MeasurementChangeCardLocal from './MeasurementCardLocal';
import {retrieveData} from '../../../../utils/Storage';
import {linkFamilyMember} from '../../../../api/POST/familyLink';
import {useNavigation} from '@react-navigation/native';

const options = {
  unit1: 'Mother',
  unit2: 'Father',
  unit3: 'Brother',
  unit4: 'Husband / Wife',
  unit5: 'Sibling',
  unit6: 'Grandparent',
  unit7: 'Hijo',
  unit8: 'Other',
};

const EditUserFamilyMember = ({route}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [relation, setRelation] = useState('');
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');

  const navigation = useNavigation();

  const {control} = useForm();

  // Fetch userData from route.params
  const {userData} = route.params || {};

  const handleClicked = () => {
    setIsClicked(!isClicked);
  };

  const setRelationFn = (value: string) => {
    setRelation(value);
  };

  const handleLinkFamilyMember = async () => {
    // navigate('FamilyMemberSaved')
    try {
      const structuredData = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        relation,
        familyMemberUserId: userData._id,
        userImg: userData?.userImg,
      };

      const res = await linkFamilyMember({data: structuredData, userId, token});
      console.log(res);
      navigation.replace('FamilyMemberSaved');
    } catch (error) {
      console.error(error);
    }
  };

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

  console.log(relation != '' ? true : false);

  return (
    <CommonLayout>
      <CommonHeader
        title={'Add family member'}
        rightComp1={
          <FilledButton
            type="blue"
            label="Save"
            onPress={handleLinkFamilyMember}
            style={{
              width: 70,
              paddingVertical: 10,
              borderRadius: 10,
            }}
            disabled={relation === '' ? true : false}
          />
        }
      />
      <View style={{paddingHorizontal: 12, paddingVertical: 12}}>
        <View
          style={{
            width: '100%',
            borderRadius: 10,
            backgroundColor: Colors.White,
            alignItems: 'center',
            paddingVertical: 20,
            marginBottom: 20,
          }}>
          <Image
            source={
              userData?.userImg
                ? {uri: userData?.userImg?.secure_url}
                : DummyImage.user
            }
            style={{
              width: 80,
              height: 80,
              borderRadius: 80,
              objectFit: 'cover',
              marginBottom: 10,
            }}
          />
          <Text
            style={{
              fontSize: 18,
              fontWeight: '600',
              color: Colors.Blue,
            }}>
            {userData?.firstName} {userData?.lastName}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              color: Colors.SteelBlue,
            }}>
            {userData?.email}
          </Text>
        </View>
        <View>
          <CustomSelectLocal
            name="relation"
            label="Relación con el familiar"
            control={control}
            text={relation}
            onClick={() => setIsClicked(!isClicked)}
          />
        </View>
      </View>
      {isClicked && (
        <View style={styles.afterClick}>
          <MeasurementChangeCardLocal
            title={'Family relationship'}
            active={handleClicked}
            setValue={setRelationFn}
            items={options}
          />
        </View>
      )}
    </CommonLayout>
  );
};

export default EditUserFamilyMember;

const styles = StyleSheet.create({
  afterClick: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: 1,
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
});
