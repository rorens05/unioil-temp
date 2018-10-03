import axios from 'axios'
import store from "store/index"
import queryString from "query-string";


export const API_UNI_OIL = axios.create({
  baseURL: process.env.REACT_APP_DEV,
  responseType: 'json'
});


export const fetchData = async (url) => {
  return await false;
}

export const API_GET = async (url, params) => {
  try {
    return await API_UNI_OIL.get(url, { params });
  } catch ({response}) {
    if(response.status === 422) return response;
    store.dispatch({ type: 'UNCAUGHT_ERROR', payload: response });
  }
}

export const API_POST = async (url, params) => {
  try {
    return await API_UNI_OIL.post(url, params)
  } catch ({response}) {
    if(response.status === 422) return response;
    store.dispatch({ type: 'UNCAUGHT_ERROR', payload: response });
  }
}

export const API_PUT = async (url, params) => {
  try {
    return await API_UNI_OIL.put(url, params)
  } catch ({response}) {
    if(response.status === 422) return response;
    store.dispatch({ type: 'UNCAUGHT_ERROR', payload: response });
  }
}

// NOT MOST COMMONLY USED
export const API_DELETE = async (url, params) => {
  try {
    return await API_UNI_OIL.delete(url, { params })
  } catch ({response}) {
    if(response.status === 422) return response;
    store.dispatch({ type: 'UNCAUGHT_ERROR', payload: response });
  }
}