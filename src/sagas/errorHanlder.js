import { takeLatest, put } from "redux-saga/effects";
import { LOGOUT_SUCCESS } from "constants/Types";
import { API_ENDPOINT_V1 } from "utils/Api";
import { removeCookie } from "utils/cookie";
import { notification } from "antd";

function* handleErrors({payload}){
  let { status, data } = payload;
  if(status === 401){
    API_ENDPOINT_V1.defaults.headers.common['Authorization'] = undefined;
    removeCookie('TOKEN');
    yield put({ type: LOGOUT_SUCCESS }); 
  }
  notification.error({ message: 'Error', description: data.message });
}

function* errorHandler() {
  yield takeLatest("UNCAUGHT_ERROR", handleErrors);
}

export default errorHandler;
