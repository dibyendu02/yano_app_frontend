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
  isTextarea?: boolean;
};

export const InputField: FC<inputProps> = ({
  label,
  name,
  value,
  placeholder,
  onchange,
  isTextarea = false,
}) => {
  return (
    <View style={styles.inputBox}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          isTextarea && {height: 200, textAlignVertical: 'top'},
        ]}
        value={value}
        multiline={false}
        numberOfLines={isTextarea ? 10 : 1}
        placeholder={placeholder}
        onChangeText={e => onchange(name, e)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.Blue,
  },
  input: {
    // height: 56,
    paddingHorizontal: 15,
    backgroundColor: Colors.White,
    marginTop: 5,
    borderWidth: 1.3,
    borderColor: Colors.LightGray,
    fontSize: 16,
    height: 56,
    color: Colors.Blue,
    borderRadius: 8,
  },
});
