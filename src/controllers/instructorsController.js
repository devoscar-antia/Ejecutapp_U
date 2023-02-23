import {loginTeacherWithEmailAndPassword} from '../services/instructors';

export const loginController = async (email, password) => {
  try {
    const payload = {
      email: email.trim(),
      password,
    };
    const response = await loginTeacherWithEmailAndPassword(payload);
    return response.data;
  } catch (error) {
    throw new Error('¡Datos inválidos!');
  }
};
