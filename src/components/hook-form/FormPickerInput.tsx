/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {FC, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {Controller, FieldError, useFormContext} from 'react-hook-form';
import {Colors} from '../../constants/Colors';
import {TextInput} from 'react-native-paper';
import BottomSheet from '../bottom-sheet/BottomSheet';
import FilledButton from '../buttons/FilledButton';

interface FormPickerInputInputProps {
  name: string;
  rules?: object;
  label?: string;
  optionsListLabel?: string;
  optionsListHeight?: number;
  placeholder?: string;
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
  const [middleDecimalItem, setMiddleDecimalItem] = useState(0);

  const handleViewableItemsChanged = ({viewableItems}) => {
    if (viewableItems.length > 0) {
      const middleIndex = Math.floor(viewableItems.length / 2);
      setMiddleItem(viewableItems[middleIndex].item);
    }
  };

  const handleDecimalViewableItemsChanged = ({viewableItems}) => {
    if (viewableItems.length > 0) {
      const middleIndex = Math.floor(viewableItems.length / 2);
      setMiddleDecimalItem(viewableItems[middleIndex].item);
    }
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 100, // Item is considered visible if it is 100% visible
  };

  const data = [];
  const decimalData = [null, null];
  if (name === 'weight') {
    for (let i = 10; i <= 120; i++) {
      data.push(`${i}`);
    }
    for (let i = 0; i <= 9; i++) {
      decimalData.push(`.${i}`);
    }
    for (let i = 10; i <= 11; i++) {
      decimalData.push(null);
    }
  } else if (name === 'height') {
    for (let i = 80; i <= 200; i++) {
      data.push(`${i}`);
    }
    for (let i = 0; i <= 9; i++) {
      decimalData.push(`.${i}`);
    }
    for (let i = 10; i <= 11; i++) {
      decimalData.push(null);
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
                      width: '50%',
                      paddingHorizontal: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 200,
                        borderRadius: 10,
                        backgroundColor: Colors.White,
                        overflow: 'hidden',
                      }}>
                      <FlatList
                        data={data}
                        contentContainerStyle={{width: '100%'}}
                        style={{
                          backgroundColor: Colors.Grey,
                          borderRightWidth: 2,
                          borderRightColor: '#D8D7D9',
                          width: '50%',
                          borderTopLeftRadius: 25,
                          borderBottomLeftRadius: 25,
                        }}
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
                              width: '100%',
                              justifyContent: 'center',
                              alignItems: 'center',
                              backgroundColor: Colors.LightGray,
                              marginVertical: item - middleItem === 0 ? 1 : 0,
                              borderTopWidth: item === middleItem ? 1 : 0,
                              borderBottomWidth: item === middleItem ? 1 : 0,
                              borderColor: '#D8D7D9',
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
                                fontWeight: 'bold',
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
                      <FlatList
                        data={decimalData}
                        contentContainerStyle={{width: '100%'}}
                        style={{
                          backgroundColor: Colors.Grey,
                          width: '50%',
                          borderTopRightRadius: 25,
                          borderBottomRightRadius: 25,
                        }}
                        showsVerticalScrollIndicator={false}
                        snapToInterval={40}
                        decelerationRate="fast"
                        bounces={false}
                        onViewableItemsChanged={
                          handleDecimalViewableItemsChanged
                        }
                        viewabilityConfig={viewabilityConfig}
                        renderItem={({item, index: _i}) =>
                          item !== null && (
                            <View
                              style={{
                                height: 40,
                                width: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: Colors.LightGray,
                                marginVertical:
                                  item - middleDecimalItem === 0 ? 1 : 0,
                                borderTopWidth:
                                  item === middleDecimalItem ? 2 : 0,
                                borderBottomWidth:
                                  item === middleDecimalItem ? 2 : 0,
                                borderColor: '#D8D7D9',
                              }}
                              key={item}>
                              <Text
                                style={{
                                  color: Colors.Black,
                                  opacity:
                                    item - middleDecimalItem === 0 ||
                                    item - middleDecimalItem === 0.1 ||
                                    item - middleDecimalItem === -0.1
                                      ? 1
                                      : 0.6,
                                  fontWeight: 'bold',
                                  fontFamily: 'Roboto',
                                  fontSize:
                                    item === middleDecimalItem
                                      ? 22
                                      : item - middleDecimalItem === 1 ||
                                        item - middleDecimalItem === -1
                                      ? 16
                                      : 12,
                                }}>
                                {item}
                              </Text>
                            </View>
                          )
                        }
                      />
                      {name === 'weight' && (
                        <View style={styles.unitLabel}>
                          <Text style={styles.unitText}>kg</Text>
                        </View>
                      )}
                      {name === 'height' && (
                        <View style={styles.unitLabel}>
                          <Text style={styles.unitText}>cm</Text>
                        </View>
                      )}
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
                      onPress={() => {
                        const selectedValue = `${middleItem}.${middleDecimalItem}`;
                        setValue(name, selectedValue);
                        setShowOptionsModal(false);
                      }}
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
  unitLabel: {
    position: 'absolute',
    top: '50%',
    transform: [{translateY: -5}, {translateX: 65}],
  },
  unitText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.Blue,
  },
});

export default FormPickerInputInput;
