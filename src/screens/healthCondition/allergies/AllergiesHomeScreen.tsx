
import React from 'react'
import CommonHomeScreen from '../components/CommonHomeScreen'

const AllergiesHomeScreen = ({ navigation }: any) => {

    // make sure that data has mandatory filed name is present
    const data = [
        {
            id: 1,
            name: 'Alergia al gluten',
            date: '12/12/2021',
            details: 'Details of allergy',
            moreDetails: 'More Details of allergy',
            treatedBy: 'Every time I eat bread',
            medicine: 'Medicine Name',
            additionalNotes: 'Additional Notes',
        },
        {
            id: 2,
            name: 'dloesis al polen',
            date: '12/12/2021',
            details: 'Details of allergy',
            moreDetails: 'More Details of allergy',
            treatedBy: 'Every time I eat bread',
            medicine: 'Medicine Name',
            additionalNotes: 'Additional Notes',
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
    )
}

export default AllergiesHomeScreen