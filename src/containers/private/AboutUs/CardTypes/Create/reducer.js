const USERMANAGEMENT_CREATE_REQUEST = "USERMANAGEMENT_CREATE_REQUEST";
const USERMANAGEMENT_CREATE_SUCCESS = "USERMANAGEMENT_CREATE_SUCCESS";
const USERMANAGEMENT_CREATE_ERROR = "USERMANAGEMENT_CREATE_ERROR";
  
const initialState = {
	data: [],
	createRequestPending: false
}
  
const userManagementCreateReducer = (state = initialState, { type, payload }) => {
	switch(type) {
		case USERMANAGEMENT_CREATE_REQUEST:
			return {
				...state,
				createRequestPending: true
			};
		case USERMANAGEMENT_CREATE_SUCCESS:
			return {
				...state,
				data: payload.data,
				createRequestPending: false
			};
		case USERMANAGEMENT_CREATE_ERROR:
			return {
				...state,
				createRequestPending: false
			};
		default:
			return state;
	}
};
  
  export default  userManagementCreateReducer;