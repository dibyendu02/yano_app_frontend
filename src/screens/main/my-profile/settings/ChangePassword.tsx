import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../../../constants/Colors';
import Header from '../../../../components/header/Header';
import CustomPasswordField from '../../../../components/formComp/CustomPasswordField';
import {Control, FieldValues, useForm} from 'react-hook-form';
import FilledButton from '../../../../components/buttons/FilledButton';
import Modal from 'react-native-modal';
import {CloseIcon} from '../../../../assets/icon/IconNames';
import {Image} from 'react-native';
import {staticIcons} from '../../../../assets/image';

interface FormValues {
  oldPassword: '';
  newPassword: '';
  repeatPassword: '';
}

const ChangePassword = () => {
  const [disabled, setDisabled] = useState(true);
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors, isValid},
  } = useForm<FormValues>();
  const onSubmit = (value: FormValues) => {
    console.log(value);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };
  const [saved, setSaved] = useState(false);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.GhostWhite,
        position: 'relative',
      }}>
      <Header
        title={'Change password'}
        headerRightComponent={
          <FilledButton
            type="blue"
            label="Save"
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid ? true : false}
            style={{
              width: 70,
              paddingVertical: 10,
              borderRadius: 10,
            }}
          />
        }
        customStyle={{paddingVertical: 2, paddingTop: 35}}
      />
      <ScrollView style={{paddingVertical: 12, width: '94%', margin: 'auto'}}>
        <View>
          <CustomPasswordField
            name="oldPassword"
            control={control as unknown as Control<FieldValues, object>}
            label="Old password"
            rules={{required: 'Old password is required'}}
          />
          <CustomPasswordField
            name="newPassword"
            control={control as unknown as Control<FieldValues, object>}
            label="New password"
            condition="At least 8 characters"
            rules={{required: 'New password is required'}}
          />
          <CustomPasswordField
            name="repeatPassword"
            control={control as unknown as Control<FieldValues, object>}
            label="Repeat new password"
            //   condition="Must be the same as the new password"
            rules={{required: 'Repeat password is required'}}
          />
        </View>
      </ScrollView>
      <Modal
        isVisible={saved}
        onBackdropPress={() => setSaved(false)}
        onSwipeComplete={() => setSaved(false)}
        swipeDirection="down"
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={0}
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
            <Text style={styles.modalText}>The changes have been saved.</Text>
          </View>
          <TouchableOpacity onPress={() => setSaved(false)}>
            <CloseIcon color="white" />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
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
