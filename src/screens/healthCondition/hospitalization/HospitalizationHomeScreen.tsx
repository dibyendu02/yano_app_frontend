import React, {useCallback, useEffect, useState} from 'react';
import CommonHomeScreen from '../components/CommonHomeScreen';
import {retrieveData} from '../../../utils/Storage';
import {getHospitalizationData} from '../../../api/GET/medicalHistoryData';
import {useFocusEffect, useRoute} from '@react-navigation/native';

const HospitalizationHomeScreen = ({navigation}: any) => {
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
      if (requiredUserId)
        res = await getHospitalizationData({userId: requiredUserId});
      else res = await getHospitalizationData({userId});
      // const res = await getHospitalizationData({userId});
      console.log(res);

      if (res?.hospitalizations.length === 0) {
        setData([]);
        return;
      }

      const transformedData = res?.hospitalizations?.map((item, index) => ({
        requiredUserId: requiredUserId,
        id: item._id,
        name: item.hospitalName,
        reason: item.reasonOfHospitalization,
        admissionDate: item.admissionDate,
        dischargeDate: item?.dischargeDate,
        doctorName: item?.nameOfAttendingPhysician,
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
        heading="Hospitalizations"
        addItem_path="AddAndEditHospitalization"
        viewItem_path="HospitalizationDetails"
        emptyHomeTitle="No Hospital added yet"
        emptyHomeMessage="Add hospitals to keep track of them."
        customStyle={{paddingTop: 55}}
      />
    </>
  );
};

export default HospitalizationHomeScreen;
