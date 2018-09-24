import {
  REGISTRATION,
  REGISTRATION_SUCCESS,
  REGISTRATION_FIELD_ERROR,
  REGISTRATION_ERROR,
  REGISTRATION_RESET
} from "./constants";

const initialState = {
  data: {},
  status: '',
  messages: "",
  error: '',
  isRegistered: false,
  code: 0
}

const registrationReducer = (state = initialState, { type, payload, field_error }) => {
  switch(type) {
    case REGISTRATION:
      return {
        ...state,
        status: "loading",
        messages: [{ body: "Fetching data...", time: new Date() }],
      };
    case REGISTRATION_SUCCESS:
      return {
        ...state,
        status: "success", 
        messages: [{ body: "Registration successful.", time: new Date() }],
        isRegistered: true,
        code: 200
      };
    case REGISTRATION_FIELD_ERROR:
      return {
        ...state,
        status: "error", 
        messages: [{ body: payload.error, time: new Date() }],
        error: field_error,
        data: {},
        isRegistered: false,
        code: payload.status
      };
    case REGISTRATION_ERROR:
      return {
        ...state,
        status: "error",
        messages: [{ body: "Ooops something went wrong", time: new Date() }],
        error: payload.data.error,
        data: {},
        isRegistered: false,
        code: payload.status
      };
    case REGISTRATION_RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export default registrationReducer;