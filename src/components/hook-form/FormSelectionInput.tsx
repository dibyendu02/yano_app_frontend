/* eslint-disable react-native/no-inline-styles */
import React, {FC, useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {Controller, FieldError, useFormContext} from 'react-hook-form';
import {Colors} from '../../constants/Colors';
import {RadioButton, TextInput} from 'react-native-paper';
import BottomSheet from '../bottom-sheet/BottomSheet';
// import FilledButton from '../buttons/FilledButton';

interface FormSelectionOption {
  id: string;
  label: string;
  enabled?: boolean;
}

interface FormSelectionInputProps {
  name: string;
  rules?: object;
  label?: string;
  optionsListLabel?: string;
  optionsListHeight?: number;
  placeholder?: string;
  options: FormSelectionOption[];
}

const FormSelectionInput: FC<FormSelectionInputProps> = ({
  name,
  placeholder,
  label,
  rules = {},
  optionsListLabel,
  optionsListHeight = 300,
  options = [],
}) => {
  const {control, setValue} = useFormContext();
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const handleOptionValueSelection = (value: string) => {
    setValue(name, value);
    setShowOptionsModal(false);
  };
  return (
    <View style={styles.inputBox}>
      <Controller
        control={control}
        rules={{...rules}}
        render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
          <View>
            {label && (
              <Text style={[styles.label, error && {color: Colors.Red}]}>
                {label}
              </Text>
            )}
            <TextInput
              style={[styles.input, error && styles.errorInput]}
              mode="outlined"
              outlineColor="transparent"
              activeOutlineColor="transparent"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              outlineStyle={styles.outline}
              cursorColor={Colors.Black}
              selectionColor={Colors.Black}
              editable={false}
              placeholder={placeholder}
              placeholderTextColor={Colors.LightBlack}
              right={
                <TextInput.Icon
                  icon="chevron-down"
                  size={25}
                  color={Colors.Grey}
                  onPress={() => setShowOptionsModal(true)}
                />
              }
            />
            {error && (
              <Text style={styles.errorText}>
                {(error as FieldError).message}
              </Text>
            )}
            {showOptionsModal && (
              <BottomSheet
                isVisible={showOptionsModal}
                onBackdropPress={() => setShowOptionsModal(false)}>
                <View style={{alignItems: 'center', width: '100%'}}>
                  {optionsListLabel && (
                    <View
                      style={{
                        width: '100%',
                        paddingHorizontal: 20,
                        marginVertical: 8,
                      }}>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: 'bold',
                          color: Colors.Blue,
                        }}>
                        {optionsListLabel}
                      </Text>
                    </View>
                  )}

                  <View
                    style={{
                      height: optionsListHeight,
                      width: '100%',
                      paddingHorizontal: 20,
                    }}>
                    <RadioButton.Group
                      onValueChange={sValue =>
                        handleOptionValueSelection(sValue)
                      }
                      value={value}>
                      <FlatList
                        data={options}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item, index: _i}) => (
                          <TouchableOpacity
                            key={item.id}
                            style={styles.optionItemContainer}
                            onPress={() => handleOptionValueSelection(item.id)}>
                            <RadioButton.Item
                              label={''}
                              mode="android"
                              value={item.id}
                              rippleColor={Colors.Transparent}
                              color={Colors.LightGreen}
                              uncheckedColor={Colors.Grey}
                            />
                            <Text style={styles.optionItemLabel}>
                              {item.label}
                            </Text>
                          </TouchableOpacity>
                        )}
                      />
                    </RadioButton.Group>
                  </View>
                  {/* <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      width: '90%',
                      paddingVertical: 10,
                    }}>
                    <FilledButton
                      label="Cancel"
                      type="lightGrey"
                      style={styles.bottomSheetBtn}
                    />
                    <FilledButton
                      label="Accept"
                      type="blue"
                      style={styles.bottomSheetBtn}
                      disabled={!value}
                    />
                  </View> */}
                </View>
              </BottomSheet>
            )}
          </View>
        )}
        name={name}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  optionItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: Colors.LightGray,
    paddingVertical: 6,
  },
  optionItemLabel: {
    fontWeight: 'bold',
    color: Colors.Blue,
    fontSize: 16,
  },
  errorInput: {
    borderColor: Colors.Red,
    borderRadius: 10,
  },
  errorText: {
    color: Colors.Red,
    marginTop: 2,
  },
  inputBox: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.Blue,
  },
  input: {
    backgroundColor: Colors.White,
    marginTop: 5,
    borderWidth: 1,
    borderColor: Colors.LightGray,
    fontSize: 16,
    height: 56,
    color: Colors.Blue,
  },
  outline: {
    borderRadius: 10,
  },
  bottomSheetBtn: {
    width: '45%',
  },
});

export default FormSelectionInput;
