import axios, {AxiosError} from 'axios';
import {postData} from '../../global/server';
import {retrieveData} from '../../utils/Storage';

interface HealthConditionData {
  name: string;
  date: string;
  status: string;
  treatedBy: string;
  medicine: string;
  additionalNotes: string;
}

export const healthConditionsData = async ({
  data,
}: {
  data: HealthConditionData;
}) => {
  try {
    const token = await retrieveData('token');
    const userId = await retrieveData('userId');
    console.log('data', data);
    console.log('token', token);
    console.log('userId', userId);

    // Transform the data according to the expected structure
    const transformedData = {
      nameOfTheHealthCondition: data.name || '',
      dateOfDiagnosis: data.date || '',
      status: data.status || '',
      TreatedBy: data.treatedBy || '',
      medicine: data.medicine || '',
      additionalNotes: data.additionalNotes || '',
    };

    const response = await postData(
      `/healthConditions/`,
      transformedData,
      token,
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', {
        message: error.message,
        code: error.code,
        config: error.config,
        response: error.response
          ? {
              status: error.response.status,
              data: error.response.data,
              headers: error.response.headers,
            }
          : 'No response',
        request: error.request ? error.request : 'No request',
      });
    } else {
      console.error('General error:', {
        message: (error as Error).message,
        stack: (error as Error).stack,
      });
    }
    throw error;
  }
};

export const familyHistoryData = async ({data}: any) => {
  try {
    const token = await retrieveData('token');
    const userId = await retrieveData('userId');
    const response = await postData(`/familyHistory/`, data, token);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const postMedicineData = async ({data, token}: any) => {
  try {
    const response = await postData(`/medicines/`, data, token);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postSurgeryData = async ({data, token}: any) => {
  try {
    const response = await postData(`/surgeries/`, data, token);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const AddAllergyData = async ({data}: any) => {
  console.log('data', data);
  try {
    const token = await retrieveData('token');
    const userId = await retrieveData('userId');

    // Transform the incoming data to match the expected format
    const transformedData = {
      userId: userId,
      nameOfTheAllergy: data.name || '',
      details: data.details || '',
      moreDetails: data.moreDetails || '',
      treatedBy: data.treatedBy || '',
      dateOfFirstDiagnosis: new Date(data.date).toISOString(), // Convert to ISO format
      medicine: data.medicine || '',
      notes: data.additionalNotes || '',
    };

    const response = await postData(`/allergies/`, transformedData, token);
    return response;
  } catch (error) {
    console.error('Error in AddAllergyData:', error);
    throw error;
  }
};

export const addFamilyMember = async ({data}: any) => {
  try {
    const token = await retrieveData('token');
    const userId = await retrieveData('userId');
    console.log('data', data);
    const transformedData = {
      userId: userId,
      relationship: data.relationship,
      healthCondition: data.healthCondition,
    };

    console.log('transformedData', transformedData);
    const response = await postData(`/familyHistory/`, transformedData, token);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
