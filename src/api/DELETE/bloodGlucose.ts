import {deleteData} from '../../global/server';

export const deleteGlucometerData = async ({
  userId,
  token,
}: {
  userId: string;
  token: string;
}) => {
  try {
    // console.log(token, userId);
    // console.log('user id ' + userId);
    const response = await deleteData(
      `/userpatient/glucometer/${userId}`,
      token,
    );
    console.log('response ', response);

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
