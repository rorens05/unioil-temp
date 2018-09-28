import React, { Component } from 'react'
import { call, takeLatest, put } from "redux-saga/effects";
import { API_UNI_OIL,API_ENDPOINT_V1 } from "utils/Api";
import { setCookie } from "utils/cookie";
import { notification, message } from "antd";

const USERMANAGEMENT_CREATE_REQUEST = "USERMANAGEMENT_CREATE_REQUEST";
const USERMANAGEMENT_CREATE_SUCCESS = "USERMANAGEMENT_CREATE_SUCCESS";
const USERMANAGEMENT_CREATE_ERROR = "USERMANAGEMENT_CREATE_ERROR";


function* userManagementSagaFlow({ payload }) {
  const {
    values,
    setSubmitting,
    setErrors,
    history,
    _self
  } = payload;
  try {
    const { data } = yield call(() => API_UNI_OIL.post('admin', { ...values })); //username
    
    yield put({ type: USERMANAGEMENT_CREATE_SUCCESS, payload: data.data });
    message.success('New record added.'); _self.setState({loading: false})
    history.push({ pathname: '/user-management' });
    
  } catch ({response: error}) {
    notification.error({ 
      message: 'Error', 
      description: <div>
        Something went wrong creating new user.
        {error.data.data && error.data.data.username && (<div> {error.data.data.username[0]} </div>) }
        {error.data.data && error.data.data.email && (<div> {error.data.data.email[0]} </div>) }
      </div>
    });
    yield put({ type: USERMANAGEMENT_CREATE_ERROR });
    setSubmitting(false); _self.setState({loading: false})
  }
}


function* userManagementCreateSaga() {
  yield takeLatest(USERMANAGEMENT_CREATE_REQUEST, userManagementSagaFlow);
}
 
export default userManagementCreateSaga;