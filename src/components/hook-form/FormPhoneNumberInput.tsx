/* eslint-disable react-native/no-inline-styles */
import React, {FC, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Controller, FieldError, useFormContext} from 'react-hook-form';
import {Colors} from '../../constants/Colors';
import {TextInput} from 'react-native-paper';
import BottomSheet from '../bottom-sheet/BottomSheet';
import FilledButton from '../buttons/FilledButton';
import {getCountryCodeWithFlagAndName} from '../../utils/CountryCodeUtils';
import {CountryFlags} from '../../assets/country-flags';

interface FormPhoneNumberInputProps {
  name: string;
  rules?: object;
  label?: string;
  placeholder?: string;
}

const FormPhoneNumberInput: FC<FormPhoneNumberInputProps> = ({
  name,
  placeholder,
  label,
  rules = {},
}) => {
  const countryList = getCountryCodeWithFlagAndName();
  const {control, setValue} = useFormContext();
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const handleOptionValueSelection = (value: string) => {
    setValue(name, value);
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
                      Countries
                    </Text>
                  </View>
                  <View
                    style={{
                      height: 500,
                      width: '100%',
                      paddingHorizontal: 20,
                    }}>
                    <FlatList
                      data={countryList}
                      showsVerticalScrollIndicator={false}
                      renderItem={({item, index: _i}) => (
                        <TouchableOpacity
                          key={item.code}
                          style={styles.optionItemContainer}
                          onPress={() => handleOptionValueSelection(item.code)}>
                          <Image
                            source={CountryFlags[item.code]}
                            style={{
                              height: 20,
                              width: 20,
                              marginHorizontal: 10,
                            }}
                          />
                          <Text
                            style={styles.optionItemLabel}
                            numberOfLines={2}>
                            {`${item.name}(${item.phoneCode})`}
                          </Text>
                        </TouchableOpacity>
                      )}
                    />
                  </View>
                  <View
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
                  </View>
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
    paddingVertical: 20,
  },
  optionItemLabel: {
    fontWeight: 'bold',
    color: Colors.Blue,
    width: '80%',
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

export default FormPhoneNumberInput;
