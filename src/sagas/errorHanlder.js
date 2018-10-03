import { takeLatest, put } from "redux-saga/effects";
import { delay } from "redux-saga";
import { API_UNI_OIL } from "utils/Api";
import { removeCookie } from "utils/cookie";
import { notification } from "antd";
import { replace } from 'react-router-redux';

function* handleErrors({payload}){
  yield delay(100);

  if(payload){
    let { status, data } = payload;
    if(status === 401){
      API_UNI_OIL.defaults.headers.common['Authorization'] = undefined;
      removeCookie('TOKEN');
      yield put({ type: "LOGOUT_SUCCESS" }); 
      notification.error({ message: data.message, description: '' });
    }else if(status === 404){
      yield put(replace('/404'))
    }else {
      notification.error({ message: data.message, description: '' });
    }
  }else {
    // TO BE ADDED LATER WHEN ALL API IS COMPLETED
    // yield put(replace('/404'))
    notification.error({ message: 'A.P.I not found' });
  }
}

function* errorHandler() {
  yield takeLatest("UNCAUGHT_ERROR", handleErrors);
}

export default errorHandler;
