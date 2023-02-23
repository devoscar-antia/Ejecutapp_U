import {all, call, put} from 'redux-saga/effects';
import {
  getAllOwnStudentsController,
  createStudentController,
  addStudentResultsController,
} from '../../controllers/studentsController';
import * as Students from '../actions/Students';
import * as Games from '../actions/Games';
import {getStudentResultsController} from '../../controllers/gamesController';

export function* fetchAllOwnStudents(action) {
  try {
    const students = yield call(getAllOwnStudentsController, action.userEmail);
    if (students.hasOwnProperty('message')) {
      yield put(Students.Actions.requestFailure(students.message));
    } else {
      yield put(Students.Actions.setAllOwnStudents(students));
    }
  } catch (error) {
    yield put(
      Students.Actions.requestFailure(
        'No se pudieron descargar los estudiantes.',
      ),
    );
  }
}

export function* addOwnStudentResult(action) {
  try {
    const createdStudent = yield call(
      addStudentResultsController,
      action.game,
      action.studentCode,
      action.data,
    );
    if (createdStudent.hasOwnProperty('message')) {
      yield put(Students.Actions.requestFailure(createdStudent.message));
    }
  } catch (error) {
    yield put(
      Students.Actions.requestFailure('No se pudo crear el estudiante.'),
    );
  }
}

export function* createStudent(action) {
  try {
    const createdStudent = yield call(
      createStudentController,
      action.names,
      action.surnames,
      action.code,
      action.birthDate,
      action.institution,
      action.country,
      action.city,
      action.sex,
      action.instructor,
    );
    if (createdStudent.hasOwnProperty('message')) {
      yield put(Students.Actions.requestFailure(createdStudent.message));
    } else {
      yield put(Students.Actions.addCreatedStudent(createdStudent));
    }
  } catch (error) {
    yield put(
      Students.Actions.requestFailure('No se pudo crear el estudiante.'),
    );
  }
}

export function* getStudentResults(action) {
  const {id, game, gameId} = action;
  try {
    const response = yield call(getStudentResultsController, id, game);
    yield all([
      put(Games.Actions.setGameIsCompleted(gameId, !!response.length)),
    ]);
  } catch (error) {
    yield put(Games.Actions.setGameIsCompleted(gameId, false));
  }
}
