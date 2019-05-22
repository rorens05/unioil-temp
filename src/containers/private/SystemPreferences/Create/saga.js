import React, { Component } from 'react'
import { call, takeLatest, put } from "redux-saga/effects";
import { API_UNI_OIL } from "utils/Api";
import { setCookie } from "utils/cookie";
import { notification, message } from "antd";

import { apiFormValidation } from 'utils/helper';

const SYSTEMPREFERENCES_CREATE_REQUEST = "SYSTEMPREFERENCES_CREATE_REQUEST";
const SYSTEMPREFERENCES_CREATE_SUCCESS = "SYSTEMPREFERENCES_CREATE_SUCCESS";

function* systemPreferencesSagaFlow({ payload }) {
  const {
    values,
    setSubmitting,
    setErrors,
    history,
    _self
  } = payload;
  try {

    yield put({ type: SYSTEMPREFERENCES_CREATE_SUCCESS, payload: values });
    
  } catch ({response: error}) {
    console.log(error)
  }
}


function* systemPreferencesCreateSaga() {
  yield takeLatest(SYSTEMPREFERENCES_CREATE_REQUEST,  systemPreferencesSagaFlow);
}
 
export default systemPreferencesCreateSaga;