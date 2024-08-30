import {SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {FC, useState} from 'react';
import {Colors} from '../../../constants/Colors';
import FilledButton from '../../../components/buttons/FilledButton';
import {EditIcon, PlusIcon} from '../../../assets/icon/IconNames';
import EmptyScreen from './EmptyScreen';
import CommonHeader from './CommonHeader';
import {Image} from 'react-native';
import {staticIcons} from '../../../assets/image';
import Card from '../../main/my-profile/UiUpdateComponents/Card';

// this components is for just social history

type CommonHomeScreenProps = {
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
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.GhostWhite,
        position: 'relative',
      }}>
      <CommonHeader
        title={heading}
        rightComp1={
          <TouchableOpacity
            onPress={() => navigation.navigate(addItem_path, {data})}>
            <Image
              source={staticIcons.EditPencil}
              style={{height: 22, width: 22}}
            />
          </TouchableOpacity>
        }
        rightComp2={
          <TouchableOpacity onPress={() => setIsClicked(true)}>
            <Image
              source={staticIcons.DeleteIcon}
              style={{height: 22, width: 22}}
            />
          </TouchableOpacity>
        }
        customStyle={customHeaderStyle}
      />
      {data ? (
        <>{component}</>
      ) : (
        <EmptyScreen title={emptyHomeTitle} message={emptyHomeMessage} />
      )}
      {!data && (
        <FilledButton
          type="blue"
          label="Add"
          icon={<PlusIcon />}
          onPress={() => navigation.navigate(addItem_path)}
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
    </SafeAreaView>
  );
};

export default CommonHomeScreen2;

const styles = StyleSheet.create({
  addBtn: {
    width: 100,
    position: 'absolute',
    bottom: 40,
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
});
