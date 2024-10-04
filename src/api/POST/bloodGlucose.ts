import {postData} from '../../global/server';

export const addBloodGlucoseData = async ({data, token}: any) => {
  try {
    console.log(data);
    // const response = data;
    const response = await postData(`/blood-glucose`, data, token);

    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addGlucometerData = async ({userId, data, token}: any) => {
  try {
    const response = await postData(`/glucometer/${userId}`, data, token);

    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
