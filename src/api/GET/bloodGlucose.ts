import {getData} from '../../global/server';

export const getBloodGlucoseDatabyUserId = async ({
  userId,
  token,
}: {
  userId: string;
  token: string;
}) => {
  try {
    // console.log(token, userId);
    const response = await getData(`/blood-glucose/${userId}`, token);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
