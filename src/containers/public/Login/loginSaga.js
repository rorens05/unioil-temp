import { call, takeLatest, put } from "redux-saga/effects";
import { API_UNI_OIL,API_ENDPOINT_V1 } from "utils/Api";
import { setCookie } from "utils/cookie";
import { notification } from "antd";

function* loginFlow({ payload }) {
  const {
    token, //username
    password,
    setSubmitting,
    setErrors,
    history
  } = payload;
console.log(token,'usernameusername');
  try {
    const { data } = yield call(() => API_ENDPOINT_V1.post('login_password', { token, password })); //username
    
    if(data.data.isUserPasswordChange)
      return history.push({ pathname: 'forgot-password' });
console.log(data,'testadata');
    if(data.data.token) {
      API_ENDPOINT_V1.defaults.headers.common['Authorization'] = `Bearer ${data.data.token}`;
      setCookie({ token: data.data.token }, "TOKEN");
  
      yield put({ type: "LOGIN_SUCCESS", payload: data.data });
    }
    
  } catch ({response: error}) {
  
    if(!error) // error is undefined/null
      return notification.error({ message: 'Error', description: 'Something went wrong.' });
    if(error && error.status == 500) 
      return notification.error({ message: 'Error', description: '500 Internal Error refresh the page, no internet connection.' });
    
    const { password } = error.data.data;
    setErrors({ password });
    setSubmitting(false);
  }
}

function* loginSaga() {
  yield takeLatest("LOGIN", loginFlow);
}

export default loginSaga;