const setStorage = (key, data) => {
  uni.setStorage({
    key,
    data,
    success() {
      console.log("存储成功!");
    },
  });
};
const getStorage = (key) => {
  let data = null;
  uni.getStorage({
    key: "storage_key",
    success: function (res) {
      data = res.data;
      console.log("获取存储成功!");
    },
  });
  return data;
};
const removeStorage = (key) => {
  uni.removeStorage({
    key,
    success: function (res) {
      console.log("删除存储成功!");
    },
  });
};
export default { setStorage, getStorage, removeStorage };
