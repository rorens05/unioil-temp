import { delay } from "redux-saga";

import {
  call,
  takeLatest,
  put
} from "redux-saga/effects";

import {
  USERS_VIEW,
  USERS_VIEW_SUCCESS,
  USERS_VIEW_ERROR
} from "./constants";

import { fetchData } from "utils/Api";
const loadingTime = 1000;

function* viewSagaFlow({ payload }) {
  const {
    url
  } = payload;

  try {
    const response = yield call(() => fetchData(url));
    yield delay(loadingTime);

    if (response && response.status === 200) {
      yield put({ type: USERS_VIEW_SUCCESS, payload: response });
    }
  } catch (error) {
    yield delay(loadingTime);
    console.log(error.response)
    if (error.response) {
      if (error.response.status === 404) {
        yield put({ type: USERS_VIEW_ERROR, payload: error.response.data });
      }
    }
  }
}

function* usersViewSaga() {
  yield takeLatest(USERS_VIEW, viewSagaFlow);
}

export default usersViewSaga;