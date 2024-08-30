import {deleteData} from '../../global/server';

export const deleteSocialHistoryData = async ({
  userId,
  token,
  id,
}: {
  userId: string;
  token: string;
  id: string;
}) => {
  try {
    console.log(token, userId);
    const response = await deleteData(`/socialHistory/${userId}/${id}`, token);
    console.log('response ', response);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
