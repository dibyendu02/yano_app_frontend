import {
  SafeAreaView,
  ScrollView,
  ScrollViewBase,
  StyleSheet,
  View,
} from 'react-native';
import React, {FC} from 'react';
import {Colors} from '../../../../constants/Colors';
import Header from '../../../../components/header/Header';
import EmptyScreen from '../../../../components/EmptyScreen';
import FilledButton from '../../../../components/buttons/FilledButton';
import {PlusIcon, ReminderIcon} from '../../../../assets/icon/IconNames';
import {navigate} from '../../../../navigation/RootNavigation';
import RemainderItems from './Remaindertems';

type RemainderLayoutProps = {
  data: {
    name: string;
    subtitle?: string;
  }[];
};

const RemainderLayout: FC<RemainderLayoutProps> = ({data}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.GhostWhite,
        position: 'relative',
      }}>
      <Header title={'Reminders'} />
      <ScrollView style={{paddingVertical: 12, width: '94%', margin: 'auto'}}>
        <View>
          {data.length > 0 ? (
            <>
              {data.map((item, index) => (
                <RemainderItems
                  key={index}
                  name={item.name}
                  subtitle={item.subtitle}
                  element={
                    <View style={{marginTop: 4}}>
                      <ReminderIcon size={24} />
                    </View>
                  }
                  onPress={() => navigate('AddRemainder', {data: item})}
                />
              ))}
            </>
          ) : (
            <EmptyScreen
              title={'No reminders'}
              message={'You have no reminders to show'}
            />
          )}
        </View>
      </ScrollView>
      <FilledButton
        type="blue"
        label="Add Reminder"
        icon={<PlusIcon />}
        onPress={() => navigate('AddRemainder')}
        style={styles.addBtn}
      />
    </View>
  );
};

export default RemainderLayout;

const styles = StyleSheet.create({
  addBtn: {
    width: 160,
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});
