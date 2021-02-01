import axios from "axios";

import { showLoading, hideLoading } from '../utils/loading';

let instance = axios.create();

const env = process.env.NODE_ENV;

switch (env) {
  case "development":
    instance.defaults.baseURL = "/api";
    break;
  case "test":
    instance.defaults.baseURL = "/api";
    break;
  case "production":
    instance.defaults.baseURL = "/api";
    break;
}

// instance.defaults.timeout = 10000;
instance.defaults.withCredentials = true;
instance.defaults.validateStatus = (status) => {
  return status >= 200 && status < 400;
};
instance.interceptors.request.use((config)=>{
  showLoading();
  return config;
})

instance.interceptors.response.use(
  (response) => {
    hideLoading();
    return response.data;
  },
  (reason) => {
    hideLoading();
    let response = reason.response;
    // for debugging purpose (depend on project)
    if (response) {
      switch (response.status) {
        case 400:
          break;
        case 401:
          break;
      }
    } else {
      if (reason && reason.code === "ECONNABORTED") {
        // timeout or request abort
      }
      if (!navigator.onLine) {
        // network error
      }
    }
    // for user
    return {
      unifiedErrorCode: 1,
      errorMessage: "Network error, please try again later!",
    };
  }
);

export default instance;
