import axios from 'axios';
import {retrieveData} from '../../utils/Storage';

const BASE_URL = 'https://yano-backend-rrej.onrender.com/api';

export const allergiesData = async () => {
  try {
    const token = await retrieveData('token');
    console.log(token);
    const userId = await retrieveData('userId');
    console.log(userId);
    // const response = await axios.get(`${BASE_URL}/allergies/${userId}/`, {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // });

    // console.log(response);
    // return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
