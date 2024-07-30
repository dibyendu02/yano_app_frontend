
import React from 'react'
import CommonHomeScreen from '../components/CommonHomeScreen';

const HospitalizationHomeScreen = ({ navigation }: any) => {
    const data = [
        {
            "id": 1,
            "name": "St. John Medical College",
            "reason": "Open Heart Surgery",
            "admissionDate": "2024-07-27T11:38:00.000Z",
            "dischargeDate": "2024-07-27T11:38:00.000Z",
            "doctorName": "Value2", 
        },
    ]


    return (
        <>
            <CommonHomeScreen
                navigation={navigation}
                data={data}
                heading="Hospitalization"
                addItem_path="AddAndEditHospitalization"
                viewItem_path="HospitalizationDetails"
                emptyHomeTitle="No Hospital added yet"
                emptyHomeMessage="Add hospitals to keep track of them."
            />
        </>
    )
}

export default HospitalizationHomeScreen 