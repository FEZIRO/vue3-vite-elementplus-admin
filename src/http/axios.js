/**
 * @desc：axios请求库全局配置
 */
import axios from "axios";

//根据.env文件切换环境
// axios.defaults.baseURL = process.env.VITE_APP_SERVER_HOST;

axios.defaults.timeout = 36000000;
axios.interceptors.request.use(
  config => {
    // let token = localStorage.getItem("userInfo").token;
    // config.headers["accessToken"] = token;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    // console.log("response", response);

    if (response.data.success) {
      return response.data.data;
    } else {
      // message.error(response.data.msg);
      throw new Error(response.data.msg);
    }
  },
  error => {
    console.error("请求error", error);

    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = "请求出错(400)";
          return Promise.reject(error);
        case 401:
          error.message = "未授权(401)";
          //跳登录页
          return Promise.reject(error);
        case 403:
          error.message = "禁止访问(403)";
          break;
        case 404:
          error.message = "资源未找到(404)";
          return Promise.reject(error);
        case 500:
          return Promise.reject(error);
        case 501:
          error.message = "服务未实现(501)";
          return Promise.reject(error);
        case 502:
          error.message = "网络错误(502)";
          return Promise.reject(error);
        case 503:
          error.message = "服务不可用(503)";
          return Promise.reject(error);
        case 504:
          error.message = "网络超时(504)";
          return Promise.reject(error);
        case 505:
          error.message = "HTTP版本不受支持(505)";
          return Promise.reject(error);
        default:
          error.message = `请求出错(${error.response.status})!`;
          return Promise.reject(error);
      }
    } else {
      error.message = "连接服务器失败!";
    }
  }
);

export default axios;
