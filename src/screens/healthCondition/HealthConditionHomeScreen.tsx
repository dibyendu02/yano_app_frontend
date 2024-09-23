import React, {useEffect} from 'react';
import CommonHomeScreen from './components/CommonHomeScreen';
import {healthConditionsData} from '../../api/GET/medicalHistoryData';
import {retrieveData} from '../../utils/Storage';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {useCallback} from 'react';

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

const HealthConditionHomeScreen = ({navigation}: any) => {
  const route = useRoute();
  const requiredUserId = route?.params?.requiredUserId;
  const [data, setData] = React.useState([]);
  const [userId, setUserId] = React.useState([]);
  const [token, setToken] = React.useState([]);

  const fetchData = async () => {
    try {
      let res;
      if (requiredUserId) {
        console.log(requiredUserId);
        res = await healthConditionsData({userId: requiredUserId, token});
      } else res = await healthConditionsData({userId, token});

      if (res.length === 0) {
        setData([]);
        return;
      }

      console.log(res);

      const transformedData = res?.healthConditions?.map((item, index) => ({
        requiredUserId: requiredUserId,
        id: item._id, // Unique ID based on the index
        name: item.nameOfTheHealthCondition, // Use nameOfTheHealthCondition for the name
        date: item.dateOfDiagnosis, //new Date(item.dateOfDiagnosis).toLocaleDateString('en-US'), // Format the date
        status: item.status, // Use the status field directly
        treatedBy: item.treatedBy, // Assuming a fixed value, or map from item.TreatedBy if available
        medicine: item.medicine, // Use the medicine field directly
        additionalNotes: item.additionalNotes, // Use additionalNotes field directly
      }));

      setData(transformedData);
    } catch (error) {
      console.error(error);
    }
  };

  const getUserData = async () => {
    const retrievedUserId = await retrieveData('userId');
    const retrievedToken = await retrieveData('token');
    setUserId(retrievedUserId);
    setToken(retrievedToken);
  };

  useEffect(() => {
    getUserData();
  }, []);

  // Trigger fetchData whenever the screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [userId, token]),
  );

  return (
    <CommonHomeScreen
      requiredUserId={requiredUserId}
      navigation={navigation}
      data={data}
      heading="Health conditions"
      addItem_path="AddHealthCondition"
      viewItem_path="HealthConditionDetails"
      emptyHomeTitle="No health condition added yet"
      emptyHomeMessage="Add your health conditions to keep track of them."
      customStyle={{paddingTop: 55}}
    />
  );
};

export default HealthConditionHomeScreen;
