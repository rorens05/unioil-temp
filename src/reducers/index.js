import { combineReducers } from 'redux'; 
import loginReducer from 'containers/public/Login/loginReducer';
import registrationReducer from 'containers/public/Registration/registrationReducer';

import logoutReducer from './logoutReducer';
import fetchDataReducer from './fetchDataReducer';


import authReducer from "./authReducer";

const reducers = combineReducers({ 
  auth: authReducer,
  login: loginReducer,
  register: registrationReducer,
  logout: logoutReducer,
  fetchData: fetchDataReducer,
});

export default reducers;
