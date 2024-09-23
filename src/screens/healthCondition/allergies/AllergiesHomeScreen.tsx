import React, {useEffect} from 'react';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import CommonHomeScreen from '../components/CommonHomeScreen';
import {allergiesData} from '../../../api/GET/medicalHistoryData';
import {retrieveData} from '../../../utils/Storage';

const AllergiesHomeScreen = ({navigation}: any) => {
  const route = useRoute();
  const requiredUserId = route?.params?.requiredUserId;
  const [data, setData] = React.useState([]);
  const [userId, setUserId] = React.useState([]);

  const fetchData = async () => {
    try {
      let res;
      if (requiredUserId) res = await allergiesData({userId: requiredUserId});
      else res = await allergiesData({userId});

      console.log(res);

      // Check if the response contains the allergies array
      if (res && res.allergies && res.allergies.length > 0) {
        const transformedData = res.allergies.map((item: any, index: any) => ({
          requiredUserId: requiredUserId,
          id: item._id,
          name: item.nameOfTheAllergy,
          date: item.dateOfFirstDiagnosis,
          triggeredBy: item.triggeredBy, // Based on your model, this should be triggeredBy
          reaction: item.reaction,
          medicine: item.medicine,
          howOften: item.howOftenDoesItOccur,
          additionalNotes: item.additionalNotes || `No additional notes`,
        }));

        setData(transformedData);
      } else {
        // If no allergies are found, set an empty array
        setData([]);
      }
    } catch (error) {
      console.error('Error fetching allergies:', error);
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

  // Fetch data every time the screen is in focus
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [userId]),
  );

  return (
    <>
      <CommonHomeScreen
        requiredUserId={requiredUserId}
        navigation={navigation}
        data={data}
        heading="Allergies"
        addItem_path="AddAndEditAllergies"
        viewItem_path="AllergyDetails"
        emptyHomeTitle="No allergies added yet"
        emptyHomeMessage="Add your allergies to keep track of them."
      />
    </>
  );
};

export default AllergiesHomeScreen;
