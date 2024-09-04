import React from 'react';
import CommonHomeScreen from '../components/CommonHomeScreen';

const VaccinesHomeScreen = ({navigation}: any) => {
  const data = [
    {
      id: 1,
      name: 'COVID 19',
      field1: '04-05-2022',
      field2: 'Verocell',
      field3: 'First dose',
      field4: '#12345',
      field5: 'I had a little fever the first day.',
    },
    {
      id: 2,
      name: 'Influenza',
      field1: '04-05-2022',
      field2: 'Verocell',
      field3: 'First dose',
      field4: '#12345',
      field5: 'I had a little fever the first day.',
    },
  ];

  return (
    <>
      <CommonHomeScreen
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
