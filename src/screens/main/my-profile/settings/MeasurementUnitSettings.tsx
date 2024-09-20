import {Image, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../../../../constants/Colors';
import Header from '../../../../components/header/Header';
import {MeasurementSettingItems} from '../../../../assets/settings/SettingItem';
import DeviceItems from '../components/DeviceItems';
import MeasurementChangeCard from '../UiUpdateComponents/MeasurementChangeCard';
import {retrieveData} from '../../../../utils/Storage';
import {getMeasurementUnit} from '../../../../api/GET/measurementUnit'; // Assuming you have these APIs
import {postMeasurementUnit} from '../../../../api/POST/measurementUnit';
import {putMeasurementUnit} from '../../../../api/PUT/measurementUnit';

type MeasurementItem = {
  img: any;
  path: string;
  subtitle: string;
  title: string;
  unit1: string;
  unit2: string;
};

const MeasurementUnitSettings = () => {
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [userType, setUserType] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const [items, setItems] = useState<MeasurementItem | undefined>(undefined);
  const [selectedUnits, setSelectedUnits] = useState<{[key: string]: string}>(
    {},
  );

  const getUserData = async () => {
    const retrievedToken = await retrieveData('token');
    const retrievedUserId = await retrieveData('userId');
    const retrievedUserType = await retrieveData('userType');

    setToken(retrievedToken);
    setUserId(retrievedUserId);
    setUserType(retrievedUserType);
  };

  useEffect(() => {
    getUserData();
  }, []);

  // Fetch measurement unit data from server when userId and token are available
  useEffect(() => {
    if (userId && token) {
      const fetchSettingData = async () => {
        const res = await getMeasurementUnit({userId, token});
        if (res && res.measurementUnit) {
          // Set the existing units from server
          const serverData = res.measurementUnit;
          setSelectedUnits({
            Temperature:
              serverData.temperature === 'fahrenheit'
                ? 'Fahrenheit'
                : 'Celsius',
            Weight: serverData.weight === 'lb' ? 'Pounds' : 'Kilograms',
            Height:
              serverData.height === 'ft' ? 'Feets, inches' : 'Centimeters',
            'Blood glucose':
              serverData.bloodGlucose === 'mg' ? 'mg/dL' : 'mmol/L',
          });
        } else {
          // If no data exists, create new measurement units with default values
          const defaultMeasurementUnits = {
            userId,
            temperature: 'celsius', // default value
            weight: 'kg', // default value
            height: 'cm', // default value
            bloodGlucose: 'mmol', // default value
          };
          try {
            await postMeasurementUnit({
              data: defaultMeasurementUnits,
              token,
            });
            setSelectedUnits({
              Temperature: 'Celsius',
              Weight: 'Kilograms',
              Height: 'Centimeters',
              'Blood glucose': 'mmol/L',
            });
            console.log('Measurement units created with default values.');
          } catch (error) {
            console.error('Error creating default measurement units:', error);
          }
        }
      };
      fetchSettingData();
    }
  }, [userId, token]);

  const handlePress = (item: MeasurementItem) => {
    setItems(item);
    setIsClicked(true);
  };

  const handleUnitChange = async (unit: string) => {
    if (items) {
      const updatedUnits = {
        ...selectedUnits,
        [items.title]: unit,
      };
      setSelectedUnits(updatedUnits);
      setIsClicked(false);

      // Update the units on the server
      const updatedData = {
        temperature:
          updatedUnits['Temperature'] === 'Fahrenheit'
            ? 'fahrenheit'
            : 'celsius',
        weight: updatedUnits['Weight'] === 'Pounds' ? 'lb' : 'kg',
        height: updatedUnits['Height'] === 'Feets, inches' ? 'ft' : 'cm',
        bloodGlucose: updatedUnits['Blood glucose'] === 'mg/dL' ? 'mg' : 'mmol',
      };

      try {
        await putMeasurementUnit({userId, token, data: updatedData});
        console.log('Measurement units updated successfully');
      } catch (error) {
        console.error('Error updating measurement units', error);
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.GhostWhite,
        position: 'relative',
      }}>
      <Header title={'Measurement units'} />
      <ScrollView style={{paddingVertical: 12, width: '94%', margin: 'auto'}}>
        <View
          style={{
            backgroundColor: 'white',
            paddingHorizontal: 16,
            borderRadius: 8,
          }}>
          {MeasurementSettingItems.map((item, index) => (
            <DeviceItems
              key={item.title}
              element={
                <Image
                  source={item.img}
                  style={{objectFit: 'contain', height: 20, width: 20}}
                />
              }
              name={item.title}
              subtitle={selectedUnits[item.title] || item.unit1}
              customStyle={{
                borderBottomWidth:
                  index == MeasurementSettingItems.length - 1 ? 0 : 1,
                borderBottomColor: Colors.LightGray,
                borderRadius: 0,
                paddingHorizontal: 0,
              }}
              onPress={() => handlePress(item)}
            />
          ))}
        </View>
      </ScrollView>
      {isClicked && items && (
        <View style={styles.afterClick}>
          <MeasurementChangeCard
            title={`${items.title} unit`}
            active={setIsClicked}
            items={items}
            // Pass the currently selected unit for this item
            selectedUnit={selectedUnits[items.title]}
            onUnitChange={handleUnitChange}
          />
        </View>
      )}
    </View>
  );
};

export default MeasurementUnitSettings;

const styles = StyleSheet.create({
  afterClick: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: 1,
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
});
