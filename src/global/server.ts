import axios from 'axios';

export const BASE_URL = 'https://yano-backend.onrender.com/api';
// export const BASE_URL = 'https://yano-backend-rrej.onrender.com/api';

export const getData = async (url: string, token: string | null) => {
  let headerObj = {};
  if (token) {
    headerObj = {
      ...headerObj,
      'Content-Type': 'application/json',
      token: `Bearer ${token}`,
    };
  }
  try {
    const response = await axios.get(`${BASE_URL}${url}`, {headers: headerObj});
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const postData = async (
  url: string,
  data: any,
  token: string | null,
  type?: string | null,
) => {
  let headerObj = {};
  if (token) {
    headerObj = {
      ...headerObj,
      token: `Bearer ${token}`,
    };
  }
  if (type === 'media') {
    headerObj = {
      ...headerObj,
      'Content-Type': 'multipart/form-data',
    };
  }
  try {
    const response = await axios.post(`${BASE_URL}${url}`, data, {
      headers: headerObj,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const putData = async (
  url: string,
  data: any,
  token: string | null,
  type: string | null,
) => {
  let headerObj = {};
  if (token) {
    headerObj = {
      ...headerObj,
      token: `Bearer ${token}`,
    };
  }
  if (type === 'media') {
    headerObj = {
      ...headerObj,
      'Content-Type': 'multipart/form-data',
    };
  } else {
    headerObj = {
      ...headerObj,
      'Content-Type': 'application/json',
    };
  }
  try {
    const response = await axios.put(`${BASE_URL}${url}`, data, {
      headers: headerObj,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const deleteData = async (url: string, token: string | null) => {
  let headerObj = {};
  if (token) {
    headerObj = {
      ...headerObj,
      'Content-Type': 'application/json',
      token: `Bearer ${token}`,
    };
  }
  try {
    const response = await axios.delete(`${BASE_URL}${url}`, {
      headers: headerObj,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
