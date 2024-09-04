import {deleteData} from '../../global/server';
import {retrieveData} from '../../utils/Storage';

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

export const deleteFamilyMemberHistoryFn = async ({id}: any) => {
  try {
    const token = await retrieveData('token');
    const userId = await retrieveData('userId');
    console.log('data');

    const response = await deleteData(`/familyHistory/${userId}/${id}`, token);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteMedicineData = async ({
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
    const response = await deleteData(`/medicines/${userId}/${id}`, token);
    console.log('response ', response);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteSurgeryData = async ({
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
    const response = await deleteData(`/surgeries/${userId}/${id}`, token);
    console.log('response ', response);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
