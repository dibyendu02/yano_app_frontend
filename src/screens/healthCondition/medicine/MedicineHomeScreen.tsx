 
import React from 'react'
import CommonHomeScreen from '../components/CommonHomeScreen';

const MedicineHomeScreen = ({ navigation }: any) => {
    const data = [
        {
            "id": 1,
            "name": "Medicine A",
            "volume": "10",
            "unit": "ml",
            "medicine": "Tablet",
            "field4": "Value4",
            "field5": "Value5",
            "field6": "Value6",
            "field7": "Value7",
            "field8": "Value8",
            "field9": "2024-07-27T11:38:00.000Z",
            "field10": "2024-07-28T11:38:00.000Z",
            "field11": true,
            "field12": "Value12",
            "field13": "Value13",
            "field14": "Value14"
        },
        {
            "id": 2,
            "name": "Medicine B",
            "volume": "20ml",
            "unit": "ml",
            "medicine": "Tablet",
            "field4": "Value4",
            "field5": "Value5",
            "field6": "Value6",
            "field7": "Value7",
            "field8": "Value8",
            "field9": "2024-07-27T11:38:00.000Z",
            "field10": "2024-07-27T11:38:00.000Z",
            "field11": false,
            "field12": "Value12",
            "field13": "Value13",
            "field14": "Value14"
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