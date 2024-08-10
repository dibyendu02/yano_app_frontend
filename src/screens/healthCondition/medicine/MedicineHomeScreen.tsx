
import React from 'react'
import CommonHomeScreen from '../components/CommonHomeScreen';

const MedicineHomeScreen = ({ navigation }: any) => {
    const data = [
        {
            "id": 1,
            "name": "Losartan Potassium",
            "volume": "100",
            "unit": "mg",
            "medicine": "Pill",
            "field4": "Orally",
            "field5": "1",
            "field6": "At breakfast",
            "field7": "Heterosexual",
            "field8": "12-12-1998",
            "field9": "2024-07-27T11:38:00.000Z",
            "field10": "2024-07-28T11:38:00.000Z",
            "field11": true,
            "field12": "Hypertension",
            "field13": "Dr. Lee",
            "field14": "Headache",
        },
        {
            "id": 2,
            "name": "Aspirin",
            "volume": "500",
            "unit": "mg",
            "medicine": "Pill",
            "field4": "Orally",
            "field5": "1",
            "field6": "After lunch",
            "field7": "Avoid alcohol",
            "field8": "15-08-2023",
            "field9": "2024-07-27T11:38:00.000Z",
            "field10": "2024-07-28T11:38:00.000Z",
            "field11": true,
            "field12": "Pain relief",
            "field13": "Dr. Smith",
            "field14": "Stomach upset"
        },
        {
            "id": 3,
            "name": "Metformin",
            "volume": "850",
            "unit": "mg",
            "medicine": "Pill",
            "field4": "Orally",
            "field5": "1",
            "field6": "With dinner",
            "field7": "Take with food",
            "field8": "01-07-2022",
            "field9": "2024-07-27T11:38:00.000Z",
            "field10": "2024-07-28T11:38:00.000Z",
            "field11": true,
            "field12": "Diabetes",
            "field13": "Dr. Lee",
            "field14": "Nausea"
        }


    ]


    return (
        <>
            <CommonHomeScreen
                navigation={navigation}
                data={data}
                heading="Medicines"
                addItem_path="AddAndEditMedicine"
                viewItem_path="MedicineDetails"
                emptyHomeTitle="No medicine added yet"
                emptyHomeMessage="Add your medicine to keep track of them."
            />
        </>
    )
}

export default MedicineHomeScreen 