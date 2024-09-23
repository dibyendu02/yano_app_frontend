import {getData} from '../../global/server';
import {retrieveData} from '../../utils/Storage';

export const getPatientsUnderDoctorData = async ({userId}: any) => {
  try {
    console.log(userId);
    const token = await retrieveData('token');
    const response = await getData(
      `/userdoctor/patientsUnderDoctor/${userId}`,
      token,
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
