import React, {useEffect, useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import CommonHomeScreen from '../components/CommonHomeScreen';
import {medicinesData} from '../../../api/GET/medicalHistoryData';
import {retrieveData} from '../../../utils/Storage';

const MedicineHomeScreen = ({navigation}: any) => {
  const [data, setData] = useState([]);
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [userType, setUserType] = useState('');

  // Function to fetch user data (token, userId, userType)
  const getUserData = async () => {
    const retrievedToken = await retrieveData('token');
    const retrievedUserId = await retrieveData('userId');
    const retrievedUserType = await retrieveData('userType');

    setToken(retrievedToken);
    setUserId(retrievedUserId);
    setUserType(retrievedUserType);
  };

  const fetchData = async () => {
    try {
      if (userType === 'patient' && token && userId) {
        const res = await medicinesData({userId, token});

        if (res.length === 0) {
          setData([]);
          return;
        }

        const transformedData = res?.medicines?.map((item, index) => ({
          id: item._id,
          name: item.medicineName,
          volume: item.formOfMedication?.medicineStrength,
          unit: item.formOfMedication?.medicineStrengthUnit,
          formOfMedicine: item.formOfMedication?.formOfMedicine,
          ingestionMethod: item.formOfMedication?.ingestionMethod,
          amount: item.doses?.amount,
          frequency: item.doses?.frequency,
          when: item.doses?.when,
          otherInstructions: item.doses?.otherInstructions,
          whenItBegins: item.duration.whenItBegins,
          whenItEnds: item.duration.whenItEnds,
          longDuration: item.duration.longDuration,
          medicineTakenFor: item.additionalInformation.medicineTakenFor,
          prescribedBy: item.additionalInformation.prescribedBy,
          sideEffects: item.additionalInformation.sideEffects,
        }));

        setData(transformedData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Initial effect to retrieve user data
  useEffect(() => {
    getUserData();
  }, []);

  // Fetch data every time the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [userType, token, userId]),
  );

  return (
    <>
      <CommonHomeScreen
        navigation={navigation}
        data={data}
        heading="Medicines"
        addItem_path="AddAndEditMedicine"
        viewItem_path="MedicineDetails"
        emptyHomeTitle="No medicine added yet"
        emptyHomeMessage="Add your medicine to keep track of them."
      />
    </>
  );
};

export default MedicineHomeScreen;
