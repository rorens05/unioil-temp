import { all, fork } from 'redux-saga/effects';
import loginSaga from 'containers/public/Login/loginSaga';
import registrationSaga from 'containers/public/Registration/registrationSaga';
import logoutSaga from './logoutSaga';
import fetchDataSaga from './fetchDataSaga';
import errorHandler from "./errorHanlder";

export default function* rootSaga() {
  yield all([
    fork(loginSaga),
    fork(logoutSaga),
    fork(registrationSaga),
    fork(errorHandler),

    
    fork(fetchDataSaga),
  ]);
}
