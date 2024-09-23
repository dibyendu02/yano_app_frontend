import React, {useCallback, useEffect} from 'react';
import CommonHomeScreen from '../components/CommonHomeScreen';
import {familyHistoryData} from '../../../api/GET/medicalHistoryData';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {retrieveData} from '../../../utils/Storage';

const FamilyHistoryHomeScreen = ({navigation}: any) => {
  const route = useRoute();
  const requiredUserId = route?.params?.requiredUserId;
  const [data, setData] = React.useState([]);
  const [userId, setUserId] = React.useState([]);

  // Fetch family history data
  const fetchData = async () => {
    try {
      let res;
      if (requiredUserId)
        res = await familyHistoryData({userId: requiredUserId});
      else res = await familyHistoryData({userId});
      console.log('res is ', res);

      if (res.length === 0) {
        setData([]);
        return;
      }

      const transformedData = res?.familyHistory.map((item, index) => ({
        requiredUserId: requiredUserId,
        id: item._id,
        name: item.relationShip, // Use the relationShip field for the name
        disease: item.healthCondition, // Use the healthCondition field for the disease
      }));

      setData(transformedData);
    } catch (error) {
      console.error(error);
    }
  };

  const getUserData = async () => {
    const retrievedUserId = await retrieveData('userId');
    // const retrievedToken = await retrieveData('token');
    setUserId(retrievedUserId);
    // setToken(retrievedToken);
  };

  useEffect(() => {
    getUserData();
  }, []);

  // Use `useFocusEffect` to fetch data when the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [userId]),
  );

  return (
    <>
      <CommonHomeScreen
        requiredUserId={requiredUserId}
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
