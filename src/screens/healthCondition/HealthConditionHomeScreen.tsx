import React from 'react';
import CommonHomeScreen from './components/CommonHomeScreen';

const HealthConditionHomeScreen = ({navigation}: any) => {
  // make sure that data has mandatory filed name is present
  const data = [
    {
      id: 1,
      name: 'Hypertension',
      date: '09-06-2012',
      status: 'Active',
      treatedBy: 'Dr. John Doe',
      medicine: 'Medicine Name',
      additionalNotes: 'Additional Notes',
    },
  ];

  return (
    <CommonHomeScreen
      navigation={navigation}
      data={data}
      heading="Health conditions"
      addItem_path="AddHealthCondition"
      viewItem_path="HealthConditionDetails"
      emptyHomeTitle="No health condition added yet"
      emptyHomeMessage="Add your health conditions to keep track of them."
    />
  );
};

export default HealthConditionHomeScreen;
