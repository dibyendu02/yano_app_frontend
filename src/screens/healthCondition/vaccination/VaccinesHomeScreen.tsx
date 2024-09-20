import React, {useCallback, useEffect, useState} from 'react';
import CommonHomeScreen from '../components/CommonHomeScreen';
import {retrieveData} from '../../../utils/Storage';
import {getVaccinesData} from '../../../api/GET/medicalHistoryData';
import {useFocusEffect, useRoute} from '@react-navigation/native';

const VaccinesHomeScreen = ({navigation}: any) => {
  const route = useRoute();
  const requiredUserId = route?.params?.requiredUserId;
  const [userId, setUserId] = useState('');
  const [data, setData] = React.useState([]);
  const getUserData = async () => {
    const retrievedUserId = await retrieveData('userId');
    setUserId(retrievedUserId);
  };

  useEffect(() => {
    getUserData();
  }, []);
  const fetchData = async () => {
    try {
      let res;
      if (requiredUserId) res = await getVaccinesData({userId: requiredUserId});
      else res = await getVaccinesData({userId});
      console.log(res);

      if (res?.vaccines.length === 0) {
        setData([]);
        return;
      }

      const transformedData = res?.vaccines?.map((item, index) => ({
        requiredUserId: requiredUserId,
        id: item._id,
        shotDate: item.shotDate,
        name: item.vaccineName,
        vaccineFor: item.vaccineFor,
        vaccineDetails: item.vaccineDetails,
        lotNumber: item?.lotNumber,
        additionalNotes: item?.additionalNotes,
      }));

      setData(transformedData);
    } catch (error) {
      console.error(error);
    }
  };

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
        heading="Vaccines"
        addItem_path="AddAndEditVaccine"
        viewItem_path="VaccineDetails"
        emptyHomeTitle="No vaccines added yet"
        emptyHomeMessage="Add your vaccine to keep track of them."
        customStyle={{paddingVertical: 12, paddingTop: 55}}
      />
    </>
  );
};

export default VaccinesHomeScreen;
