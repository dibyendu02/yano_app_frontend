import {postData} from '../../global/server';

export const createPatientAccount = async ({data, id, token}: any) => {
  try {
    console.log(id);
    console.log(data);
    // const response = data;
    const response = await postData(
      `/userdoctor/create-patient/${id}`,
      data,
      token,
      'media',
    );

    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const findPatientByEmail = async ({data, token}: any) => {
  try {
    console.log(data);
    // const response = data;
    const response = await postData(
      `/userPatient/find-patient-by-email`,
      data,
      token,
    );

    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
