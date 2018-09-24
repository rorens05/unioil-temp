import { delay } from 'redux-saga';
import {
  call,
  takeLatest,
  put
} from 'redux-saga/effects'; 
import { fetchData } from 'utils/Api';
import { FETCH_DATA, FETCH_DATA_SUCCESS , FETCH_DATA_ERROR, /* FETCH_DATA_RESET */ } from 'constants/Types';

const loadingTime = 1000;

function* fetchSagaFlow({ payload }) {
  const { url } = payload;

  try {
    const response = yield call(() => fetchData(url));
    yield delay(loadingTime);

    if (response.status === 200) {
      yield put({ type: FETCH_DATA_SUCCESS, payload: response });
    }
  } catch(error) {
    yield delay(loadingTime);
    if (error.response) {
      if (error.response.status === 404) {
        yield put({ type: FETCH_DATA_ERROR, payload: error });
      }
    }
  }
}

function* fetchDataSaga() {
  yield takeLatest(FETCH_DATA, fetchSagaFlow);
}

export default fetchDataSaga;