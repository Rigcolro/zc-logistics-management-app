import request from "../request";
const baseUrl = "http://192.168.246.1:8080/profile";
export default {
  title: "我的页面接口",
  name: "profile",
  baseUrl,
  updatePhoneNumber: (params) =>
    request.post(`${baseUrl}/updatePhoneNumber`, params),
};
