import { delay } from "redux-saga";
import { API_POST } from "utils/Api";
import { call, takeLatest, put } from "redux-saga/effects";

import {
  REGISTRATION,
  REGISTRATION_SUCCESS,
  REGISTRATION_FIELD_ERROR,
} from "./constants";

const loadingTime = 1000;

function* registrationFlow({ payload }) {
  const {
    values,
    url
  } = payload

  try {
    const response = yield call(() => API_POST(url, values));
    yield delay(loadingTime);

    if (response && response.status === 201) {
      yield put({ type: REGISTRATION_SUCCESS, payload: response });
      // yield put(push('/login'));
    }

  } catch (error) {
    yield delay(loadingTime);
    if (error.response) {
      if (error.response.status === 400) {
        yield put({ type: REGISTRATION_FIELD_ERROR, payload: error.response.data });
      }
    }
  }
}

function* registrationSaga() {
  yield takeLatest(REGISTRATION, registrationFlow);
}

export default registrationSaga;