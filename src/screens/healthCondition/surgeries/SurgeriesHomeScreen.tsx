
import React from 'react'
import CommonHomeScreen from '../components/CommonHomeScreen';

const SurgeriesHomeScreen = ({ navigation }: any) => {
    const data = [
        {
            "id": 1,
            "name": "Open Heart Surgery",
            "date": "2024-07-27T11:38:00.000Z",
            "doctorName": "Value2",
            "additionalNotes": "Value3",
            "devices": "Value4", 
        }, 
    ]


    return (
        <>
            <CommonHomeScreen
                navigation={navigation}
                data={data}
                heading="Vaccines"
                addItem_path="AddAndEditSurgeries"
                viewItem_path="SurgeriesDetails"
                emptyHomeTitle="No vaccines added yet"
                emptyHomeMessage="Add your vaccine to keep track of them."
            />
        </>
    )
}

export default SurgeriesHomeScreen 