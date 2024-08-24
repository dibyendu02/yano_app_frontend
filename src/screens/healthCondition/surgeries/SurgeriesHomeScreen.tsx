import React from 'react';
import CommonHomeScreen from '../components/CommonHomeScreen';

const SurgeriesHomeScreen = ({navigation}: any) => {
  const data = [
    {
      id: 1,
      name: 'Open heart surgery',
      date: '12-02-2012',
      doctorName: 'Dr. House',
      additionalNotes: 'Additional note',
      devices: 'Cardiac pacemaker',
    },
  ];

  return (
    <>
      <CommonHomeScreen
        navigation={navigation}
        data={data}
        heading="Surgeries"
        addItem_path="AddAndEditSurgeries"
        viewItem_path="SurgeriesDetails"
        emptyHomeTitle="No vaccines added yet"
        emptyHomeMessage="Add your vaccine to keep track of them."
      />
    </>
  );
};

export default SurgeriesHomeScreen;
