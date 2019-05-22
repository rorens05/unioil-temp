const SYSTEMPREFERENCES_CREATE_REQUEST = "SYSTEMPREFERENCES_CREATE_REQUEST";
const SYSTEMPREFERENCES_CREATE_SUCCESS = "SYSTEMPREFERENCES_CREATE_SUCCESS";
  
const initialState = {
	data: [],
	createRequestPending: false
}
  
const systemPreferencesCreateReducer = (state = initialState, { type, payload }) => {
	switch(type) {
		case SYSTEMPREFERENCES_CREATE_REQUEST:
			return {
				...state,
				createRequestPending: true
			};
		case SYSTEMPREFERENCES_CREATE_SUCCESS:
			return {
				...state,
				data: payload,
				createRequestPending: false
			};
		default:
			return state;
	}
};
  
  export default  systemPreferencesCreateReducer;