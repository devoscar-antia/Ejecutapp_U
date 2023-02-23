import axios from 'axios';
import {ENDPOINT, AUTH_HEADER, SECRET_KEY} from '@env';

export const ROUTE = '/students';
export const OWN_STUDENTS = '/own-students';
export const ADD_OWN_STUDENTS = '/addStudentResults';

const options = {
  headers: {
    'Content-Type': 'application/json',
    [AUTH_HEADER]: SECRET_KEY,
  },
};

export const createStudent = payload => {
  return axios.post(`${ENDPOINT}${ROUTE}`, payload, options);
};

export const getAllOwnStudents = payload => {
  return axios.post(`${ENDPOINT}${ROUTE}${OWN_STUDENTS}`, payload, options);
};

export const getAllStudents = () => {
  return axios.get(`${ENDPOINT}${ROUTE}`);
};
