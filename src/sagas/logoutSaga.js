import { takeLatest, put, call } from "redux-saga/effects";
import { notification } from "antd";
import { LOGOUT, LOGOUT_SUCCESS } from "constants/Types";

import { removeCookie } from "utils/cookie";
import { API_ENDPOINT_V1 } from "utils/Api";


function* logoutFlow({payload}) {
    try {
        yield call(() => API_ENDPOINT_V1.post('logout'));
        API_ENDPOINT_V1.defaults.headers.common['Authorization'] = undefined;
        removeCookie('TOKEN');
        yield put({ type: LOGOUT_SUCCESS });
        notification.success({ message: 'Success', description: `Logout successfully.` });
    } catch ({ response: error }) {
      API_ENDPOINT_V1.defaults.headers.common['Authorization'] = undefined;
      removeCookie('TOKEN');
      yield put({ type: LOGOUT_SUCCESS });
  
      notification.error({ message: 'Error', description: error.data.message });
    }
  }


function* logoutSaga() {
  yield takeLatest(LOGOUT, logoutFlow);
}

export default logoutSaga;
