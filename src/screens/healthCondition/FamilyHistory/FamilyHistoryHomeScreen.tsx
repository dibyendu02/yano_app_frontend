import React from 'react';
import CommonHomeScreen from '../components/CommonHomeScreen';

const FamilyHistoryHomeScreen = ({navigation}: any) => {
  const data = [
    {
      id: 1,
      name: 'Mother',
      disease: 'Hypertension',
    },
  ];

  return (
    <>
      <CommonHomeScreen
        navigation={navigation}
        data={data}
        heading="Family history"
        addItem_path="AddAndEditFamilyHistory"
        viewItem_path="FamilyHistoryDetails"
        emptyHomeTitle="No family history added yet"
        emptyHomeMessage="Add your family history  to keep track of them."
      />
    </>
  );
};

export default FamilyHistoryHomeScreen;
