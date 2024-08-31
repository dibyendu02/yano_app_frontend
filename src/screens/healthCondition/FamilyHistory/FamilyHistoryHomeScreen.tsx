import React, { useEffect } from 'react';
import CommonHomeScreen from '../components/CommonHomeScreen';
import { familyHistoryData } from '../../../api/GET/medicalHistoryData';

const dummyData = [
  {
    id: 1,
    name: 'Mother',
    disease: 'Hypertension',
  },
];
const FamilyHistoryHomeScreen = ({ navigation }: any) => {
  const [data, setData] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await familyHistoryData();
        console.log(res);

        if (res.length === 0) {
          setData([]);
          return;
        }

        const transformedData = res?.familyHistory.map((item, index) => ({
          id: index + 1, // Assign a unique ID based on the index
          name: item.relationShip, // Use the relationShip field for the name
          disease: item.healthCondition, // Use the healthCondition field for the disease
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
        heading="Family history"
        addItem_path="AddAndEditFamilyHistory"
        viewItem_path="FamilyHistoryDetails"
        emptyHomeTitle="No family history added yet"
        emptyHomeMessage="Add your family history  to keep track of them."
      />
    </>
  );
};

export default FamilyHistoryHomeScreen;
