import axios from 'axios';
import {ENDPOINT, AUTH_HEADER, SECRET_KEY} from '@env';

export const ROUTE = '/admin';
export const AUTH = '/authentication';

const options = {
  headers: {
    'Content-Type': 'application/json',
    [AUTH_HEADER]: SECRET_KEY,
  },
};

export const loginTeacherWithEmailAndPassword = payload => {
  return axios.post(`${ENDPOINT}${ROUTE}${AUTH}`, payload, options);
};
