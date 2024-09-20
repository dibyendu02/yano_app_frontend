import {putData} from '../../global/server';

export const updatePatient = async ({data, userId, token, type}: any) => {
  try {
    console.log(userId);
    const response = await putData(`/userpatient/${userId}`, data, token, type);
    return response;
  } catch (error) {
    console.error('Update Patient Error:', error);
    throw error;
  }
};

export const updateDoctor = async ({data, userId, token, type}: any) => {
  try {
    console.log(userId);
    const response = await putData(`/userdoctor/${userId}`, data, token, type);
    return response;
  } catch (error) {
    console.error('Update Patient Error:', error);
    throw error;
  }
};
