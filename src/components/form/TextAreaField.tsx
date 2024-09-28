import React, {FC} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {Colors} from '../../constants/Colors';

type inputProps = {
  label?: string;
  name?: string;
  value: string;
  icon?: string;
  placeholder?: string;
  description?: string; // New optional description prop
  onchange: (name: string, e: string) => void;
};

export const TextArea: FC<inputProps> = ({
  label,
  name,
  value,
  placeholder,
  description, // Destructure the new prop
  onchange,
}) => {
  return (
    <View style={styles.inputBox}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input]}
        value={value}
        multiline={true}
        numberOfLines={5}
        placeholder={placeholder}
        onChangeText={e => onchange(name, e)}
      />
      {description && <Text style={styles.description}>{description}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.Blue,
  },
  input: {
    backgroundColor: Colors.White,
    borderRadius: 8,
    marginTop: 5,
    borderWidth: 1,
    borderColor: Colors.LightGray,
    paddingHorizontal: 15,
    fontSize: 16,
    textAlignVertical: 'top',
    color: Colors.SteelBlue,
  },
  description: {
    marginTop: 8,
    fontSize: 12,
    color: Colors.SteelBlue,
    // textAlign: 'center',
  },
});

export default TextArea;
