import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Modal} from 'react-native';
import {Colors} from '../../../../../constants/Colors';
import {RadioButton} from 'react-native-paper';

const RepetitionModal = ({isVisible, onClose, onSelect}) => {
  const [selectedValue, setSelectedValue] = useState('day');

  const handleSelect = value => {
    setSelectedValue(value);
    onSelect(value);
    onClose();
  };

  return (
    <Modal transparent={true} visible={isVisible} animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Repeats every</Text>
          <RadioButton.Group
            onValueChange={newValue => setSelectedValue(newValue)}
            value={selectedValue}>
            <TouchableOpacity
              style={styles.radioItem}
              onPress={() => handleSelect('day')}>
              <RadioButton
                value="day"
                color={Colors.LightGreen}
                uncheckedColor={Colors.Grey}
              />
              <Text style={styles.radioText}>Day</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.radioItem}
              onPress={() => handleSelect('week')}>
              <RadioButton
                value="week"
                color={Colors.LightGreen}
                uncheckedColor={Colors.Grey}
              />
              <Text style={styles.radioText}>Week</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.radioItem}
              onPress={() => handleSelect('month')}>
              <RadioButton
                value="month"
                color={Colors.LightGreen}
                uncheckedColor={Colors.Grey}
              />
              <Text style={styles.radioText}>Month</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.radioItem}
              onPress={() => handleSelect('year')}>
              <RadioButton
                value="Year"
                color={Colors.LightGreen}
                uncheckedColor={Colors.Grey}
              />
              <Text style={styles.radioText}>Year</Text>
            </TouchableOpacity>
          </RadioButton.Group>

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
