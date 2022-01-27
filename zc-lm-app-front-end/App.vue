<script>
export default {
  onLaunch: function () {
    console.log("App Launch");
    uni.getStorage({
      key: "loginStatus",
      success: function (res) {
        const loginStatus = res.data;
        if (loginStatus) {
          uni.switchTab({
            url: "/pages/home/home",
          });
        }
      },
    });
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
</style>
