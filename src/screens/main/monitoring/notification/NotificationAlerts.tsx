import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import CommonLayout from '../../../../components/CommonLayout';
import {Image} from 'react-native';
import {DummyImage} from '../../../../assets/dummy/images';
import {
  CheckListIcon,
  CloseIcon,
  ErrorIcon,
} from '../../../../assets/icon/IconNames';
import {Colors} from '../../../../constants/Colors';
import CommonHeader from '../../../healthCondition/components/CommonHeader';
import EmptyScreen from '../../../healthCondition/components/EmptyScreen';

const Notifications = [
  {
    id: 1,
    name: 'Juan Torres',
    time: '10:00 AM',
    message:
      'The patient entered a heart rate reading above the set threshold. Touch to review it.',
    image: DummyImage.user,
    isView: true,
  },
  {
    id: 2,
    name: 'Jorge Pardo',
    time: '2:00 PM',
    message:
      'The patient entered a heart rate reading above the set threshold. Touch to review it.',
    image: DummyImage.user,
    isView: false,
  },
];

const NotificationAlerts = ({navigation}) => {
  return (
    <CommonLayout>
      <CommonHeader
        leftIcon={
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={
              {
                // marginLeft: 10
              }
            }>
            <CloseIcon size={30} />
          </TouchableOpacity>
        }
        title="Notifications"
        rightComp2={
          <TouchableOpacity>
            <CheckListIcon size={24} />
          </TouchableOpacity>
        }
      />
      <ScrollView>
        <View style={{paddingVertical: 12, width: '94%', margin: 'auto'}}>
          <View>
            {Notifications.length === 0 && (
              <EmptyScreen
                title="No notifications"
                message="You have no notifications yet."
              />
            )}
          </View>
          <ScrollView
            style={
              {
                // padding: 10,
                // borderRadius: 8,
                // backgroundColor: Colors.White,
              }
            }>
            {Notifications.map((item, index) => (
              <View
                style={[
                  styles.container,
                  item.isView && {backgroundColor: '#ecf9fd'},
                  index == 0 && {
                    borderTopRightRadius: 8,
                    borderTopLeftRadius: 8,
                  },
                  index == 0 && {
                    borderBottomWidth: 1,
                    borderBlockColor: Colors.LightGray,
                  },

                  index == Notifications.length - 1 && {
                    borderBottomRightRadius: 8,
                    borderBottomLeftRadius: 8,
                  },
                ]}
                key={index}>
                <Image
                  source={item.image}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    marginBottom: 10,
                  }}
                />
                <View style={{width: '80%'}}>
                  <View style={styles.titleBox}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'semibold',
                        color: Colors.Blue,
                      }}>
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: 'semibold',
                        color: Colors.SteelBlue,
                      }}>
                      {' '}
                      {item.time}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', gap: 6}}>
                    <ErrorIcon size={16} />
                    <Text
                      style={{
                        color: Colors.SteelBlue,
                        fontSize: 14,
                        fontWeight: '400',
                      }}>
                      {item.message}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </CommonLayout>
  );
};

export default NotificationAlerts;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 15,
    // marginBottom: 20,
    backgroundColor: Colors.White,
    padding: 20,
    // borderRadius: 10,
  },
  titleBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
});
