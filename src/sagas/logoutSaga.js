import { takeLatest, put, call } from "redux-saga/effects";
import { notification } from "antd";
import { LOGOUT, LOGOUT_SUCCESS } from "constants/Types";

import { removeCookie } from "utils/cookie";
import { API_UNI_OIL } from "utils/Api";


function* logoutFlow({payload}) {
    try {
        yield call(() => API_UNI_OIL.post('logout'));
        API_UNI_OIL.defaults.headers.common['Authorization'] = undefined;
        removeCookie('TOKEN');
        yield put({ type: "LOGOUT_SUCCESS" });
        notification.success({ message: 'Success', description: `Logout successfully.` });
    } catch ({ response: error }) {
      API_UNI_OIL.defaults.headers.common['Authorization'] = undefined;
      removeCookie('TOKEN');
      yield put({ type: "LOGOUT_SUCCESS" });
  
      notification.error({ message: 'Error', description: error.data.message });
    }
  }


function* logoutSaga() {
  yield takeLatest(LOGOUT, logoutFlow);
}

export default logoutSaga;
