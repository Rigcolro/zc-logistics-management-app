import request from "../request";
const baseURL = request.baseURL;
const subPath = "/login";
const url = baseURL + subPath;
export default {
  title: "登录页面接口",
  name: "login",
  url,
  loginQuery: (params) => request.post(`${url}/loginQuery`, params),
  loginQueryName: (params) => request.post(`${url}/loginQueryName`, params),
  loginQueryPhone: (params) => request.post(`${url}/loginQueryPhone`, params),
  loginInsert: (params) => request.post(`${url}/loginInsert`, params),
};
