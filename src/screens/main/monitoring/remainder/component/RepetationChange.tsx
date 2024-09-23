import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Modal} from 'react-native';
import {Colors} from '../../../../../constants/Colors';
import RadioButton from '../../../../../components/buttons/RadioButton';

type RepetitionModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onSelect: (value: string) => void;
};

const RepetitionModal = ({
  isVisible,
  onClose,
  onSelect,
}: RepetitionModalProps) => {
  const [selectedValue, setSelectedValue] = useState('day');

  const handleSelect = (value: string): void => {
    setSelectedValue(value);
    onSelect(value);
    onClose();
  };

  return (
    <Modal transparent={true} visible={isVisible} animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Repeats every</Text>

          <View>
            <RadioButton
              label="Day"
              value="day"
              selectedValue={selectedValue}
              onValueChange={handleSelect}
            />
            <RadioButton
              label="Week"
              value="week"
              selectedValue={selectedValue}
              onValueChange={handleSelect}
            />
            <RadioButton
              label="Month"
              value="month"
              selectedValue={selectedValue}
              onValueChange={handleSelect}
            />
            <RadioButton
              label="Year"
              value="year"
              selectedValue={selectedValue}
              onValueChange={handleSelect}
            />
          </View>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.cancelButtonText}>CANCEL</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: Colors.White,
    borderRadius: 10,
    padding: 20,
    paddingBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    color: Colors.Black,
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

export default RepetitionModal;
