import {postData} from '../../global/server';

export const postFamilyLinkData = async ({data, token}: any) => {
  try {
    const response = await postData(
      `/userpatient/addfamilylink`,
      data,
      token,
      'media',
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const linkFamilyMember = async ({data, userId, token}: any) => {
  try {
    console.log(data);
    const response = await postData(
      `/userpatient/${userId}/family-link`,
      data,
      token,
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
