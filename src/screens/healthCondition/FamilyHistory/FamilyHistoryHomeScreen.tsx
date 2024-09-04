import React, {useCallback} from 'react';
import CommonHomeScreen from '../components/CommonHomeScreen';
import {familyHistoryData} from '../../../api/GET/medicalHistoryData';
import {useFocusEffect} from '@react-navigation/native';

const FamilyHistoryHomeScreen = ({navigation}: any) => {
  const [data, setData] = React.useState([]);

  // Fetch family history data
  const fetchData = async () => {
    try {
      const res = await familyHistoryData();
      console.log(res);

      if (res.length === 0) {
        setData([]);
        return;
      }

      const transformedData = res?.familyHistory.map((item, index) => ({
        id: item._id,
        name: item.relationShip, // Use the relationShip field for the name
        disease: item.healthCondition, // Use the healthCondition field for the disease
      }));

      setData(transformedData);
    } catch (error) {
      console.error(error);
    }
  };

  // Use `useFocusEffect` to fetch data when the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, []),
  );

  return (
    <>
      <CommonHomeScreen
        navigation={navigation}
        data={data}
        heading="Family history"
        addItem_path="AddAndEditFamilyHistory"
        viewItem_path="FamilyHistoryDetails"
        emptyHomeTitle="No family history added yet"
        emptyHomeMessage="Add your family history to keep track of them."
        customStyle={{paddingTop: 55}}
      />
    </>
  );
};

export default FamilyHistoryHomeScreen;
