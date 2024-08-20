import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {navigate} from '../../../../navigation/RootNavigation';
import Icons from '../../../../assets/icon/Icon';
import {DummyImage} from '../../../../assets/dummy/images';
import {Colors} from '../../../../constants/Colors';
import {staticIcons} from '../../../../assets/image';

interface PatientListItem {
  name: string;
}
const PatientListItem: React.FC<PatientListItem> = props => {
  return (
    <TouchableOpacity onPress={() => navigate('PatientMonitoringProfile')}>
      <View style={styles.container}>
        <Image source={DummyImage.user} style={styles.avatar} />
        <Text style={styles.name}>{props.name}</Text>
        {/* <Icons.MaterialIcons
          name="navigate-next"
          size={30}
          color={Colors.Blue}
        /> */}
        <Image
          source={staticIcons.nextIcon}
          style={{height: 12, width: 10, objectFit: 'contain'}}
        />
      </View>
    </TouchableOpacity>
  );
};

export default PatientListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    paddingVertical: 16,
  },
  name: {
    color: '#00263E',
    fontSize: 18,
    fontWeight: 'semibold',
    fontFamily: 'Roboto',
    marginLeft: 15,
    flex: 1,
  },
  avatar: {
    height: 36,
    width: 36,
    borderRadius: 18,
  },
});
