const setStorage = (key, data) => {
  uni.setStorage({
    key,
    data,
    success() {
      console.log("存储成功!");
    },
  });
};
const setStorageSync = (key, data) => {
  try {
    uni.setStorageSync(key, data);
  } catch (e) {
    // error
    console.log("同步存储出错", e);
  }
};
const getStorage = (key) => {
  let value = null;
  let error = "";
  uni.getStorage({
    key,
    success: function (res) {
      data = res.data;
      console.log("获取存储成功!");
    },
    fail: function (err) {
      error = err;
      console.log("获取存储出错", err);
    },
  });
  return {
    value,
    error,
  };
};
const getStorageSync = (key) => {
  let value;
  let error = "";
  try {
    value = uni.getStorageSync(key);
    if (value) {
      console.log(value);
    }
  } catch (e) {
    // error
    error = e;
    console.log("同步获取存储出错", e);
  }
  return {
    value,
    error,
  };
};
const removeStorage = (key) => {
  uni.removeStorage({
    key,
    success: function (res) {
      console.log(`删除${key}存储成功!`);
    },
  });
};
export default {
  setStorage,
  setStorageSync,
  getStorage,
  getStorageSync,
  removeStorage,
};
