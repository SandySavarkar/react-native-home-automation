import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {SERVER_URL} from '../utils/constants';
let Api = axios.create({
	baseURL: SERVER_URL
});

/*
   * Add a request interceptor
   @param config
  */
Api.interceptors.request.use(
	(config) => {
		let token = AsyncStorage.getItem("token");
		if (token != null)
			config.headers.Authorization = `Bearer ${token}`;
		return config;
	},
	(error) => {
		return Promise.reject(error.response);
	}
);

/*
   * Add a response interceptor
   */
Api.interceptors.response.use(
	(response) => {
		if (response.status === 200) 
			return response.data;
	},
	(error) => {
	
		if (error?.response?.status === 401 && error?.response?.data?.message==="Your session has expired") {
			AsyncStorage.removeItem("token");
		}else if(error?.response === undefined){
            return error
		} 
		return Promise.reject(error?.response);
	}
);

export default Api;