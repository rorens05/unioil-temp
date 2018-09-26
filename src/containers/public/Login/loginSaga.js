import { call, takeLatest, put } from "redux-saga/effects";
import { API_UNI_OIL,API_ENDPOINT_V1 } from "utils/Api";
import { setCookie } from "utils/cookie";
import { notification } from "antd";

function* loginFlow({ payload }) {
  const {
    username, //username
    password,
    setSubmitting,
    setErrors,
    history,
    admin_uuid
  } = payload;

  try {
    const { data } = yield call(() => API_UNI_OIL.post('login_password', { username, password })); //username
   
    if(data.data.prompt_password)
      return history.push({ pathname: '/change-password', state: { username, admin_uuid : data.data.admin_uuid, password } });

    if(data.data.token) {
      API_UNI_OIL.defaults.headers.common['Authorization'] = `Bearer ${data.data.token}`;
      setCookie({ token: data.data.token }, "TOKEN");
  
      yield put({ type: "LOGIN_SUCCESS", payload: data.data });
    }
    
  } catch ({response: error}) {
    setErrors({ password : "Incorrect Password"});
    setSubmitting(false);
  }
}

function* loginSaga() {
  yield takeLatest("LOGIN", loginFlow);
}

export default loginSaga;