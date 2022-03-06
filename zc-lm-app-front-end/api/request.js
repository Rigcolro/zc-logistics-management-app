import axios from "axios";
import settle from "axios/lib/core/settle";
import buildURL from "axios/lib/helpers/buildURL";
const request = axios.create({
  timeout: 60 * 1000,
});
request.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    console.log("请求拦截器错误信息", err);
    return err;
  }
);
request.interceptors.response.use(
  (res) => {
    return res.data.data;
  },
  (err) => {
    console.log("响应拦截器错误信息", err);
    return err;
  }
);
const post = (url, data, config) => request.post(url, data, config);

const put = (url, data, config) => request.put(url, data, config);

const get = (url, config) => request.get(url, config);

const del = (url, config) => request.delete(url, config);

const head = (url, config) => request.head(url, config);

const options = (url, config) => request.options(url, config);

const patch = (url, data, config) => request.patch(url, data, config);
// 适配app
request.defaults.adapter = function (config) {
  return new Promise((resolve, reject) => {
    uni.request({
      method: config.method.toUpperCase(),
      url: buildURL(config.url, config.params, config.paramsSerializer),
      header: config.headers,
      data: config.data,
      dataType: config.dataType,
      responseType: config.responseType,
      sslVerify: config.sslVerify,
      complete: function complete(response) {
        response = {
          data: response.data,
          status: response.statusCode,
          errMsg: response.errMsg,
          header: response.header,
          config: config,
        };

        settle(resolve, reject, response);
      },
    });
  });
};
export default {
  post,
  get,
  put,
  del,
  patch,
  head,
  options,
};
