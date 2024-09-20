import React, {useEffect, useState} from 'react';
import {View, StyleSheet, SafeAreaView, ScrollView, Text} from 'react-native';
import {Colors} from '../../../constants/Colors';
import Header from '../../../components/header/Header';
import FilledButton from '../../../components/buttons/FilledButton';
import CustomInputField from '../../../components/formComp/CustomInputField';
import {useForm, Control, FieldValues} from 'react-hook-form';
import CommonHeader from '../components/CommonHeader';
import {CloseIcon} from '../../../assets/icon/IconNames';
import {Image} from 'react-native';
import {staticIcons} from '../../../assets/image';
import Modal from 'react-native-modal';
import {addFamilyMember} from '../../../api/POST/medicalHistory';
import {editFamilyMember} from '../../../api/PUT/medicalHistory';
import {retrieveData} from '../../../utils/Storage';

interface FormValues {
  relationship: string;
  healthCondition: string;
}

const AddAndEditFamilyHistory = ({navigation, route}: any) => {
  let data = null;
  if (route?.params) {
    data = route.params.data;
  }
  const [userId, setUserId] = useState('');
  const [userType, setUserType] = useState('');
  const [saved, setSaved] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [defaultValues, setDefaultValues] = useState<FieldValues>({
    relationship: data?.name || '',
    healthCondition: data?.disease || '',
  });
  const [requiredUserId, setRequiredUserId] = useState(
    data?.requiredUserId || route?.params?.requiredUserId || '',
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors, isDirty},
    watch,
  } = useForm<FormValues>({defaultValues});

  // Watch for changes in form fields
  const watchedFields = watch();

  // Enable the Save button if any field is dirty (changed)
  useEffect(() => {
    if (isDirty) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [isDirty, watchedFields]);

  const onSubmit = async (formdata: FormValues) => {
    console.log('data', data);
    if (data) {
      try {
        const respose = await editFamilyMember({
          userId:
            requiredUserId && userType == 'doctor' ? requiredUserId : userId,
          data: formdata,
          id: data.id,
        });
        if (respose) {
          setSaved(true);
        }

        setTimeout(() => {
          setSaved(false);
          navigation.goBack();
        }, 2000);
      } catch (error) {
        console.error('Error in onSubmit Edit :', error);
      }
    } else {
      try {
        const res = await addFamilyMember({
          userId:
            requiredUserId && userType == 'doctor' ? requiredUserId : userId,
          data: formdata,
        });
        console.log(res);
        console.log('Data saved');
        setSaved(true);
        setTimeout(() => {
          setSaved(false);
          navigation.goBack();
        }, 2000);
      } catch (error) {
        console.error('Error in onSubmit Add:', error);
      }
      // navigation.goBack();
    }
  };

  const getUserData = async () => {
    // const retrievedToken = await retrieveData('token');
    const retrievedUserId = await retrieveData('userId');
    const retrievedUserType = await retrieveData('userType');

    // setToken(retrievedToken);
    setUserId(retrievedUserId);
    setUserType(retrievedUserType);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.GhostWhite,
        position: 'relative',
      }}>
      <CommonHeader
        title={data ? 'Edit' : 'Add'}
        rightComp1={
          <FilledButton
            type="blue"
            label="Save"
            onPress={handleSubmit(onSubmit)}
            disabled={disabled}
            style={{
              width: 70,
              paddingVertical: 10,
              borderRadius: 10,
            }}
          />
        }
      />
      <ScrollView style={{paddingVertical: 12, width: '94%', margin: 'auto'}}>
        <View>
          <View style={styles.inputBox}>
            <CustomInputField
              label="Relationship to family member"
              name="relationship"
              control={control as unknown as Control<FieldValues, object>}
              placeholder="Ej. Madre, padre, hermano, etc..."
              rules={{required: 'required*'}}
            />
            <CustomInputField
              label="Family member's health condition"
              name="healthCondition"
              control={control as unknown as Control<FieldValues, object>}
              placeholder="Ej. Hypertension, diabetes, etc..."
            />
          </View>
        </View>
      </ScrollView>
      <Modal
        isVisible={saved}
        onBackdropPress={() => setSaved(false)}
        onSwipeComplete={() => setSaved(false)}
        swipeDirection="down"
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={0} // Adjust the opacity of the background
        animationInTiming={1000}
        animationOutTiming={3000}
        style={styles.modal}>
        <View style={styles.modalContent}>
          <View style={{flexDirection: 'row', gap: 10}}>
            <Image
              source={staticIcons.checkcircle}
              style={{
                height: 20,
                width: 20,
                objectFit: 'contain',
                tintColor: 'white',
              }}
            />
            <Text style={styles.modalText}>The changes have been made.</Text>
          </View>
          <CloseIcon color="white" />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    marginBottom: 12,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: Colors.Green,
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
    marginBottom: 20,
    marginLeft: 60,
  },
  modalText: {
    color: Colors.White,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default AddAndEditFamilyHistory;
