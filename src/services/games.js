import axios from 'axios';
import {ENDPOINT, AUTH_HEADER, SECRET_KEY} from '@env';

export const ROUTE = '/results';

const options = {
  headers: {
    'Content-Type': 'application/json',
    [AUTH_HEADER]: SECRET_KEY,
  },
};

export const getGameStudentResults = payload => {
  console.log(ENDPOINT)
  return axios.post(`${ENDPOINT}${ROUTE}/${payload.id}`, payload, options);
};

export const addOwnStudentResult = payload => {
  return axios.post(`${ENDPOINT}${ROUTE}`, payload, options);
};
