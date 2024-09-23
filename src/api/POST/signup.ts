import axios from 'axios';
import {storeData} from '../../utils/Storage';
import {BASE_URL} from '../../global/server';

export const signUPPatient = async (data: any) => {
  try {
    console.log(data);
    const response = await axios.post(`${BASE_URL}/userpatient/signup`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
    });

    await storeData('token', response.data.token);
    await storeData('userId', response.data.userData._id);
    await storeData('isAuth', true);
    await storeData('userType', response.data.userData.userType);

    return response;
  } catch (error) {
    console.log(error);
    // Check if the error is an AxiosError
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Server responded with a status other than 200 range
        console.error('Error response:', error.response.data);
        console.error('Status code:', error.response.status);
        return {
          error: error.response.data,
          code: error.response.status,
        };
      } else if (error.request) {
        // Request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request
        console.error('Error setting up request:', error.message);
      }
    } else {
      // If the error is not an AxiosError, log it normally
      console.error('Unexpected error:', error);
    }

    // Throw the error to be handled by the calling function
    throw error;
  }
};

export const registerDoctor = async (data: any) => {
  console.log('FormData being sent:', data);
  try {
    const response = await axios.post(`${BASE_URL}/userdoctor/signup`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
    });

    await storeData('token', response.data.token);
    await storeData('userId', response.data.userData._id);
    await storeData('isAuth', true);
    await storeData('userType', response.data.userData.userType);

    return response;
  } catch (error) {
    console.log('Error details:', error);

    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error('Error response:', error.response.data);
        console.error('Status code:', error.response.status);
        return {
          error: error.response.data,
          code: error.response.status,
        };
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }
    } else {
      console.error('Unexpected error:', error);
    }

    throw error;
  }
};
