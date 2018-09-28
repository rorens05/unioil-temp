import { combineReducers } from 'redux'; 
import loginReducer from 'containers/public/Login/loginReducer';
import logoutReducer from './logoutReducer';
import userManagementCreateReducer from 'containers/private/UserManagement/Create/reducer';

import authReducer from "./authReducer";

const reducers = combineReducers({ 
  auth: authReducer,
  login: loginReducer,
  logout: logoutReducer,
  userManagement: userManagementCreateReducer
});

export default reducers;
