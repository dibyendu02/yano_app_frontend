import {getData} from '../../global/server';

export const getFamilyLinkData = async ({
  userId,
  token,
}: {
  userId: string;
  token: string;
}) => {
  try {
    console.log(token, userId);
    const response = await getData(
      `/userpatient/${userId}/getfamilylink`,
      token,
    );
    console.log('response ', response);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
