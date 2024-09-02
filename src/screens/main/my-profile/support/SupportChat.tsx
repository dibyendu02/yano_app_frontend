import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import Header from '../../../../components/header/Header';
import { Colors } from '../../../../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Adjust the import based on the icon library you use
import { StaticImage } from '../../../../assets/images';

const SupportChat = () => {
  return (
    <View style={styles.container}>
      <Header title="Online support chat"
        headerRightComponent={
          <TouchableOpacity>
            {/* <EditIcon /> */}
            <Image source={require('../../../../assets/image/tripleDot.png')}
              style={{ height: 26, width: 24 }}
            />
          </TouchableOpacity>
        }
      />
      <View style={styles.chatContainer}></View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Message"
          placeholderTextColor={Colors.Grey}
        />
        <View style={styles.iconContainer}>
          <TouchableOpacity>
            <Icon name="paperclip" size={22} color={'#617987'} />
          </TouchableOpacity>
          <TouchableOpacity>
            {/* <Icon name="camera" size={24} color={Colors.Blue} /> */}
            <Image
              source={StaticImage.CameraIcon}
              style={{ tintColor: '#617987', height: 26, width: 26 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SupportChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.GhostWhite,
  },
  chatContainer: {
    flex: 1,
    // Add styles for the chat messages container
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.White,
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.LightGray,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    // backgroundColor: Colors.LightGray,
    color: Colors.Blue,
    fontSize: 16,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    gap: 10,
    marginRight: 5,
  },
});
