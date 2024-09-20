import {getData} from '../../global/server';

export const getMeasurementUnit = async ({
  userId,
  token,
}: {
  userId: string;
  token: string;
}) => {
  try {
    console.log(token, userId);
    const response = await getData(`/measurementunits/${userId}`, token);
    console.log('response ', response);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
