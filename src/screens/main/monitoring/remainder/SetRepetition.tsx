import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CommonLayout from '../../../../components/CommonLayout' 
import FilledButton from '../../../../components/buttons/FilledButton'
import CustomInputField from '../../../../components/formComp/CustomInputField'
import { Control, Controller, FieldValues, useForm } from 'react-hook-form'
import CustomSelect from '../../../../components/formComp/SelectFiled' 
import { Colors } from '../../../../constants/Colors'
import { CheckCircleIcon, CheckIcon, CloseIcon } from '../../../../assets/icon/IconNames'
import CustomDatePicker from '../../../../components/formComp/CustomDatePicker'
import CommonHeader from '../../../healthCondition/components/CommonHeader'
import { navigate } from '../../../../navigation/RootNavigation'

const SetRepetition = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <CommonLayout>
      <CommonHeader
        leftIcon={
          <TouchableOpacity onPress={() => navigate('AddRemainder')}>
            <CloseIcon size={30}/>
          </TouchableOpacity>
        }
        title='Set Repetition'
        rightComp2={
          <FilledButton
            type='blue'
            label="Save"
            onPress={handleSubmit(onSubmit)}
            disabled={!true}
            style={{
              width: 70,
              paddingVertical: 10,
              borderRadius: 10,
            }}
          />}
      />
      <ScrollView>
        <View style={{ padding: 20 }}>
          <Text style={styles.label}>Repeats every</Text>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            marginBottom: 20
          }}>
            <View style={{
              width: 100,
            }}>
              <CustomInputField
                name='frequency'
                value='1'
                control={control as unknown as Control<FieldValues, object>}
              />
            </View>
            <View style={{ width: "70%" }}>
              <CustomSelect
                name='frequencyType'
                control={control as unknown as Control<FieldValues, object>}
                options={[
                  { label: 'Day', value: 'day' },
                  { label: 'Week', value: 'week' },
                  { label: 'Month', value: 'month' },
                ]}
              />
            </View>
          </View>
          <View>
            <Text style={[styles.label, { marginBottom: 0 }]}>Ends</Text>
            <Controller
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <View style={styles.container}>
                  <TouchableOpacity
                    style={[styles.optionContainer]}
                    onPress={() => onChange('never')}
                  >
                    {
                      value === 'never' ?
                        <CheckCircleIcon />
                        : <CheckIcon />
                    }
                    <Text style={styles.label}>  Never</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.optionContainer,]}
                    onPress={() => onChange(new Date().toDateString())}
                  >
                    {
                      value === new Date().toDateString() ?
                        <CheckCircleIcon />
                        : <CheckIcon />
                    }
                    <Text style={styles.label}> On</Text>
                    <View style={{ width: '50%' }}>
                      <CustomDatePicker
                        name='date'
                        control={control as unknown as Control<FieldValues, object>}
                      />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.optionContainer]}
                    onPress={() => onChange(1)}
                  >
                    {
                      value === 1 ?
                        <CheckCircleIcon />
                        : <CheckIcon />
                    }
                    <Text style={styles.label}>After</Text>
                    <CustomInputField
                      name='occurrence'
                      value='1'
                      control={control as unknown as Control<FieldValues, object>}
                    />
                    <Text style={styles.label}>repetition</Text>
                  </TouchableOpacity>
                </View>
              )}
              name={'ends'}
            />
          </View>
        </View>
      </ScrollView>
    </CommonLayout>
  )
}

export default SetRepetition

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.Blue,
    marginBottom: 5,
    marginHorizontal: 10,
  },
  container: {
    marginVertical: 10,
  },
  optionContainer: {
    width: '100%',
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
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
  input: {
    backgroundColor: Colors.White,
    borderRadius: 8,
    marginTop: 5,
    borderWidth: 1,
    borderColor: Colors.LightGray,
    height: 56,
    paddingHorizontal: 15,
    fontSize: 16
  },
})