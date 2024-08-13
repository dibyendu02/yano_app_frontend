import { medicalHistoryImg } from "./medicalHistory";
import MedicalInfo from "../assets/icon/medical_information.svg" 
import ConsultationNotes from "../assets/icon/filled.svg" 
import Sick from "../assets/icon/sick.svg" 
import FamilyHistory from "../assets/icon//family_restroom.svg" 
import Mask from "../assets/icon/masks.svg" 
import Medic from "../assets/icon/medication_liquid.svg" 
import Surgery from "../assets/icon/emergency.svg" 
import Vaccine from "../assets/icon/vaccines.svg" 
import Hospitalization from "../assets/icon/night_shelter.svg" 
import SocialHistory from "../assets/icon/directions_walk.svg"

export const MedicalHistoryItems = [
    {
        title: 'Basic Information',
        img: medicalHistoryImg.basicInfo,
        path: 'BasicInformation',
        image : <MedicalInfo /> 
    },
    {
        title: "Consultation Notes",
        img: medicalHistoryImg.notes,
        path: 'ConsultationNotes',
        image : <ConsultationNotes />
    },
    {
        title: "Health Conditions",
        img: medicalHistoryImg.healthCondition,
        path: 'HealthCondition',
        image : <Sick />
    },
    {
        title: "Family History",
        img: medicalHistoryImg.familyHistory,
        path: 'FamilyHistory',
        image: <FamilyHistory />
    },
    {
        title: "Allergies",
        img: medicalHistoryImg.allergy,
        path: 'Allergies',
        image: <Mask />
    },
    {
        title: "Medicines",
        img: medicalHistoryImg.medicines,
        path: 'Medicine',
        image: <Medic />
    },
    {
        title: "Surgeries",
        img: medicalHistoryImg.surgeries,
        path: 'Surgeries',
        image: <Surgery />
    },
    {
        title: "Vaccines",
        img: medicalHistoryImg.vaccine,
        path: 'Vaccines',
        image: <Vaccine/>
    },
    {
        title: "Hospitalization",
        img: medicalHistoryImg.hospitalization,
        path: 'Hospitalization',
        image: <Hospitalization/>
    },
    {
        title: "Social History",
        img: medicalHistoryImg.socialHistory,
        path: "SocialHistory",
        image: <SocialHistory/>
    }
]