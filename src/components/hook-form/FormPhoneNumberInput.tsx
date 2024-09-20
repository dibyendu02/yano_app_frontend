import React, {FC, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import {Controller, FieldError, useFormContext} from 'react-hook-form';
import {Colors} from '../../constants/Colors';
// import {TextInput} from 'react-native-paper';
import BottomSheet from '../bottom-sheet/BottomSheet';
import {getCountryCodeWithFlagAndName} from '../../utils/CountryCodeUtils';
import {CountryFlags} from '../../assets/country-flags';

interface FormPhoneNumberInputProps {
  name: string;
  rules?: object;
  label?: string;
  defaultValue?: string;
  placeholder?: string;
}

const FormPhoneNumberInput: FC<FormPhoneNumberInputProps> = ({
  name,
  placeholder,
  label,
  defaultValue = '',
  rules = {},
}) => {
  const countryList = getCountryCodeWithFlagAndName();
  const {control, setValue} = useFormContext();
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countryList[0]);
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    if (defaultValue) {
      const matchedCountry = countryList.find(country =>
        defaultValue.startsWith(country.phoneCode),
      );
      if (matchedCountry && matchedCountry.code !== selectedCountry.code) {
        setSelectedCountry(matchedCountry);
        setPhoneNumber(defaultValue.replace(matchedCountry.phoneCode, ''));
      }

      if (matchedCountry === selectedCountry) {
        setPhoneNumber(defaultValue.replace(matchedCountry.phoneCode, ''));
      }
    }
  }, [defaultValue, countryList]);

  useEffect(() => {
    // Set full value with country code and phone number
    console.log('selected country is  ', selectedCountry);
    setValue(name, `${selectedCountry.phoneCode}${phoneNumber}`);
  }, [name, phoneNumber]);

  const handleOptionValueSelection = (country: any) => {
    console.log('country choosed ', country);
    setSelectedCountry(country);
    setShowOptionsModal(false);

    setValue(name, `${selectedCountry.phoneCode}${phoneNumber}`);

    console.log('selected country should be  ', selectedCountry);
  };

  const handlePhoneNumberChange = (text: string) => {
    setPhoneNumber(text); // Update only the phone number part
  };

  return (
    <View style={styles.inputBox}>
      <Controller
        control={control}
        rules={{
          ...rules,
          pattern: {
            value: new RegExp(selectedCountry.regex),
            message: 'Enter valid phone number!',
          },
        }}
        render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
          <View>
            {label && (
              <Text style={[styles.label, error && {color: Colors.Red}]}>
                {label}
              </Text>
            )}
            <View
              style={[
                styles.phoneNumberContainer,
                error && styles.errorInputContainer,
              ]}>
              {/* Country Code - Non-editable part */}
              <TouchableOpacity
                onPress={() => setShowOptionsModal(true)}
                style={styles.countryCodeContainer}>
                <Image
                  source={CountryFlags[selectedCountry.code]}
                  style={styles.flagImage}
                />
                <Text style={styles.countryCodeText}>
                  {selectedCountry.phoneCode}
                </Text>
              </TouchableOpacity>
              {/* Phone Number - Editable part */}
              <TextInput
                style={[styles.input, error && styles.errorInput]}
                // mode="outlined"
                // outlineColor={Colors.LightGray}
                // activeOutlineColor="transparent"
                onBlur={onBlur}
                onChangeText={text => {
                  handlePhoneNumberChange(text); // Update only the phone number part
                  onChange(`${selectedCountry.phoneCode}${text}`); // Concatenate country code with the phone number
                }}
                value={phoneNumber} // Display only the phone number (country code is fixed)
                // outlineStyle={styles.outline}
                cursorColor={Colors.Black}
                selectionColor={Colors.Black}
                placeholder={placeholder}
                placeholderTextColor={Colors.LightBlack}
                inputMode="numeric"
              />
            </View>
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
                      renderItem={({item}) => (
                        <TouchableOpacity
                          key={item.code}
                          style={styles.optionItemContainer}
                          onPress={() => handleOptionValueSelection(item)}>
                          <Image
                            source={CountryFlags[item.code]}
                            style={{
                              height: 30,
                              width: 30,
                              marginHorizontal: 10,
                              borderRadius: 30,
                            }}
                          />
                          <Text
                            style={styles.optionItemLabel}
                            numberOfLines={2}>
                            {`${item.name} (${item.phoneCode})`}
                          </Text>
                        </TouchableOpacity>
                      )}
                    />
                  </View>
                </View>
              </BottomSheet>
            )}
          </View>
        )}
        name={name}
        defaultValue={`${selectedCountry.phoneCode}${phoneNumber}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  phoneNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.White,
    borderWidth: 2,
    borderColor: Colors.LightGray,
    borderRadius: 10,
    paddingLeft: 8, // Reduce padding between code and input
    paddingRight: 10,
    height: 56,
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 3, // Reduce the gap between the flag and phone input
  },
  flagImage: {
    height: 30,
    width: 30,
    borderRadius: 50,
  },
  countryCodeText: {
    fontSize: 16,
    color: Colors.Blue,
    marginLeft: 5,
  },
  input: {
    backgroundColor: Colors.White,
    borderWidth: 0,
    fontSize: 16,
    width: '75%',
    paddingTop: 12,
    paddingLeft: 0,
    color: Colors.Blue,
  },
  errorInput: {
    borderColor: Colors.Red,
  },
  errorInputContainer: {
    borderColor: Colors.Red,
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
    marginBottom: 5,
  },
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
    fontSize: 16,
  },
  outline: {
    borderRadius: 10,
  },
});

export default FormPhoneNumberInput;
