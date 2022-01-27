<template>
  <status-bar />
  <view class="profile-page">
    <view class="profile-page_headPortrait_part f ai-c">
      <image
        src="/static/image/sdz.png"
        mode="widthFix"
        class="profile-page_headPortrait_part_image"
      ></image>
      <text>{{ userName }}</text>
    </view>
    <view class="profile-page_info_part"> </view>
  </view>
</template>

<script>
import { ref, onMounted } from "vue";
export default {
  name: "profile-page",
  setup() {
    let userName = ref("");
    const initPage = () => {
      uni.getStorage({
        key: "userName",
        success: (res) => {
          console.log(res.data);
          userName.value = res.data;
        },
      });
    };
    onMounted(() => {
      initPage();
    });
    return { userName };
  },
};
</script>
<style lang='scss' scoped>
.profile-page {
  width: 100%;
  &_headPortrait_part {
    padding:40rpx 20rpx;
    width: 100%;
    height: 200rpx;
    background: #24adf3;
    &_image {
      margin-right: 30rpx;
      width: 100rpx;
      border-radius: 50rpx;
    }
  }
  &_info_part {
    width: 100%;
    height: calc(100% - 200px);
    background: orangered;
  }
}
</style>