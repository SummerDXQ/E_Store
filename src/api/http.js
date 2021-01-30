import axios from "axios";

let instance = axios.create();

const env = process.env.NODE_ENV;

switch (env) {
  case "development":
    instance.defaults.baseURL = "/api";
    break;
  case "test":
    instance.defaults.baseURL = "https://fakestoreapi.com/";
    break;
  case "production":
    instance.defaults.baseURL = "https://fakestoreapi.com/";
    break;
}

// instance.defaults.timeout = 10000;
instance.defaults.withCredentials = true;
instance.defaults.validateStatus = (status) => {
  return status >= 200 && status < 400;
};
// instance.defaults.headers.post["Content-Type"] =
//   "application/x-www-form-urlencoded";
// instance.defaults.transformRequest = (data, headers) => {
//   const ContentType =
//     headers["Content-Type"] ||
//     headers.common["Content-Type"] ||
//     headers.post["Content-Type"];
//   if (ContentType === "application/x-www-form-urlencoded") {
//     return qs.stringify(data);
//   }
//   if (ContentType === "application/json") {
//     return JSON.stringify(data);
//   }
//   return data;
// };
// axios.interceptors.request.use((config) => {
//   const token = localStorage.getItem("X-Token");
//   if (token) {
//     config.headers["Authorization"] = token;
//   }
//   return config;
// });
instance.interceptors.response.use(
  (response) => {
    // console.log(response)
    return response.data;
  },
  (reason) => {
    let response = reason.response;
    if (response) {
      switch (response.status) {
        case 400:
          break;
        case 401:
          break;
      }
    } else {
      if (reason && reason.code === "ECONNABORTED") {
        //   timeout or request abort
      }
      if (!navigator.onLine) {
        //   network error
      }
    }
    // return Promise.reject(reason);
    return reason;
  }
);

// 业务层的失败的统一处理 (业务code失败的提示)
// export function queryGET(url, params = {}, config = {}) {
//   config.params = params;
//   return instance.get(url, config).then((data) => {
//       // console.log(data);
//       return data;
//     // let code = +data.code;
//     // if (code === 0) {
//     //   return data;
//     // }
//     // 统一做提示
//     // ...
//     // return Promise.reject(data);
//   });
// }

export default instance;
