import {SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import {Colors} from '../../../constants/Colors';
import FilledButton from '../../../components/buttons/FilledButton';
import {EditIcon, PlusIcon} from '../../../assets/icon/IconNames';
import EmptyScreen from './EmptyScreen';
import CommonHeader from './CommonHeader';
import {Image} from 'react-native';
import {staticIcons} from '../../../assets/image';

type CommonHomeScreenProps = {
  navigation: any;
  data: object;
  heading: string;
  addItem_path: string;
  component: React.ReactNode;
  emptyHomeTitle: string;
  emptyHomeMessage: string;
};

const CommonHomeScreen2: FC<CommonHomeScreenProps> = ({
  navigation,
  data,
  heading,
  addItem_path,
  component,
  emptyHomeTitle,
  emptyHomeMessage,
}) => {
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
});
