import {deleteData} from '../../global/server';

export const deleteFamilyMemberData = async ({
  userId,
  token,
  familylinkId,
}: {
  userId: string;
  token: string;
  familylinkId: string;
}) => {
  try {
    const response = await deleteData(
      `/userpatient/${userId}/family-link/${familylinkId}`,
      token,
    );
    console.log('response ', response);

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
