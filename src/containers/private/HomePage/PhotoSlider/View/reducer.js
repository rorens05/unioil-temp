import {
  USERS_VIEW,
  USERS_VIEW_SUCCESS,
  USERS_VIEW_ERROR
} from "./constants";

const initialState = {
  data: {},
  status: '',
  messages: '',
  error: '',
  code: 0
}

const usersViewReducer = (state = initialState, { type, payload, field_error }) => {
  switch(type) {
    case USERS_VIEW:
      return {
        ...state,
        status: "loading",
        messages: [{ body: "Fetching user...", time: new Date() }],
      };
    case USERS_VIEW_SUCCESS:
      return {
        ...state,
        data: payload.data,
        status: "success", 
        messages: [{ body: "User successfully fetched.", time: new Date() }],
        code: payload.status
      };
    case USERS_VIEW_ERROR:
      return {
        ...state,
        status: "error", 
        messages: [{ body: payload.error ? payload.error : "User not found.", time: new Date() }],
        data: payload.data,
        code: payload.status ? payload.status : 404
      };
    default:
      return state;
  }
};

export default usersViewReducer;