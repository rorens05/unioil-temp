
import { LOGOUT, LOGOUT_SUCCESS , LOGOUT_RESET} from "constants/Types";

const initialState = {

  messages: "",
  isLogout: false,
};

const logoutReducer = (state = initialState, { type }) => {
  // console.log("my reducser",payload);

  switch (type) {
    case LOGOUT:
      return {
        ...state,
        isLogout: false,
        
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLogout: true,
        messages:"You successful logout"
      };
    case LOGOUT_RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export default logoutReducer;
