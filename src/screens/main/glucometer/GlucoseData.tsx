import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {useForm, Controller, FormProvider} from 'react-hook-form';
import {Colors} from '../../../constants/Colors';
import Header from '../../../components/header/Header';
import {retrieveData} from '../../../utils/Storage';
import CommonHeader from '../../healthCondition/components/CommonHeader';
import DetailItems from '../../healthCondition/components/DetailItems';
import FilledButton from '../../../components/buttons/FilledButton';
import TextArea from '../../../components/form/TextAreaField';
import SyncCard from './components/SyncCard';
import {addBloodGlucoseData} from '../../../api/POST/bloodGlucose';

const GlucoseData = ({navigation, route}: any) => {
  if (!route || !route.params) {
    Alert.alert('Error', 'Data not passed or invalid data passed');
    return navigation.goBack();
  }

  const data = route.params.data;

  const [isClicked, setIsClicked] = useState(false);
  const [userId, setUserId] = useState('');
  const [userType, setUserType] = useState('');
  const [token, setToken] = useState('');

  const [formData, setFormData] = useState({
    measurementTime: data.measurementTime || '',
    glucoseMeasurementValue: data.glucoseMeasurementValue || '',
    glucoseMeasurementUnit: data.glucoseMeasurementUnit || '',
    foodConsumed: data.foodConsumed || '',
    note: '', // Initialize the note field with an empty string
  });

  const methods = useForm({
    mode: 'onChange',
    defaultValues: formData,
  });

  const {handleSubmit, control, watch} = methods;

  const getUserData = async () => {
    const retrievedUserId = await retrieveData('userId');
    const retrievedUserType = await retrieveData('userType');
    const retrievedToken = await retrieveData('token');
    setUserId(retrievedUserId);
    setUserType(retrievedUserType);
    setToken(retrievedToken);
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleChange = (id: string, e: string) => {
    setFormData({...formData, [id]: e});
  };

  const saveBloodGlucoseData = async () => {
    const structuredData = {
      userId,
      age: 0,
      data: Number(formData.glucoseMeasurementValue),
      unit: formData.glucoseMeasurementUnit,
      foodConsumed: formData.foodConsumed,
      note: formData.note,
    };
    try {
      await addBloodGlucoseData({data: structuredData, token});
      console.log('Data saved successfully');
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = () => {
    saveBloodGlucoseData();
    setIsClicked(true);
  };

  // Watching formData.note to see changes in the console
  useEffect(() => {
    console.log('Note field updated:', formData.note);
  }, [formData.note]);

  return (
    <TouchableWithoutFeedback
      onPress={() => setIsClicked(false)}
      onPressIn={() => Keyboard.dismiss()}>
      <View style={{flex: 1, backgroundColor: Colors.GhostWhite}}>
        <CommonHeader
          title={'Blood Glucose Measu...'}
          rightComp1={
            <FilledButton
              type="blue"
              label="Save"
              onPress={handleSubmit(onSubmit)}
              style={{width: 70, paddingVertical: 10, borderRadius: 10}}
            />
          }
          customStyle={{paddingVertical: 12, paddingTop: 55}}
        />
        <ScrollView>
          <View style={{paddingVertical: 12, width: '94%', margin: 'auto'}}>
            <View style={styles.boxStyle}>
              <Controller
                control={control}
                name="measurementTime"
                render={({field: {onChange, value}}) => (
                  <DetailItems
                    name="Time of the measurement"
                    value={value}
                    editable={true}
                    onValueChange={onChange}
                  />
                )}
              />

              <Controller
                control={control}
                name="glucoseMeasurementValue"
                render={({field: {onChange, value}, formState: {errors}}) => {
                  const mergedValue = `${methods.getValues(
                    'glucoseMeasurementValue',
                  )} ${methods.getValues('glucoseMeasurementUnit')}`;
                  return (
                    <DetailItems
                      name="Blood glucose measurement"
                      value={mergedValue}
                      editable={true}
                      onValueChange={onChange}
                      error={errors.glucoseMeasurementValue?.message}
                    />
                  );
                }}
              />

              <Controller
                control={control}
                name="foodConsumed"
                render={({field: {onChange, value}}) => (
                  <DetailItems
                    name="Food consumed"
                    value={value}
                    editable={true}
                    onValueChange={onChange}
                  />
                )}
              />

              {/* TextArea for the 'note' field */}
              <Controller
                control={control}
                name="note"
                render={({field: {onChange, value}}) => (
                  <TextArea
                    label="Note (optional)"
                    placeholder="Enter your notes here..."
                    value={value} // Binds the current value of the note field
                    onchange={(name, e) => {
                      onChange(e); // Update the form's value
                      handleChange('note', e); // Sync with local state
                    }}
                    description="Describe your overall health status, including any symptoms, concerns, or changes you've noticed."
                  />
                )}
              />
            </View>
          </View>
        </ScrollView>
        {isClicked && (
          <View style={styles.deleteButtonClick}>
            <SyncCard
              title={'Data has been synced'}
              children={'The YANO® Glucometer data sync has been completed.'}
              active={setIsClicked}
              action={() => navigation.navigate('SyncGlucometer')}
            />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default GlucoseData;

const styles = StyleSheet.create({
  boxStyle: {
    width: '100%',
    backgroundColor: Colors.White,
    paddingHorizontal: 20,
    paddingTop: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  deleteButtonClick: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: 1,
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 12,
  },
});
