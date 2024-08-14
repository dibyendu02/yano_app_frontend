export const BASE_URL = 'https://yano-backend.onrender.com';
import axios from 'axios';

export const signUPPatient = async (data: any) => {
  try {
    console.log(data);
    const response = await axios.post(
      `${BASE_URL}/api/userpatient/signup`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      },
    );

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
    const response = await axios.post(
      `${BASE_URL}/api/userdoctor/signup`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      },
    );

    return response.data;
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
