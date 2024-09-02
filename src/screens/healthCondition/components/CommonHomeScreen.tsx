import {SafeAreaView, StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import {Colors} from '../../../constants/Colors';
import FilledButton from '../../../components/buttons/FilledButton';
import {PlusIcon} from '../../../assets/icon/IconNames';
import EmptyScreen from './EmptyScreen';
import HealthConditionItems from './HomeItems';
import CommonHeader from './CommonHeader';

type CommonHomeScreenProps = {
  navigation: any;
  data: object[];
  heading: string;
  addItem_path: string;
  viewItem_path: string;
  emptyHomeTitle: string;
  emptyHomeMessage: string;
  customStyle?: object;
};

const CommonHomeScreen: FC<CommonHomeScreenProps> = ({
  navigation,
  data,
  heading,
  addItem_path,
  viewItem_path,
  emptyHomeTitle,
  emptyHomeMessage,
  customStyle,
}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.GhostWhite,
        position: 'relative',
      }}>
      <CommonHeader title={heading} customStyle={customStyle} />
      {data && data.length > 0 ? (
        <HealthConditionItems
          data={data}
          path={viewItem_path}
          navigation={navigation}
        />
      ) : (
        <EmptyScreen title={emptyHomeTitle} message={emptyHomeMessage} />
      )}
      <FilledButton
        type="blue"
        label="Add"
        icon={<PlusIcon />}
        onPress={() => navigation.navigate(addItem_path)}
        style={styles.addBtn}
      />
    </View>
  );
};

export default CommonHomeScreen;

const styles = StyleSheet.create({
  addBtn: {
    width: 100,
    position: 'absolute',
    bottom: 25,
    right: 20,
  },
});
