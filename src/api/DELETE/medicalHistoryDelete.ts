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
    console.log('user id ' + userId);
    const response = await deleteData(`/socialHistory/${userId}/${id}`, token);
    console.log('response ', response);

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteFamilyMemberHistoryFn = async ({userId, id}: any) => {
  try {
    const token = await retrieveData('token');
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

export const deleteAllergyData = async ({
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
    const response = await deleteData(`/allergies/${userId}/${id}`, token);
    console.log('response ', response);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteHealthConditionData = async ({
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
    const response = await deleteData(
      `/healthConditions/${userId}/${id}`,
      token,
    );
    console.log('response ', response);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteVaccineData = async ({
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
    const response = await deleteData(`/vaccines/${userId}/${id}`, token);
    console.log('response ', response);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteHospitalizationData = async ({
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
    const response = await deleteData(
      `/hospitalizations/${userId}/${id}`,
      token,
    );
    console.log('response ', response);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
