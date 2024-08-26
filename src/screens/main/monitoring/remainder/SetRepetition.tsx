import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CommonLayout from '../../../../components/CommonLayout';
import FilledButton from '../../../../components/buttons/FilledButton';
import CustomInputField from '../../../../components/formComp/CustomInputField';
import {
  Control,
  Controller,
  FieldValues,
  useForm,
  FormProvider,
} from 'react-hook-form';
import CustomSelect from '../../../../components/formComp/SelectFiled';
import { Colors } from '../../../../constants/Colors';
import {
  CheckCircleIcon,
  CheckIcon,
  CloseIcon,
} from '../../../../assets/icon/IconNames';
import CommonHeader from '../../../healthCondition/components/CommonHeader';
import { navigate } from '../../../../navigation/RootNavigation';
import FormDateInput from '../../../../components/hook-form/FormDateInput';
import RepetitionModal from './component/RepetationChange';
import CustomInputFieldLocal from './component/CustomInputFieldLocal';
import FormInputLocal from './component/FormInputLocal';
import { Image } from 'react-native';
import { staticIcons } from '../../../../assets/image';


const weekDay = {
  'sunday': 'S',
  'monday': 'M',
  'tuesday': 'T',
  'wednesday': 'W',
  'thursday': 'T',
  'friday': 'F',
  'saturday': 'S',
}
const SetRepetition = () => {
  const methods = useForm({
    defaultValues: {
      frequency: '1',
      frequencyType: 'day',
      ends: 'never',
      occurrence: '',
      date: null,
    },
  });

  const { control, handleSubmit, watch, setValue } = methods;
  const [modalVisible, setModalVisible] = useState(false);
  const [changeValue, setChangeValue] = useState('1');
  const [values, setValues] = useState('day');
  const [day, setDay] = useState('wednesday');

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const selectedEnds = watch('ends'); // Watch for changes in the 'ends' field

  useEffect(() => {
    console.log(values);
    console.log(day);
  }, [modalVisible, day]);
  return (
    <FormProvider {...methods}>
      <CommonLayout>
        <CommonHeader
          leftIcon={
            <TouchableOpacity onPress={() => navigate('AddRemainder')}>
              <CloseIcon size={30} />
            </TouchableOpacity>
          }
          title="Set repetition"
          rightComp2={
            <FilledButton
              type="blue"
              label="Save"
              onPress={handleSubmit(onSubmit)}
              style={{
                width: 70,
                paddingVertical: 10,
                borderRadius: 10,
              }}
            />
          }
        />
        <ScrollView>
          <View style={{ padding: 20 }}>
            <Text style={[styles.label, { marginLeft: 0 }]}>Repeats every</Text>
            <View style={styles.row}>
              <View style={styles.frequencyInput}>
                <CustomInputFieldLocal
                  name="frequency"
                  control={control as unknown as Control<FieldValues, object>}
                  rules={{ required: 'This field is required' }}
                />
              </View>

              <TouchableOpacity
                style={styles.frequencySelect}
                onPress={() => setModalVisible(true)}>
                <Controller
                  name="frequencyType"
                  control={control}
                  render={({ field: { value } }) => (
                    <Text style={styles.frequencyTypeText}>
                      {values.charAt(0).toUpperCase() + values.slice(1)}
                    </Text>
                  )}
                />
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 20,
                    height: 20,
                  }}>
                  <Image
                    source={staticIcons.downIcon}
                    style={{ width: 10, height: 10, objectFit: 'contain' }}
                  />
                </View>
              </TouchableOpacity>
            </View>

            {values == 'week' && <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                width: '100%',
                gap: 8,
                paddingBottom: 16,
                borderBottomColor: '#E9E9E9',
                borderBottomWidth: 2,
                marginBottom: 16,
              }}
            >
              {Object.keys(weekDay).map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 2,
                    borderColor: Colors.Blue,
                    borderRadius: 25,
                    width: 30,
                    height: 30,
                    backgroundColor: day === item ? Colors.Blue : Colors.White,
                  }}
                  onPress={() => setDay(item)}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '600',
                      color: day === item ? Colors.White : Colors.Blue,
                      textAlign: 'center',
                    }}
                  >
                    {weekDay[item]}
                  </Text>
                </TouchableOpacity>
              ))}

            </View>}


            <View>
              <Text style={[styles.label, { marginBottom: 0, marginLeft: 0 }]}>
                Ends
              </Text>
              <Controller
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <View style={styles.container}>
                    <TouchableOpacity
                      style={[styles.optionContainer]}
                      onPress={() => {
                        onChange('never');
                        setValue('date', null);
                        setValue('occurrence', '');
                      }}>
                      {value === 'never' ? (
                        <CheckCircleIcon color={Colors.LightGreen} size={25} />
                      ) : (
                        <CheckIcon color={Colors.LightGreen} size={25} />
                      )}
                      <Text style={styles.label}> Never</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.optionContainer]}
                      onPress={() => onChange('date')}>
                      {value === 'date' ? (
                        <CheckCircleIcon color={Colors.LightGreen} size={25} />
                      ) : (
                        <CheckIcon color={Colors.LightGreen} size={25} />
                      )}
                      <Text style={styles.label}> On</Text>
                      <View style={{ width: '35%' }}>
                        {/* {value === 'date' && ( */}
                        <FormInputLocal
                          name="date"
                          control={
                            control as unknown as Control<FieldValues, object>
                          }
                          rules={{
                            required: {
                              value: value === 'date',
                              message: 'Please select a date',
                            },
                          }}
                        />
                        {/* )} */}
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.optionContainer]}
                      onPress={() => onChange('after')}>
                      {value === 'after' ? (
                        <CheckCircleIcon color={Colors.LightGreen} size={25} />
                      ) : (
                        <CheckIcon color={Colors.LightGreen} size={25} />
                      )}
                      <Text style={styles.label}>After</Text>
                      {/* {value === 'after' && ( */}
                      <>
                        <CustomInputFieldLocal
                          name="occurrence"
                          value={changeValue}
                          // control={
                          //   control as unknown as Control<FieldValues, object>
                          // }
                          // onChange={setChangeValue}
                          rules={{ required: 'This field is required' }}
                        />
                        <Text style={styles.label}>repetition</Text>
                      </>
                      {/* )} */}
                    </TouchableOpacity>
                  </View>
                )}
                name={'ends'}
              />
            </View>
          </View>
        </ScrollView>

        {/* Modal for selecting repetition interval */}
        <RepetitionModal
          isVisible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSelect={value => {
            setValues(value)

          }}
        />
      </CommonLayout>
    </FormProvider>
  );
};

export default SetRepetition;

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.Blue,
    marginBottom: 5,
    marginHorizontal: 10,
    marginRight: 10,
  },
  container: {
    marginVertical: 10,
  },
  optionContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  inputBox: {
    marginBottom: 0,
  },
  textLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.Blue,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
    // backgroundColor: Colors.Red,
  },
  frequencyInput: {
    width: 55,
  },
  frequencySelect: {
    flexDirection: 'row',
    width: '35%',
    borderWidth: 1,
    borderColor: Colors.LightGray,
    borderRadius: 8,
    padding: 15,
    justifyContent: 'space-between',
    backgroundColor: Colors.White,
  },
  frequencyTypeText: {
    fontSize: 16,
    color: Colors.Blue,
  },
});
