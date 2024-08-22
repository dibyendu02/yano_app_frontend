import {Image, ScrollView, StyleSheet} from 'react-native';
import React, {FC} from 'react';
import PatientElementsLocal from './PatientElementsLocal';
import {Colors} from '../../../../constants/Colors';
import {navigate} from '../../../../navigation/RootNavigation';

type Props = {
  data: {
    title: string;
    img: any;
    path: string;
  }[];
  setTypeofMeasurement: any;
};

const MeasurementItemsLocal: FC<Props> = ({data, setTypeofMeasurement}) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      {data.map((item, i) => (
        <PatientElementsLocal
          key={i}
          name={item.title}
          element={<Image source={item.img} style={styles.imageStyle} />}
          color="black"
          onPress={() => {
            // navigate(item.path)
            console.log(item.state);
            setTypeofMeasurement(item.state);
          }}
          customStyle={{paddingVertical: 15}}
        />
      ))}
    </ScrollView>
  );
};

export default MeasurementItemsLocal;

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  imageStyle: {
    width: 22,
    height: 22, // Specify height for consistency
    resizeMode: 'contain', // Use resizeMode to ensure the image is contained within the specified size
  },
});
