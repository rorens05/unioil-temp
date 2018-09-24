
const initialState = {
    data: {},
    isAuthenticated: false,
};
  
const authReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case "LOGIN_SUCCESS":
        return {
            ...state,
            data: payload,
            isAuthenticated: true
        };
        
        case "LOGOUT_SUCCESS":
        return {
            ...initialState
        };
        default:
        return state;
    }
};
  
  export default authReducer;
  