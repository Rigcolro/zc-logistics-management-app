import request from "../request";
const baseUrl = "http://localhost:8080/login";
export default {
  title: "登录页面接口",
  name: "login",
  baseUrl,
  loginQuery: (params) => request.post(`${baseUrl}/loginQuery`, params),
};
