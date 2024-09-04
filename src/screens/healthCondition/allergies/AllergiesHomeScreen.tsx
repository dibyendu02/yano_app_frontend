import React, { useEffect } from 'react';
import CommonHomeScreen from '../components/CommonHomeScreen';
import { allergiesData } from '../../../api/GET/medicalHistoryData';

const dummyData = [
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

const AllergiesHomeScreen = ({ navigation }: any) => {
  const [data, setData] = React.useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await allergiesData();
        console.log(res);

        if (res.length === 0) {
          setData([]);
          return;
        }

        const transformedData = res?.allergies.map((item: any, index: any) => ({
          id: index + 1,
          name: item.nameOfTheAllergy,
          date: new Date(item.dateOfFirstDiagnosis).toLocaleDateString('en-US'),
          details: item.details,
          moreDetails: item.moreDetails,
          treatedBy: item.treatedBy,
          medicine: item.medicine,
          additionalNotes: item.notes || `T`,
        }));

        setData(transformedData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);


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
        customStyle={{paddingTop: 55}}
      />
    </>
  );
};

export default AllergiesHomeScreen;
