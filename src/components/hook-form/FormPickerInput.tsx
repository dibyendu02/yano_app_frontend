/* eslint-disable react/self-closing-comp */
// FormSliderSelectionInput;

/* eslint-disable react-native/no-inline-styles */
import React, {FC, useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {Controller, FieldError, useFormContext} from 'react-hook-form';
import {Colors} from '../../constants/Colors';
import {RadioButton, TextInput} from 'react-native-paper';
import BottomSheet from '../bottom-sheet/BottomSheet';
import FilledButton from '../buttons/FilledButton';
// import FilledButton from '../buttons/FilledButton';

interface FormPickerInputInputProps {
  name: string;
  rules?: object;
  label?: string;
  optionsListLabel?: string;
  optionsListHeight?: number;
  placeholder?: string;
  selectedId?: string;
  showActionButtons?: boolean;
}

const FormPickerInputInput: FC<FormPickerInputInputProps> = ({
  name,
  placeholder,
  label,
  rules = {},
  optionsListLabel,
  optionsListHeight = 300,
}) => {
  let lastValue: any;
  const {control, setValue} = useFormContext();
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const handleOptionValueSelection = (value: string) => {
    setValue(name, value);
  };

  const [middleItem, setMiddleItem] = useState(0);

  const handleViewableItemsChanged = ({viewableItems}) => {
    if (viewableItems.length > 0) {
      const middleIndex = Math.floor(viewableItems.length / 2);
      setMiddleItem(viewableItems[middleIndex].item);
    }
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 100, // Item is considered visible if it is 100% visible
  };

  const data = [];
  if (name == 'weight') {
    for (let i = 28; i <= 120; i++) {
      data.push(i);
    }
  }
  if (name == 'height') {
    for (let i = 148; i <= 200; i++) {
      data.push(i);
    }
  }

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
                onBackdropPress={() => {
                  setShowOptionsModal(false);
                }}>
                <View style={{alignItems: 'center', width: '100%'}}>
                  {optionsListLabel && (
                    <View
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        paddingHorizontal: 20,
                        marginVertical: 8,
                      }}>
                      <Text
                        style={{
                          fontSize: 24,
                          fontWeight: 'bold',
                          color: Colors.Blue,
                        }}>
                        {optionsListLabel}
                      </Text>
                    </View>
                  )}

                  <View
                    style={{
                      height: 250,
                      width: '100%',
                      paddingHorizontal: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        // width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 200,
                        borderRadius: 25,
                        backgroundColor: 'red',
                      }}>
                      <FlatList
                        data={data}
                        contentContainerStyle={{width: 70}}
                        style={{backgroundColor: Colors.Grey, borderRadius: 8}}
                        showsVerticalScrollIndicator={false}
                        snapToInterval={40}
                        decelerationRate="fast"
                        bounces={false}
                        onViewableItemsChanged={handleViewableItemsChanged}
                        viewabilityConfig={viewabilityConfig}
                        renderItem={({item, index: _i}) => (
                          <View
                            style={{
                              height: 40,
                              width: 70,
                              justifyContent: 'center',
                              alignItems: 'center',
                              backgroundColor: Colors.LightGray,
                              marginVertical: item - middleItem === 0 ? 1 : 0,
                            }}
                            key={item}>
                            <Text
                              style={{
                                color: Colors.Blue,
                                opacity:
                                  item - middleItem === 0 ||
                                  item - middleItem === 1 ||
                                  item - middleItem === -1
                                    ? 1
                                    : 0.6,
                                fontWeight: '600',
                                fontFamily: 'Roboto',
                                fontSize:
                                  item === middleItem
                                    ? 22
                                    : item - middleItem === 1 ||
                                      item - middleItem === -1
                                    ? 16
                                    : 12,
                              }}>
                              {item}
                            </Text>
                          </View>
                        )}
                      />
                    </View>
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
                      onPress={() => {
                        setValue(name, lastValue);
                        setShowOptionsModal(false);
                      }}
                    />
                    <FilledButton
                      label="Accept"
                      type="blue"
                      style={styles.bottomSheetBtn}
                      // disabled={!value}
                      onPress={() => setShowOptionsModal(false)}
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

export default FormPickerInputInput;
