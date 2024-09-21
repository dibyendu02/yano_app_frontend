import {postData} from '../../global/server';

export const deletePatientAccount = async ({userId, data, token}: any) => {
  try {
    // console.log(data);
    const response = await postData(
      `/userpatient/delete-account/${userId}`,
      data,
      token,
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
