import {getGameStudentResults} from '../services/games';

export const getStudentResultsController = async (id, game) => {
  try {
    const payload = {
      id,
      game,
    };
    const response = await getGameStudentResults(payload);
    return response.data;
  } catch (error) {
    throw new Error('¡Datos inválidos!');
  }
};
