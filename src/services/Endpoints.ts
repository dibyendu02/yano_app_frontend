import axios from './Axios';

export const loginUser = (data: {email: string; password: string}) => {
  return axios.post('api/login', data);
};
