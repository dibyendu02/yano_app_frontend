import {putData} from '../../global/server';

export const putMeasurementUnit = async ({data, userId, token}: any) => {
  try {
    console.log('data', data);

    const response = await putData(`/measurementunits/${userId}`, data, token);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
