import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextInput,
  Image,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {Colors} from '../../../constants/Colors';
import {staticIcons} from '../../../assets/image';

interface CustomRadioSelectProps {
  label: string;
  name: string;
  value: string;
  options: {label: string; value: string}[];
  onChange: (value: string) => void;
}

const CustomRadioSelect: React.FC<CustomRadioSelectProps> = ({
  label,
  value,
  options,
  onChange,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onChange(value);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.inputText}>
          {options.find(option => option.value === selectedValue)?.label ||
            'Select an option'}
        </Text>
        <Image
          source={staticIcons.downIcon}
          style={{width: 12, height: 12, objectFit: 'contain', marginRight: 12}}
        />
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.content}>
              <Text style={styles.title}>{label}</Text>
            </View>

            <RadioButton.Group
              onValueChange={handleSelect}
              value={selectedValue}>
              {options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.radioItem}
                  onPress={() => handleSelect(option.value)}>
                  <RadioButton
                    value={option.value}
                    mode="android"
                    color={Colors.LightGreen}
                    uncheckedColor={Colors.Grey}
                  />
                  <Text style={styles.radioText}>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </RadioButton.Group>

            <View style={styles.footer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButtonText}>CANCEL</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.Blue,
    marginBottom: 10,
  },
  input: {
    borderColor: Colors.LightGray,
    borderWidth: 1,
    borderRadius: 5,
    padding: 15,
    backgroundColor: Colors.White,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputText: {
    fontSize: 16,
    color: Colors.Black,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    position: 'relative',
  },
  content: {
    width: '100%',
    alignItems: 'flex-start',
  },
  title: {
    fontWeight: 'bold',
    marginLeft: 4,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20,
    color: Colors.Blue,
    alignSelf: 'flex-start',
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioText: {
    marginLeft: 8,
    color: 'black',
    fontSize: 18,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
    width: '100%',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  cancelButtonText: {
    color: Colors.LightGreen,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CustomRadioSelect;
