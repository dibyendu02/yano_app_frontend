import axios from 'axios';
import {putData} from '../../global/server';
import {retrieveData} from '../../utils/Storage';

export const basicInformationUpdate = async ({data}: any) => {
  console.log('data', data);
  try {
    const token = await retrieveData('token');
    const userId = await retrieveData('userId');

    // Remove units from height and weight, keeping only numeric values
    const parseNumericValue = (value: string) =>
      parseFloat(value.replace(/[^\d.-]/g, ''));

    const userData = {
      height: parseNumericValue(data?.height) || '',
      weight: parseNumericValue(data?.weight) || '',
      bloodType: data?.bloodGroup || '',
    };
    console.log('userData', userData);

    const response = await putData(`/userpatient/${userId}`, userData);

    console.log('response', response.data);
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
      console.error('General error:', error);
    }
    throw error;
  }
};

export const editFamilyMember = async ({userId, data, id}: any) => {
  try {
    const token = await retrieveData('token');
    console.log('data', data);

    const response = await putData(
      `/familyHistory/${userId}/${id}`,
      data,
      token,
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editMedicineData = async ({data, id, userId, token}: any) => {
  try {
    console.log('data', data);

    const response = await putData(`/medicines/${userId}/${id}`, data, token);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editAllergyData = async ({data, id, userId, token}: any) => {
  try {
    console.log('data', data);

    const response = await putData(`/allergies/${userId}/${id}`, data, token);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const editSurgeryData = async ({data, id, userId, token}: any) => {
  console.log(id);
  try {
    const response = await putData(`/surgeries/${userId}/${id}`, data, token);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editVaccineData = async ({data, id, userId, token}: any) => {
  console.log(id);
  try {
    const response = await putData(`/vaccines/${userId}/${id}`, data, token);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editHospitalizationData = async ({
  data,
  id,
  userId,
  token,
}: any) => {
  console.log(id);
  try {
    const response = await putData(
      `/hospitalizations/${userId}/${id}`,
      data,
      token,
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editSocialHistoryData = async ({data, id, userId, token}: any) => {
  console.log(id);
  try {
    const response = await putData(
      `/socialHistory/${userId}/${id}`,
      data,
      token,
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editHealthConditionData = async ({
  data,
  id,
  userId,
  token,
}: any) => {
  console.log(id);
  console.log(token);
  try {
    const response = await putData(
      `/healthConditions/${userId}/${id}`,
      data,
      token,
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
