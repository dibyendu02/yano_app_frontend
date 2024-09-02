import {Image, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../../../constants/Colors';
import Header from '../../../../components/header/Header';
import {MeasurementSettingItems} from '../../../../assets/settings/SettingItem';
import DeviceItems from '../components/DeviceItems';
import MeasurementChangeCard from '../UiUpdateComponents/MeasurementChangeCard';

type MeasurementItem = {
  img: any; // Replace with the specific type if available
  path: string;
  subtitle: string;
  title: string;
  unit1: string;
  unit2: string;
};

const MeasurementUnitSettings = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [items, setItems] = useState<MeasurementItem | undefined>(undefined);
  const [selectedUnits, setSelectedUnits] = useState<{[key: string]: string}>(
    {},
  );

  const handlePress = (item: MeasurementItem) => {
    setItems(item);
    setIsClicked(true);
  };

  const handleUnitChange = (unit: string) => {
    if (items) {
      setSelectedUnits(prevUnits => ({
        ...prevUnits,
        [items.title]: unit,
      }));
    }
    setIsClicked(false);
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
                // borderTopRightRadius: index == 0 ? 8 : 0,
                // borderTopLeftRadius: index == 0 ? 8 : 0,
                // borderBottomRightRadius:
                //   index == MeasurementSettingItems.length - 1 ? 8 : 0,
                // borderBottomLeftRadius:
                //   index == MeasurementSettingItems.length - 1 ? 8 : 0,
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
            onUnitChange={handleUnitChange} // Pass the handler for unit change
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
