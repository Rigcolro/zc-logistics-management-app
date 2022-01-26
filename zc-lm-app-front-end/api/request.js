import axios from "axios";
const request = axios.create({
  timeout: 60 * 1000,
});
request.interceptors.request.use((config) => {
  return config;
});
request.interceptors.request.use(
  (res) => {
    return res;
  },
  (err) => {}
);
const post = (url, data, config) => request.post(url, data, config);

const put = (url, data, config) => request.put(url, data, config);

const get = (url, config) => request.get(url, config);

const del = (url, config) => request.delete(url, config);

const head = (url, config) => request.head(url, config);

const options = (url, config) => request.options(url, config);

const patch = (url, data, config) => request.patch(url, data, config);

export default {
  post,
  get,
  put,
  del,
  patch,
  head,
  options,
};
