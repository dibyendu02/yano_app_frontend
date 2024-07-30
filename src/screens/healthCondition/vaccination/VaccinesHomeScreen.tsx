
import React from 'react'
import CommonHomeScreen from '../components/CommonHomeScreen';

const VaccinesHomeScreen = ({ navigation }: any) => {
    const data = [
        {
            "id": 1,
            "name": "Vaccine A",  
            "field1": "2024-07-27T11:38:00.000Z",
            "field2": "Value2",
            "field3": "Value3",
            "field4": "Value4",
            "field5": "Value5", 
        },
        {
            "id": 2,
            "name": "Vaccine A",
            "field1": "2024-07-29T11:38:00.000Z",
            "field2": "Value2",
            "field3": "Value3",
            "field4": "Value4",
            "field5": "Value5", 
        }
    ]


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
            />
        </>
    )
}

export default VaccinesHomeScreen 