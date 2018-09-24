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

export const unioilApi = axios.create({
  baseURL: 'https://reqres.in/api',
  responseType: 'json'
});

export let API_ENDPOINT_V1 = axios.create({
  baseURL: 'http://192.168.0.65/api/v1/admin',
  responseType: 'json'
});



export const fetchData = async (url) => {
  return await defaultApi.get(url);
}

export async function fetchAllItem(url, params=null) {
	//let token = readCookie();

	let response = await axios.get(url, {
		params,
		//headers: { 'X-Auth-Token': token },
	});

	return response;
}


export const callApi = async ({url, params}) => {
  let response = await sampleJsonApi.get(url, {
		params,
		//headers: { 'X-Auth-Token': token },
	});

	return response;
}


export const API_GET = async (url, params) => {
  try {
    return await API_ENDPOINT_V1.get(url, {
      params,
      paramsSerializer: function(params) {
        return queryString.stringify(params, { encode: false });
      }
    });
  } catch ({response}) {
    store.dispatch({ type: 'UNCAUGHT_ERROR', payload: response });
  }
}


export const API_POST = async (url, params) => {
  try {
    return await API_ENDPOINT_V1.post(url, params)
  } catch ({response: error}) {
    store.dispatch({ type: "LOGOUT", payload: error });
  }
  
}

export const API_PUT = async (url, params) => {
  // try {
  //   return await API_ENDPOINT_V1.put(url, params)
  // } catch ({response: error}) {
  //   store.dispatch({ type: LOGOUT, payload: error });
  // }
}

// NOT MOST COMMONLY USED
export const API_DELETE = async (url, params) => {
  // try {
  //   return await API_ENDPOINT_V1.delete(url, params)
  // } catch (error) {
  //   store.dispatch({ type: LOGOUT });
  // }
}