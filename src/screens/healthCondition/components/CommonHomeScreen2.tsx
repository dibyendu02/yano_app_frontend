import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {FC, useState, useEffect} from 'react';
import {Colors} from '../../../constants/Colors';
import FilledButton from '../../../components/buttons/FilledButton';
import {EditIcon, PlusIcon} from '../../../assets/icon/IconNames';
import EmptyScreen from './EmptyScreen';
import CommonHeader from './CommonHeader';
import {Image} from 'react-native';
import {staticIcons} from '../../../assets/image';
import Card from '../../main/my-profile/UiUpdateComponents/Card';
import {retrieveData} from '../../../utils/Storage';

type CommonHomeScreenProps = {
  requiredUserId?: String;
  navigation: any;
  data: object;
  heading: string;
  addItem_path: string;
  component: React.ReactNode;
  emptyHomeTitle: string;
  emptyHomeMessage: string;
  customHeaderStyle?: object;
  onDelete?: any;
};

const CommonHomeScreen2: FC<CommonHomeScreenProps> = ({
  requiredUserId,
  navigation,
  data,
  heading,
  addItem_path,
  component,
  emptyHomeTitle,
  emptyHomeMessage,
  customHeaderStyle,
  onDelete,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState('');
  const getUserData = async () => {
    // const retrievedToken = await retrieveData('token');
    // const retrievedUserId = await retrieveData('userId');
    const retrievedUserType = await retrieveData('userType');

    // setToken(retrievedToken);
    // setUserId(retrievedUserId);
    setUserType(retrievedUserType);
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    if (data?.id === '' || data?.id) {
      // Once the data is ready, stop the loading state
      setLoading(false);
    }
  }, [data]);

  console.log('required id in home', requiredUserId);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.GhostWhite,
        position: 'relative',
      }}>
      <CommonHeader
        title={heading}
        rightComp1={
          requiredUserId && userType === 'patient'
            ? null
            : data?.id != '' && (
                <TouchableOpacity
                  onPress={() => navigation.navigate(addItem_path, {data})}>
                  <Image
                    source={staticIcons.EditPencil}
                    style={{height: 22, width: 22}}
                  />
                </TouchableOpacity>
              )
        }
        rightComp2={
          requiredUserId && userType === 'patient'
            ? null
            : data?.id != '' && (
                <TouchableOpacity onPress={() => setIsClicked(true)}>
                  <Image
                    source={staticIcons.DeleteIcon}
                    style={{height: 22, width: 22}}
                  />
                </TouchableOpacity>
              )
        }
        customStyle={customHeaderStyle}
      />

      {loading ? (
        <EmptyScreen title={emptyHomeTitle} message={emptyHomeMessage} />
      ) : data?.id === '' ? (
        <EmptyScreen title={emptyHomeTitle} message={emptyHomeMessage} />
      ) : (
        <>{component}</>
      )}

      {requiredUserId && userType === 'patient'
        ? null
        : data?.id === '' && (
            <FilledButton
              type="blue"
              label="Add"
              icon={<PlusIcon />}
              onPress={() =>
                navigation.navigate(addItem_path, {
                  requiredUserId: requiredUserId,
                })
              }
              style={styles.addBtn}
            />
          )}
      {isClicked && (
        <View style={styles.deletbuttonclick}>
          <Card
            title={'Delete social history'}
            children={'Are you sure you want to delete your social history?'}
            active={setIsClicked}
            action={onDelete}
          />
        </View>
      )}
    </View>
  );
};

export default CommonHomeScreen2;

const styles = StyleSheet.create({
  addBtn: {
    width: 100,
    position: 'absolute',
    bottom: 25,
    right: 20,
  },
  deletbuttonclick: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: 1,
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
