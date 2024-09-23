import axios from 'axios';
import {retrieveData} from '../../utils/Storage';
import {getData} from '../../global/server';

export const initializeMedicalHistory = async ({
  userId,
  token,
}: {
  userId: string;
  token: string;
}) => {
  try {
    const response = await getData(`/medicalHistory/${userId}`, token);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const allergiesData = async ({userId}: any) => {
  try {
    const token = await retrieveData('token');
    const response = await getData(`/allergies/${userId}`, token);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const familyHistoryData = async ({userId}: any) => {
  try {
    const token = await retrieveData('token');

    const response = await getData(`/familyHistory/${userId}`, token);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const medicinesData = async ({
  userId,
  token,
}: {
  userId: string;
  token: string;
}) => {
  try {
    const response = await getData(`/medicines/${userId}`, token);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getSurgeriesData = async ({userId}: any) => {
  try {
    const token = await retrieveData('token');
    const response = await getData(`/surgeries/${userId}`, token);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getVaccinesData = async ({userId}: any) => {
  try {
    const token = await retrieveData('token');
    // const userId = await retrieveData('userId');
    const response = await getData(`/vaccines/${userId}`, token);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getHospitalizationData = async ({userId}: any) => {
  try {
    const token = await retrieveData('token');
    const response = await getData(`/hospitalizations/${userId}`, token);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const healthConditionsData = async ({userId, token}: any) => {
  try {
    const response = await getData(`/healthConditions/${userId}`, token);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const basicInfoData = async ({userId}: any) => {
  try {
    const token = await retrieveData('token');
    // const userId = await retrieveData('userId');
    console.log('userId on api ', userId);
    const response = await getData(`/userpatient/${userId}`, token);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const socialHistoryData = async ({
  userId,
  token,
}: {
  userId: string;
  token: string;
}) => {
  try {
    console.log(token, userId);
    const response = await getData(`/socialHistory/${userId}`, token);
    console.log('response ', response);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
