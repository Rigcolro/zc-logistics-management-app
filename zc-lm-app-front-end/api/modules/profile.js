import request from "../request";
const baseURL = request.baseURL;
const subPath = "/profile";
const url = baseURL + subPath;
export default {
  title: "我的页面接口",
  name: "profile",
  url,
  updatePhoneNumber: (params) =>
    request.post(`${url}/updatePhoneNumber`, params),
  getUserInfo: (params) => request.get(`${url}/getUserInfo`, { params }),
  updateAddress: (params) => request.post(`${url}/updateAddress`, params),
  uploadImage: (params) => request.post(`${url}/uploadImage`, params),
};
