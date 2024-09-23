import {getData} from '../../global/server';

export const getPatientById = async ({
  userId,
  token,
}: {
  userId: string;
  token: string;
}) => {
  try {
    console.log(token, userId);
    const response = await getData(`/userpatient/${userId}`, token);
    console.log('response ', response);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getDoctorById = async ({
  userId,
  token,
}: {
  userId: string;
  token: string;
}) => {
  try {
    console.log(token, userId);
    const response = await getData(`/userdoctor/${userId}`, token);
    console.log('response ', response);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
