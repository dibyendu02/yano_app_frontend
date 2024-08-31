import {FC} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {Colors} from '../../constants/Colors';

type inputProps = {
  label?: string;
  name: string;
  value: string;
  icon?: string;
  onchange: (name: string, e: string) => void;
  placeholder?: string;
};

export const TextArea: FC<inputProps> = ({
  label,
  name,
  value,
  placeholder,
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
});
