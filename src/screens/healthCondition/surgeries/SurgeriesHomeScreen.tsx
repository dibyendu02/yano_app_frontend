import React, {useEffect, useCallback} from 'react';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import CommonHomeScreen from '../components/CommonHomeScreen';
import {getSurgeriesData} from '../../../api/GET/medicalHistoryData';
import {retrieveData} from '../../../utils/Storage';

const SurgeriesHomeScreen = ({navigation}: any) => {
  const route = useRoute();
  const requiredUserId = route?.params?.requiredUserId;
  const [data, setData] = React.useState([]);
  const [userId, setUserId] = React.useState([]);

  const fetchData = async () => {
    try {
      let res;
      if (requiredUserId)
        res = await getSurgeriesData({userId: requiredUserId});
      else res = await getSurgeriesData({userId});
      if (res.surgeries.length === 0) {
        setData([]);
        return;
      }

      const transformedData = res?.surgeries?.map((item, index) => ({
        requiredUserId: requiredUserId,
        id: item._id, // Assign a unique ID based on the index
        name: item.surgeryName, // Use surgeryName for the name
        date: item.dateOfSurgery, // Format the date
        doctorName: item.physicianInCharge, // Placeholder name; replace with actual if available
        additionalNotes: item?.additionalNotes, // Placeholder for additional notes
        devices: item?.supportDevices, // Placeholder for devices; replace with actual if available
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
        heading="Surgeries"
        addItem_path="AddAndEditSurgeries"
        viewItem_path="SurgeriesDetails"
        emptyHomeTitle="No surgeries added yet"
        emptyHomeMessage="Add your surgeries to keep track of them."
        customStyle={{paddingTop: 55}}
      />
    </>
  );
};

export default SurgeriesHomeScreen;
