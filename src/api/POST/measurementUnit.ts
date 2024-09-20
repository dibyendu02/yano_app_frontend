import {postData} from '../../global/server';

export const postMeasurementUnit = async ({data, token}: any) => {
  try {
    const response = await postData(`/measurementunits/`, data, token);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
