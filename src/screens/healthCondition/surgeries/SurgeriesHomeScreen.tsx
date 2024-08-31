import React, { useEffect } from 'react';
import CommonHomeScreen from '../components/CommonHomeScreen';
import { surgeriesData } from '../../../api/GET/medicalHistoryData';

const dummyData = [
  {
    id: 1,
    name: 'Open heart surgery',
    date: '12-02-2012',
    doctorName: 'Dr. House',
    additionalNotes: 'Additional note',
    devices: 'Cardiac pacemaker',
  },
];
const SurgeriesHomeScreen = ({ navigation }: any) => {
  const [data, setData] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await surgeriesData();
        if (res.surgeries.length === 0) {
          setData([]);
          return;
        }

        const transformedData = res.surgeries.map((item, index) => ({
          id: index + 1, // Assign a unique ID based on the index
          name: item.surgeryName, // Use surgeryName for the name
          date: new Date(item.dateOfSurgery).toLocaleDateString('en-US'), // Format the date
          doctorName: 'Dr. House', // Placeholder name; replace with actual if available
          additionalNotes: 'Additional note', // Placeholder for additional notes
          devices: 'Cardiac pacemaker', // Placeholder for devices; replace with actual if available
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
        heading="Surgeries"
        addItem_path="AddAndEditSurgeries"
        viewItem_path="SurgeriesDetails"
        emptyHomeTitle="No vaccines added yet"
        emptyHomeMessage="Add your vaccine to keep track of them."
      />
    </>
  );
};

export default SurgeriesHomeScreen;
