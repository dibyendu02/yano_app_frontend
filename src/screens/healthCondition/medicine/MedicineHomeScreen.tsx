import React, { useEffect, useState } from 'react';
import CommonHomeScreen from '../components/CommonHomeScreen';
import { medicinesData } from '../../../api/GET/medicalHistoryData';

const dummyData = [
  {
    id: 1,
    name: 'Losartan Potassium',
    volume: '100',
    unit: 'mg',
    medicine: 'Pill',
    field4: 'Orally',
    field5: '1',
    field6: 'Daily',
    field7: 'At breakfast',
    field8: '',
    field9: '2024-07-27T11:38:00.000Z',
    field10: '2024-07-10T11:38:00.000Z',
    field11: true,
    field12: 'Hypertension',
    field13: 'Dr. Lee',
    field14: 'Headache',
  },
  {
    id: 2,
    name: 'Aspirin',
    volume: '500',
    unit: 'mg',
    medicine: 'Pill',
    field4: 'Orally',
    field5: '1',
    field6: 'Daily',
    field7: 'At breakfast',
    field8: '',
    field9: '2024-07-27T11:38:00.000Z',
    field10: '2024-07-10T11:38:00.000Z',
    field11: true,
    field12: 'Hypertension',
    field13: 'Dr. Lee',
    field14: 'Headache',
  },
  {
    id: 3,
    name: 'Metformin',
    volume: '850',
    unit: 'mg',
    medicine: 'Pill',
    field4: 'Orally',
    field5: '1',
    field6: 'Daily',
    field7: 'At breakfast',
    field8: '',
    field9: '2024-07-27T11:38:00.000Z',
    field10: '2024-07-10T11:38:00.000Z',
    field11: true,
    field12: 'Hypertension',
    field13: 'Dr. Lee',
    field14: 'Headache',
  },
];
const MedicineHomeScreen = ({ navigation }: any) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await medicinesData();

        if (res.length === 0) {
          setData([]);
          return;
        }

        const transformedData = res?.medicines?.map((item, index) => ({
          id: index + 1, // Unique ID based on the index
          name: item.medicineName, // Medicine name from the data
          volume: '500', // Assuming you need to manually specify or calculate this
          unit: 'mg', // Assuming this is a fixed value or needs to be calculated
          medicine: 'Pill', // Assuming a fixed value or based on item.formOfMedication
          field4: 'Orally', // Assuming a fixed value
          field5: '1', // Assuming a fixed value or needs to be derived from doses
          field6: 'Daily', // Assuming a fixed value
          field7: 'At breakfast', // Assuming a fixed value
          field8: '', // Assuming this field is empty or needs to be derived
          field9: item.duration.whenItBegins, // Start date
          field10: item.duration.whenItEnds, // End date
          field11: item.duration.longDuration, // Boolean value for longDuration
          field12: 'Hypertension', // Assuming a fixed value or needs to be derived
          field13: 'Dr. Lee', // Assuming a fixed value or needs to be mapped from item.additionalInformation.prescribedBy
          field14: item.additionalInformation.medicineTakenFor, // Medicine taken for (e.g., Headache)
        }));

        setData(transformedData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);


  return (
    <>
      <CommonHomeScreen
        navigation={navigation}
        data={data}
        heading="Medicines"
        addItem_path="AddAndEditMedicine"
        viewItem_path="MedicineDetails"
        emptyHomeTitle="No medicine added yet"
        emptyHomeMessage="Add your medicine to keep track of them."
      />
    </>
  );
};

export default MedicineHomeScreen;
