<script>
import storageOperation from "/utils/index";
export default {
  onLaunch: function () {
    console.log("App Launch");
    // 初始化缓存userName和userPhone避免报错
    if (storageOperation.getStorageSync("userName").error) {
      storageOperation.setStorageSync("userName", "");
      storageOperation.setStorageSync("userPhone", "");
    }
    const { value, error } = storageOperation.getStorageSync("loginStatus");
    if (!error && value) {
      uni.switchTab({
        url: "/pages/home/home",
      });
    }
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style>
/*每个页面公共css */
@import "style/uni-ui.scss";
</style>
