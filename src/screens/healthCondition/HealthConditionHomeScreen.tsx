import React, { useEffect } from 'react';
import CommonHomeScreen from './components/CommonHomeScreen';
import { healthConditionsData } from '../../api/GET/medicalHistoryData';


const dummyData = [
  {
    id: 1,
    name: 'Hypertension',
    date: '09-06-2012',
    status: 'Chronic',
    treatedBy: 'Dr. John Doe',
    medicine: 'Losartan Potassium',
    additionalNotes: 'Additional Notes',
  },
];

const HealthConditionHomeScreen = ({ navigation }: any) => {
  const [data, setData] = React.useState([]);
  // make sure that data has mandatory filed name is present

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await healthConditionsData();

        if (res.length === 0) {
          setData([]);
          return;
        }

        const transformedData = res?.healthConditions?.map((item, index) => ({
          id: index + 1, // Unique ID based on the index
          name: item.nameOfTheHealthCondition, // Use nameOfTheHealthCondition for the name
          date: new Date(item.dateOfDiagnosis).toLocaleDateString('en-US'), // Format the date
          status: item.status, // Use the status field directly
          treatedBy: 'Dr. John Doe', // Assuming a fixed value, or map from item.TreatedBy if available
          medicine: item.medicine, // Use the medicine field directly
          additionalNotes: item.additionalNotes, // Use additionalNotes field directly
        }));

        setData(transformedData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);


  return (
    <CommonHomeScreen
      navigation={navigation}
      data={data}
      heading="Health conditions"
      addItem_path="AddHealthCondition"
      viewItem_path="HealthConditionDetails"
      emptyHomeTitle="No health condition added yet"
      emptyHomeMessage="Add your health conditions to keep track of them."
    />
  );
};

export default HealthConditionHomeScreen;
