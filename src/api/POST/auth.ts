import {postData} from '../../global/server';

export const changePassword = async ({data, token}: any) => {
  try {
    const response = await postData(`/changepassword/`, data, token);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
