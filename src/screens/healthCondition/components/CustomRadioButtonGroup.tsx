import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image,
} from 'react-native';
import {Colors} from '../../../constants/Colors';
import {staticIcons} from '../../../assets/image';
import RadioButton from '../../../components/buttons/RadioButton';

interface CustomRadioSelectProps {
  label: string;
  name: string;
  value: string;
  options: {label: string; value: string}[];
  onChange: (value: string) => void;
  placeholder: string;
}

const CustomRadioSelect: React.FC<CustomRadioSelectProps> = ({
  label,
  value,
  options,
  onChange,
  placeholder,
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
        {options.find(option => option.value === selectedValue)?.label ? (
          <Text style={[styles.inputText, {color: Colors.Blue}]}>
            {options.find(option => option.value === selectedValue)?.label}
          </Text>
        ) : (
          <Text style={styles.inputText}>
            {placeholder || 'Select an option'}
          </Text>
        )}
        <Image
          source={staticIcons.downIcon}
          style={{width: 12, height: 12, objectFit: 'contain', marginRight: 8}}
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

            <View>
              {options.map((option, index) => (
                <RadioButton
                  key={index}
                  label={option.label}
                  value={option.value}
                  selectedValue={selectedValue}
                  onValueChange={handleSelect}
                />
              ))}
            </View>

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
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
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
    color: Colors.SteelBlue,
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
