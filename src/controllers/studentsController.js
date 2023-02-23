import {addOwnStudentResult} from '../services/games';
import {createStudent, getAllOwnStudents} from '../services/students';

export const createStudentController = async (
  names,
  surnames,
  code,
  birthDate,
  institution,
  country,
  city,
  sex,
  instructor,
) => {
  try {
    const payload = {
      names,
      surnames,
      code,
      birthDate,
      institution,
      country,
      city,
      sex,
      instructor,
    };

    const response = await createStudent(payload);
    return response.data;
  } catch (error) {
    throw new Error('Ha ocurrido un error creando al estudiante');
  }
};

export const getAllOwnStudentsController = async userEmail => {
  const payload = {
    instructor: userEmail,
  };
  const response = await getAllOwnStudents(payload);
  return response.data;
};

export const addStudentResultsController = async (game, studentCode, data) => {
  try {
    const payload = {
      game,
      id: studentCode,
      data,
    };

    const response = await addOwnStudentResult(payload);
    return response.data;
  } catch (error) {
    throw new Error('Ha ocurrido un error creando al estudiante');
  }
};
