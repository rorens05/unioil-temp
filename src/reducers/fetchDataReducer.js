
import { FETCH_DATA, FETCH_DATA_SUCCESS , FETCH_DATA_ERROR, FETCH_DATA_RESET } from 'constants/Types';

const initialState = {
  code: '',
  status: '',
  data: {}
};
const fetchDataReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_DATA:
      return {
        ...state,
        status: 'loading...',
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        status: 'sucess',
        code: payload.status,
        data: payload.data.data
      };
    case FETCH_DATA_ERROR:
      return {
        ...state,
        status: 'error',
        code: payload.status
      };
    case FETCH_DATA_RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export default fetchDataReducer;
