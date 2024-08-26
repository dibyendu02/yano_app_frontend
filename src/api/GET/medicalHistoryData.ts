import axios from 'axios';
import {retrieveData} from '../../utils/Storage';
import {getData} from '../../global/server';

const BASE_URL = 'https://yano-backend-rrej.onrender.com/api';

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

export const medicinesData = async () => {
  try {
    const token = await retrieveData('token');
    const userId = await retrieveData('userId');
    const response = await getData(`/medicines/${userId}`, token);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const surgeriesData = async () => {
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
