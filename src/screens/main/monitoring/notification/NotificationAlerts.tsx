import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
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

const initialNotifications = [
  {
    id: 1,
    name: 'Juan Torres',
    time: '10:00 AM',
    message:
      'The patient entered a heart rate reading above the set threshold. Touch to review it.',
    image: DummyImage.user,
    isView: false,
  },
  {
    id: 2,
    name: 'Jorge Pardo',
    time: '2:00 PM',
    message:
      'The patient entered a heart rate reading above the set threshold. Touch to review it.',
    image: DummyImage.user,
    isView: true,
  },
];

const NotificationAlerts = ({navigation}) => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [showButton, setShowButton] = useState(
    notifications.some(notification => !notification.isView),
  );

  const handleMarkAllAsViewed = () => {
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      isView: true,
    }));
    setNotifications(updatedNotifications);
    setShowButton(false);
  };

  return (
    <CommonLayout>
      <CommonHeader
        leftIcon={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <CloseIcon size={30} />
          </TouchableOpacity>
        }
        title="Notifications"
        rightComp2={
          showButton && (
            <TouchableOpacity onPress={handleMarkAllAsViewed}>
              <CheckListIcon size={24} />
            </TouchableOpacity>
          )
        }
        customStyle={{paddingVertical: 12}}
      />
      <ScrollView>
        <View style={{paddingVertical: 12, width: '94%', margin: 'auto'}}>
          <View>
            {notifications.length === 0 && (
              <EmptyScreen
                title="No notifications"
                message="You have no notifications yet."
              />
            )}
          </View>
          <ScrollView>
            {notifications.map((item, index) => (
              <View
                style={[
                  styles.container,
                  !item.isView && {backgroundColor: '#ecf9fd'},
                  index == 0 && {
                    borderTopRightRadius: 8,
                    borderTopLeftRadius: 8,
                  },
                  index == 0 && {
                    borderBottomWidth: 1,
                    borderBlockColor: Colors.LightGray,
                  },
                  index == notifications.length - 1 && {
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
    backgroundColor: Colors.White,
    padding: 20,
  },
  titleBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
});
