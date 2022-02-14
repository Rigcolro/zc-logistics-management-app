<script>
import storageOperation from "/utils/index";
export default {
  onLaunch: function () {
    console.log("App Launch");
    const data = storageOperation.getStorage("loginStatus");
    if (data) {
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
@import 'style/uni-ui.scss'
</style>
