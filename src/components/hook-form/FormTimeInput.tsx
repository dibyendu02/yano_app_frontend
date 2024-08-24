import React, {useState} from 'react';
import {View, Text, TextInput, Pressable, StyleSheet} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Controller, useFormContext} from 'react-hook-form';
import moment from 'moment';
import {TimeIcon} from '../../assets/icon/IconNames'; // Update the path as necessary

const FormTimePicker = ({name, label, rules}) => {
  const {control} = useFormContext();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date, onChange) => {
    onChange(date);
    hideDatePicker();
  };

  return (
    <View style={styles.inputBox}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({field: {onChange, value}, fieldState: {error}}) => (
          <View>
            <Pressable onPress={showDatePicker} style={styles.inputContainer}>
              <TextInput
                style={[styles.input, error && styles.errorInput]}
                value={value ? moment(value).format('HH:mm A') : ''}
                placeholder={'Choose Time'}
                editable={false}
                pointerEvents="none"
              />
              <View style={styles.iconContainer}>
                <TimeIcon />
              </View>
            </Pressable>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="time"
              onConfirm={date => handleConfirm(date, onChange)}
              onCancel={hideDatePicker}
              customHeaderIOS={() => (
                <Text style={styles.modalHeader}>Select Time</Text>
              )}
              customTextInputIOS={() => (
                <TextInput
                  style={styles.customInput}
                  value={value ? moment(value).format('HH:mm A') : ''}
                  editable={false}
                  pointerEvents="none"
                />
              )}
            />
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 5,
  },
  inputContainer: {
    position: 'relative',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    height: 56,
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 45, // Space for the icon
  },
  input: {
    fontSize: 16,
    color: '#000',
    height: '100%',
    padding: 0,
  },
  iconContainer: {
    position: 'absolute',
    top: 16,
    right: 15,
  },
  errorText: {
    color: 'red',
    marginTop: 2,
  },
  errorInput: {
    borderColor: 'red',
  },
  customInput: {
    color: '#00263E',
    fontSize: 16,
    textAlign: 'center',
  },
  modalHeader: {
    color: '#00263E',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default FormTimePicker;
