import axios from 'axios';
import {retrieveData} from '../../utils/Storage';
import {getData} from '../../global/server';

export const allergiesData = async () => {
  try {
    const token = await retrieveData('token');
    const userId = await retrieveData('userId');
    const response = await getData(`/allergies/${userId}`, token);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const familyHistoryData = async () => {
  try {
    const token = await retrieveData('token');
    console.log(token);
    const userId = await retrieveData('userId');
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

export const getSurgeriesData = async () => {
  try {
    const token = await retrieveData('token');
    const userId = await retrieveData('userId');
    const response = await getData(`/surgeries/${userId}`, token);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const healthConditionsData = async () => {
  try {
    const token = await retrieveData('token');
    const userId = await retrieveData('userId');
    const response = await getData(`/healthConditions/${userId}`, token);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const basicInfoData = async () => {
  try {
    const token = await retrieveData('token');
    const userId = await retrieveData('userId');
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
