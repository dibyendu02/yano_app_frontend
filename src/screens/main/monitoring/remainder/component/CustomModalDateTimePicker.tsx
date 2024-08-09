import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Controller} from 'react-hook-form';
import {Colors} from '../../../../../constants/Colors';

const formatDate = date => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const formatTime = date => {
  return date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
};

const CustomModalDateTimePicker = ({
  name,
  label,
  mode,
  control,
  placeholder,
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setSelectedDate(date);
    hideDatePicker();
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({field: {onChange, value}}) => (
        <View style={styles.container}>
          <Text style={styles.label}>{label}</Text>
          <TouchableOpacity onPress={showDatePicker} style={styles.input}>
            <Text style={{color: Colors.Black}}>
              {selectedDate
                ? mode === 'date'
                  ? formatDate(selectedDate)
                  : formatTime(selectedDate)
                : placeholder}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode={mode}
            onConfirm={date => {
              handleConfirm(date);
              onChange(date);
            }}
            onCancel={hideDatePicker}
          />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: Colors.Black,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.LightGray,
    borderRadius: 5,
    padding: 10,
  },
});

export default CustomModalDateTimePicker;
