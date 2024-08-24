import React from 'react';
import CommonHomeScreen from '../components/CommonHomeScreen';

const HospitalizationHomeScreen = ({navigation}: any) => {
  const data = [
    {
      id: 1,
      name: 'St. John Medical College',
      reason: 'Chest pain',
      admissionDate: '10-12-2005',
      dischargeDate: '12-12-2005',
      doctorName: 'Dr. House',
    },
  ];

  return (
    <>
      <CommonHomeScreen
        navigation={navigation}
        data={data}
        heading="Hospitalizations"
        addItem_path="AddAndEditHospitalization"
        viewItem_path="HospitalizationDetails"
        emptyHomeTitle="No Hospital added yet"
        emptyHomeMessage="Add hospitals to keep track of them."
      />
    </>
  );
};

export default HospitalizationHomeScreen;
