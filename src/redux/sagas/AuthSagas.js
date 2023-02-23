import {call, put} from 'redux-saga/effects';
import {loginController} from '../../controllers/instructorsController';
import * as Auth from '../actions/Auth';

/*  Authentication Saga */
export function* checkUser(action) {
  try {
    const instructor = yield call(
      loginController,
      action.userEmail,
      action.password,
    );
    if (instructor.success) {
      yield put(Auth.Actions.loginUser(instructor.user));
    } else {
      yield put(Auth.Actions.loginFailure(instructor.message));
    }
  } catch (error) {
    yield put(Auth.Actions.loginFailure(error.message));
  }
}
