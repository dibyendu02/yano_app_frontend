import axios from './Axios';

export const loginUser = (data: {email: string; password: string}) => {
  return axios.post('api/login', data);
};

export const registerDoctor = (data: any) => {
  return axios.post('api/userdoctor/signup', data);
};

export const registerPatient = (data: any) => {
  return axios.post('api/userpatient/signup', data);
};
