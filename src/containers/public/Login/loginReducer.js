import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FIELD_ERROR,
  LOGIN_ERROR,
  LOGIN_RESET,
} from "./constants";

const initialState = {
  data: {},
  status: '',
  messages: "",
  error: '',
  isAuthenticated: false,
  code: 0,
};

const loginReducer = (state = initialState, { type, payload, field_error }) => {
  // console.log("my reducser",payload);

  switch (type) {
    case LOGIN:
      return {
        ...state,
      
        isAuthenticated: false,
        status: "loading",
        messages: [{ body: "Fetching data...", time: new Date() }],
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        status: "success",
        isAuthenticated: true,  
        messages: [{ body: "Receiving data successful", time: new Date() }],
        code: 200
      };
    case LOGIN_FIELD_ERROR:
      return {
        ...state,
        status: "error",
        isAuthenticated: false, 
        messages: [{ body: "Something went wrong", time: new Date() }],
        error: field_error,
        data: {},
        code: payload.status
      };
    case LOGIN_ERROR:
      return {
        ...state,
        status: "error",
        isAuthenticated: false, 
        messages: [{ body: "Something went wrong", time: new Date() }],
        error: payload.data.error,
        data: {},
        code: payload.status
      };


    case LOGIN_RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export default loginReducer;
