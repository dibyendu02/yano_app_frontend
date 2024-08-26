import {postData} from '../../global/server';
import {retrieveData} from '../../utils/Storage';

export const healthConditionsData = async ({data}: any) => {
  try {
    const token = await retrieveData('token');
    const userId = await retrieveData('userId');
    const response = await postData(`/healthConditions/`, data, token);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const familyHistoryData = async ({data}: any) => {
  try {
    const token = await retrieveData('token');
    const userId = await retrieveData('userId');
    const response = await postData(`/familyHistory/`, data, token);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
