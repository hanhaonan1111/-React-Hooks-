import axios, { AxiosError } from "axios";
import { Toast } from "antd-mobile";
import { GetStorage, HasStorage, SetStorage } from "./localStorage";
import history from "./history";
import store from "@/store";
import { SaveToken } from "@/store/action/login";
let baseURL = "http://geek.itheima.net/v1_0";

let request = axios.create({
  baseURL,
  timeout: 5000,
});
//请求拦截器
request.interceptors.request.use((config) => {
  if (HasStorage()) {
    config.headers.Authorization = `Bearer ${GetStorage().token}`;
  }
  return config;
});
//相应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (err: AxiosError<{ message: string }>) => {
    //没有response
    if (!err.response) {
      Toast.info("网络错误");
      return Promise.reject(new Error(""));
    }

    let { status } = err.response;
    // 非网络错误 有响应 且不是401
    if (status !== 401) {
      Toast.info(err.response.data.message, 1);
      return Promise.reject(new Error(""));
    }
    // 是401(token非法) 没有刷新token :refresh
    let { refresh_token } = GetStorage();
    if (!refresh_token) {
      history.push({
        pathname: "/login",
        state: history.location.pathname,
      });
      return Promise.reject(new Error(""));
    } else {
      // 是 401 且 有刷新token :refresh
      try {
        let userID = { token: "", refresh_token };
        let response = await axios({
          url: baseURL + "/authorizations",
          method: "PUT",
          headers: { Authorization: "Bearer " + refresh_token },
        });
        userID.token = response.data.data.token;
        // 更新本地
        SetStorage(userID);
        // 更新redux
        store.dispatch(SaveToken(userID));
        return request(err.config);
      } catch (e) {
        // 是 401 且 有刷新token :refresh 但是 refresh_token 失效
        history.push({
          pathname: "/login",
          state: history.location.pathname,
        });
      }
    }
  }
);
export default request;
