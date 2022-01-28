<script>
export default {
  onLaunch: function () {
    console.log("App Launch");
    uni.removeStorage({
      key: "loginStatus",
      success: function (res) {
        console.log("success");
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
