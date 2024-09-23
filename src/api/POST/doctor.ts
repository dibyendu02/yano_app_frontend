import axios from 'axios';
import {BASE_URL} from '../../global/server';

export const findPatient = async ({data, token}: any) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/userdoctor/find-patient-by-email`,
      data,
      {
        headers: {token: `Bearer ${token}`},
      },
    );
    return response.data?.userData;
  } catch (error: any) {
    console.error(
      'Error in findPatient:',
      error.response?.data || error.message,
    );
    throw error;
  }
};

export const addPatient = async ({data, token, userId}: any) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/userdoctor/add-patient-in-list/${userId}`,
      data,
      {
        headers: {token: `Bearer ${token}`},
      },
    );
    return response.data;
  } catch (error: any) {
    console.error(
      'Error in addPatient:',
      error.response?.data || error.message,
    );

    if (error.response?.data == 'Patient already added') {
      return {
        status: 405,
      };
    }
    throw error;
  }
};
