import axios from 'axios'
import store from "store/index"
import queryString from "query-string";

export const defaultApi = axios.create({
  baseURL: 'https://reqres.in/api',
  responseType: 'json'
});

export const jsonServerApi = axios.create({
  baseURL: 'http://localhost:3004',
});

export const sampleJsonApi = axios.create({
  baseURL: 'http://jsonplaceholder.typicode.com/',
});

export const API_UNI_OIL = axios.create({
  baseURL: process.env.REACT_APP_DEV,
  responseType: 'json'
});

export let API_ENDPOINT_V1 = axios.create({
  baseURL: 'http://192.168.0.65/api/v1/admin',
  responseType: 'json'
});



export const fetchData = async (url) => {
  return await defaultApi.get(url);
}

export const API_GET = async (url, params) => {
  try {
    return await API_ENDPOINT_V1.get(url, { params });
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