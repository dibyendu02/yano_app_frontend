import {
  FlatList,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import CommonLayout from '../../../../components/CommonLayout';
import FilledButton from '../../../../components/buttons/FilledButton';
import CommonHeader from '../../../healthCondition/components/CommonHeader';
import CustomInputField from '../../../../components/formComp/CustomInputField';
import {useForm} from 'react-hook-form';
import Icons from '../../../../assets/icon/Icon';
import {Colors} from '../../../../constants/Colors';
import {navigate} from '../../../../navigation/RootNavigation';
import {CloseIcon, ShareIcon} from '../../../../assets/icon/IconNames';
import {useNavigation} from '@react-navigation/native';

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
    // path: 'EditFamilyMembers',
  },
  {
    id: '2',
    icon: <ShareIcon color={Colors.LightGreen} />,
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
  const {control, handleSubmit} = useForm();
  const [isComplete, setIsComplete] = React.useState(false);
  const navigation = useNavigation();
  return (
    <CommonLayout>
      {!isComplete ? (
        <CommonHeader
          title={'Add Family Member'}
          rightComp1={
            <FilledButton
              type="blue"
              label="Save"
              onPress={() => setIsComplete(true)}
              // disabled={!disabled}
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
              <CloseIcon size={32} />
            </TouchableOpacity>
          }
          rightComp1={
            <FilledButton
              type="blue"
              label="Agregar"
              onPress={() => setIsComplete(true)}
              // disabled={!disabled}
              style={{
                width: 90,
                paddingVertical: 10,
                borderRadius: 10,
              }}
            />
          }
        />
      )}
      <View style={{padding: 20}}>
        {!isComplete ? (
          <CustomInputField
            name="email"
            label="Email of Family Member"
            placeholder="Ej. paciente@email.com"
            control={control}
            rules={{required: 'Email is required'}}
          />
        ) : (
          <View
            style={{
              paddingBottom: 20,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: Colors.SteelBlue,
              }}>
              No se encontró un paciente asociado a: ‘maria.clemente@gmail.com’
            </Text>
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
              fontSize: 16,
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
                      Share.share({message: 'join Yano using this link '});
                    } else navigate(item.path);
                  }}
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 14,
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    {item.icon}
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
