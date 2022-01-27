<template>
  <status-bar />
  <view class="content f fd-col ai-c jc-c">
    <image class="logo" src="/static/image/logo.png"></image>
    <view class="text-area f jc-c">
      <text class="title">{{ title }}</text>
    </view>
  </view>
</template>

<script>
import { ref } from "vue";
export default {
  name: "home-page",
  setup() {
    const title = ref("哈哈哈");
    return {
      title,
    };
  },
};
</script>

<style lang="scss" scoped>
.content {
  .logo {
    height: 200rpx;
    width: 200rpx;
    margin-top: 200rpx;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 50rpx;
  }
  .text-area {
    .title {
      font-size: 36rpx;
      color: #8f8f94;
    }
  }
}
</style>
