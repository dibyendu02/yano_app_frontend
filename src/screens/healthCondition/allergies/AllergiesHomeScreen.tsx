import React from 'react';
import CommonHomeScreen from '../components/CommonHomeScreen';

const AllergiesHomeScreen = ({navigation}: any) => {
  // make sure that data has mandatory filed name is present
  const data = [
    {
      id: 1,
      name: 'Gluten allergy',
      date: '12-12-2021',
      details: 'Gluten',
      moreDetails: 'Rashes',
      treatedBy: 'Every time I eat bread',
      medicine: 'Loratadine',
      additionalNotes: `There aren't any.`,
    },
    {
      id: 2,
      name: 'Polen allergy',
      date: '12-12-2021',
      details: 'Polen',
      moreDetails: 'Rashes',
      treatedBy: 'Every time I eat bread',
      medicine: 'Loratadine',
      additionalNotes: `There aren't any.`,
    },
  ];

  return (
    <>
      <CommonHomeScreen
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
